import { spawn } from 'node:child_process'
import { existsSync, readdirSync, readFileSync } from 'node:fs'
import { join } from 'node:path'
import process from 'node:process'
import { defineNuxtModule, useLogger } from '@nuxt/kit'
import { collectIcons, type Icon, iconUrl, isGenerated } from './mc-icons'

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
    const missingFrom = (icons: Icon[]): Icon[] =>
      [...new Map(icons.map((icon) => [iconUrl(icon.type, icon.id), icon])).values()].filter(
        (icon) => !existsSync(join(rootDir, 'public', iconUrl(icon.type, icon.id)))
      )

    // the fetcher is a separate npm project so its image encoder never reaches the Pages install: with it
    // uninstalled there is nothing to spawn, and the warnings below are the only feedback there is
    const canRender = existsSync(join(rootDir, 'tools', 'icons', 'node_modules', 'sharp'))

    let running = false
    let pending = false

    // one fetcher at a time, and a burst of saves collapses into a single trailing run: the script re-reads
    // every file on each pass, so the last run sees all of what the earlier ones would have
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

    // in dev, writing the tag is the whole ask: the parse hands us the new body and the sprite lands in
    // public/ while the author is still looking at the reload
    if (nuxt.options.dev && canRender)
      nuxt.hook('content:file:beforeParse', (rawCtx: unknown) => {
        const { file } = rawCtx as BeforeParseContext
        if (missingFrom(collectIcons(file.body)).some(isGenerated)) render()
      })

    // the content parse cache only re-runs on a body change, so this reads the markdown itself: deleting a
    // rendered file has to be caught too, and a cold dev start has no parse to hook
    nuxt.hook('modules:done', () => {
      const newsDir = join(rootDir, 'news')
      if (!existsSync(newsDir)) return

      const wanted = markdownIn(newsDir).flatMap((file) => collectIcons(readFileSync(file, 'utf8')))
      const absent = missingFrom(wanted)
      const label = (icons: Icon[]): string => urlsOf(icons).join(', ')

      if (!absent.length) {
        if (wanted.length) logger.info(`${urlsOf(wanted).length} MCicon reference(s) are rendered`)
        return
      }

      // an item sprite is a texture away, so dev fetches it; a build never does — Pages has neither the
      // encoder nor a reason to download a client jar, so there the missing files stay a warning
      const fetchable = absent.filter(isGenerated)
      const committed = absent.filter((icon) => !isGenerated(icon))

      if (fetchable.length) {
        if (nuxt.options.dev && canRender) {
          logger.info(`${label(fetchable)} have no file yet — fetching`)
          render()
        } else
          logger.warn(
            `${label(fetchable)} have no file in public/icons. Run \`npm --prefix tools/icons install\` once, then \`npm run icons\`, and commit the result.`
          )
      }

      if (committed.length)
        logger.warn(
          `${label(committed)}: block sprites are committed rather than generated. Render one wherever block models render, or take the flat form with type="item".`
        )
    })
  }
})
