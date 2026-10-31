import { readdirSync } from 'node:fs'
import { join } from 'node:path'

export const markdownIn = (dir: string): string[] =>
  readdirSync(dir, { withFileTypes: true }).flatMap((entry) =>
    entry.isDirectory() ? markdownIn(join(dir, entry.name)) : entry.name.endsWith('.md') ? [join(dir, entry.name)] : []
  )
