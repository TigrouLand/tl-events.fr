import { execFileSync } from 'node:child_process'
import { existsSync, statSync } from 'node:fs'
import { isAbsolute, normalize, relative, resolve, sep } from 'node:path'
import { defineNuxtModule, useLogger } from '@nuxt/kit'

const COLLECTION = 'docs'
const SOURCE_PREFIX = 'news/'
/** Pages builders run in UTC and dev boxes usually don't, so day boundaries are pinned explicitly. */
const NEWS_TZ = 'Europe/Paris'

interface BeforeParseContext {
  file: { path: string; body: string }
  collection: { name: string }
}

const toDay = (value: string | Date): string =>
  new Intl.DateTimeFormat('en-CA', { timeZone: NEWS_TZ, year: 'numeric', month: '2-digit', day: '2-digit' }).format(
    typeof value === 'string' ? new Date(value) : value
  )

const git = (rootDir: string, args: string[]): string =>
  execFileSync('git', args, { cwd: rootDir, encoding: 'utf8', stdio: ['ignore', 'pipe', 'ignore'] }).trim()

const setFrontmatter = (body: string, fields: Record<string, string>): string => {
  const match = /^---\r?\n([\s\S]*?)\r?\n---/.exec(body)
  const lines = match ? match[1].split(/\r?\n/) : []
  for (const [key, value] of Object.entries(fields)) {
    const index = lines.findIndex((line) => line.trimStart().startsWith(`${key}:`))
    // quoted, otherwise YAML reparses the value as a Date at the parser's own midnight
    if (index === -1) lines.push(`${key}: '${value}'`)
    else lines[index] = `${key}: '${value}'`
  }
  const block = `---\n${lines.join('\n')}\n---`
  return match ? body.replace(match[0], block) : `${block}\n\n${body}`
}

const apply = (ctx: BeforeParseContext, published: string, updated: string | null): void => {
  ctx.file.body = setFrontmatter(ctx.file.body, updated ? { date: published, updatedAt: updated } : { date: published })
}

export default defineNuxtModule({
  meta: { name: 'news-git-dates' },
  setup(_options, nuxt) {
    const logger = useLogger('news-git')
    const rootDir = nuxt.options.rootDir
    const history = new Map<string, string[]>()
    const stats = { resolved: 0, degraded: 0 }

    let head: string | null = null
    let shallow = false
    try {
      head = git(rootDir, ['rev-parse', 'HEAD']) || null
      shallow = git(rootDir, ['rev-parse', '--is-shallow-repository']) === 'true'
    } catch {
      logger.error('git is unavailable, article dates will fall back to file mtimes')
    }

    // @nuxt/content keys its parse cache on configHash + collectionHash + file body, so a new
    // commit alone would keep serving previously parsed dates in dev.
    type ContentBuild = { build?: { markdown?: Record<string, unknown> } }
    const options = nuxt.options as unknown as { content?: ContentBuild }
    options.content ??= {}
    options.content.build ??= {}
    options.content.build.markdown ??= {}
    options.content.build.markdown.gitNonce = head ?? 'no-git'

    const commitsFor = (relPath: string): string[] => {
      const cached = history.get(relPath)
      if (cached) return cached
      let lines: string[] = []
      try {
        lines = git(rootDir, ['log', '--follow', '--format=%cI', '--', relPath]).split('\n').filter(Boolean)
      } catch {
        lines = []
      }
      history.set(relPath, lines)
      return lines
    }

    nuxt.hook('content:file:beforeParse', (rawCtx: unknown) => {
      const ctx = rawCtx as BeforeParseContext
      if (ctx.collection.name !== COLLECTION) return

      // `source.cwd: './news'` is normalised to a relative path, so the reported id is cwd-anchored
      let path = normalize(ctx.file.path)
      if (isAbsolute(path)) path = relative(rootDir, path)
      path = path.split(sep).join('/')
      if (!path.startsWith(SOURCE_PREFIX)) return

      const commits = commitsFor(path)
      const newest = commits.at(0)
      const oldest = commits.at(-1)

      // a depth-1 checkout (Cloudflare Pages default), a missing git binary, or an untracked draft
      if (!newest || !oldest) {
        const checkedOut = (() => {
          try {
            return toDay(statSync(resolve(rootDir, path)).mtime)
          } catch {
            return toDay(new Date())
          }
        })()
        stats.degraded += 1
        logger.warn(`${path}: no git history (shallow: ${shallow}), publishing as ${checkedOut}. Unshallow the build to get real dates.`)
        return apply(ctx, checkedOut, null)
      }

      // a single commit means nothing touched the file since it landed, and a same-day edit is not an update
      const published = toDay(oldest)
      const modified = commits.length > 1 ? toDay(newest) : null
      apply(ctx, published, modified && modified !== published ? modified : null)
      stats.resolved += 1
      // a truncated history exposes the tip commit as the file's first one: a plausible date, not the real one
      if (shallow && commits.length === 1) stats.degraded += 1
    })

    let reported = false
    nuxt.hook('build:done', () => {
      if (reported || !existsSync(resolve(rootDir, '.git'))) return
      reported = true
      const truncated = stats.degraded ? `, ${stats.degraded} truncated by shallow history` : ''
      const summary = `resolved ${stats.resolved} article date(s) from git${truncated}`
      // `.git/shallow` alone proves nothing: a --depth=N clone can still cover an article's whole life
      if (stats.degraded) logger.warn(`${summary}. Add \`git fetch --unshallow || git fetch --deepen=1000 || true\` to the build command.`)
      else logger.info(summary)
    })
  }
})
