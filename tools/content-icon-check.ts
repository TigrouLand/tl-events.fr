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

    const canRender = existsSync(join(rootDir, 'tools', 'icons', 'node_modules', 'sharp'))

    let running = false
    let pending = false

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

    if (nuxt.options.dev && canRender)
      nuxt.hook('content:file:beforeParse', (rawCtx: unknown) => {
        const { file } = rawCtx as BeforeParseContext
        if (missingFrom(collectIcons(file.body)).some(isGenerated)) render()
      })

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
