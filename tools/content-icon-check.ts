import { spawn } from 'node:child_process'
import { existsSync, readdirSync, readFileSync } from 'node:fs'
import { join } from 'node:path'
import process from 'node:process'
import { defineNuxtModule, useLogger } from '@nuxt/kit'
import { collectIcons, type Icon, iconUrl } from './mc-icons'

const markdownIn = (dir: string): string[] =>
  readdirSync(dir, { withFileTypes: true }).flatMap((entry) =>
    entry.isDirectory() ? markdownIn(join(dir, entry.name)) : entry.name.endsWith('.md') ? [join(dir, entry.name)] : []
  )

interface BeforeParseContext {
  file: { body: string }
}

export default defineNuxtModule({
  meta: { name: 'news-icon-check' },
  setup(_options, nuxt) {
    const logger = useLogger('news-icons')
    const rootDir = nuxt.options.rootDir

    const urlsOf = (icons: Icon[]): string[] => [...new Set(icons.map(({ type, id }) => iconUrl(type, id)))]
    const missingFrom = (urls: string[]): string[] => urls.filter((url) => !existsSync(join(rootDir, 'public', url)))

    // the renderer is a separate npm project so its native deps never reach the Pages install: with it
    // uninstalled there is nothing to spawn, and the guard below is the only feedback there is
    const canRender = existsSync(join(rootDir, 'tools', 'icons', 'node_modules', 'block-model-renderer'))

    let running = false
    let pending = false

    // one renderer at a time, and a burst of saves collapses into a single trailing run: the script
    // re-reads every file on each pass, so the last run sees all of what the earlier ones would have
    const render = (): void => {
      if (!canRender) return
      if (running) {
        pending = true
        return
      }

      running = true
      spawn(process.execPath, [join(rootDir, 'tools', 'icons', 'render.mts'), '--no-prune'], { cwd: rootDir, stdio: 'inherit' }).on(
        'close',
        () => {
          running = false
          if (!pending) return
          pending = false
          render()
        }
      )
    }

    // in dev, writing the tag is the whole ask: the parse hands us the new body and the file lands in
    // public/ while the author is still looking at the reload
    if (nuxt.options.dev && canRender)
      nuxt.hook('content:file:beforeParse', (rawCtx: unknown) => {
        const { file } = rawCtx as BeforeParseContext
        if (missingFrom(urlsOf(collectIcons(file.body))).length) render()
      })

    // the content parse cache only re-runs on a body change, so this reads the markdown itself:
    // deleting a rendered file has to be caught too, and a cold dev start has no parse to hook
    nuxt.hook('modules:done', () => {
      const newsDir = join(rootDir, 'news')
      if (!existsSync(newsDir)) return

      const wanted = urlsOf(markdownIn(newsDir).flatMap((file) => collectIcons(readFileSync(file, 'utf8'))))
      if (!wanted.length) return

      const absent = missingFrom(wanted)
      if (!absent.length) {
        // nothing records which Minecraft the committed WebPs came from: art follows the server when a
        // maintainer renders it, which reads the version off the same request the nav makes
        logger.info(`${wanted.length} MCicon reference(s) are rendered`)
        return
      }

      // a build never renders: Pages has neither the renderer's native deps nor a reason to download
      // a client jar, so there the missing files stay the warning that sends you to `npm run icons`
      if (nuxt.options.dev && canRender) {
        logger.info(`${absent.length} MCicon(s) have no file yet: ${absent.join(', ')} — rendering`)
        render()
        return
      }

      logger.warn(
        `${absent.length} MCicon(s) have no file in public/icons: ${absent.join(', ')}. Run \`npm run icons\` and commit the result.`
      )
    })
  }
})
