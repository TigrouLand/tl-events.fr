import type { RenderBlockArgs, RenderItemArgs } from 'block-model-renderer'
import { existsSync, mkdirSync, readdirSync, readFileSync, unlinkSync, writeFileSync } from 'node:fs'
import { dirname, join, relative, resolve } from 'node:path'
import process from 'node:process'
import { fileURLToPath } from 'node:url'
import { collectIcons, ICON_SIZE, type Icon, type IconType, iconUrl } from '../mc-icons.ts'
import { fetchServerStats } from '../server-stats.ts'

const rootDir = resolve(dirname(fileURLToPath(import.meta.url)), '../..')
const publicDir = join(rootDir, 'public')
const cacheDir = join(rootDir, 'tools', 'icons', '.cache')
const MANIFEST = 'https://piston-meta.mojang.com/mc/game/version_manifest_v2.json'

const args = process.argv.slice(2)
const flag = (name: string) => args.includes(`--${name}`)
const check = flag('check')
// a dev-triggered run must leave orphans alone: a file mid-edit can transiently reference nothing,
// and the art would be deleted a keystroke before it comes back
const prune = !flag('no-prune')

const markdownIn = (dir: string): string[] =>
  readdirSync(dir, { withFileTypes: true }).flatMap((entry) =>
    entry.isDirectory() ? markdownIn(join(dir, entry.name)) : entry.name.endsWith('.md') ? [join(dir, entry.name)] : []
  )

const target = ({ type, id }: Icon) => join(publicDir, iconUrl(type, id).slice(1))

const renderedIcons = (): string[] =>
  (['block', 'item'] as IconType[]).flatMap((type) => {
    const dir = join(publicDir, 'icons', type)
    return existsSync(dir) ? readdirSync(dir).filter((file) => file.endsWith('.webp')).map((file) => `/icons/${type}/${file}`) : []
  })

type Request = Icon & { files: Set<string> }
type ManifestEntry = { id: string; url: string }

const requested = new Map<string, Request>()

for (const file of markdownIn(join(rootDir, 'news'))) {
  for (const icon of collectIcons(readFileSync(file, 'utf8'))) {
    const url = iconUrl(icon.type, icon.id)
    const entry = requested.get(url) ?? { ...icon, files: new Set<string>() }
    
    entry.files.add(relative(rootDir, file))
    requested.set(url, entry)
  }
}

const all = [...requested.values()]
const referenced = new Set(all.map((icon) => iconUrl(icon.type, icon.id)))
const todo = flag('force') ? all : all.filter((icon) => !existsSync(target(icon)))
const stale = prune ? renderedIcons().filter((url) => !referenced.has(url)) : []

if (check) {
  for (const icon of todo)
    console.error(`mc-icons: ${iconUrl(icon.type, icon.id)} is referenced by ${[...icon.files].join(', ')} but was never rendered`)

  for (const url of stale) console.error(`mc-icons: ${url} is rendered, but no markdown references it anymore`)
  
  if (todo.length || stale.length) process.exitCode = 1
  else console.log(`mc-icons: ${all.length} referenced icons are all present, and none is stale`)
  
  process.exit(process.exitCode ?? 0)
}

// an orphan does not need the jar, so the version is only resolved once there is art to produce
let version: string | undefined
let rendered = 0
const unknown: Icon[] = []

if (todo.length) {
  version = (await fetchServerStats())?.version
  
  if (!version) throw new Error('mc-icons: the server reported no version, so there is nothing to render from')
  
  // the client jar carries models, blockstates and textures; it is cached, never shipped
  const jar = join(cacheDir, `${version}.jar`)
  
  if (!existsSync(jar)) {
    const { versions } = await fetch(MANIFEST).then((res) => res.json())
    const entry = (versions as ManifestEntry[]).find(({ id }) => id === version)
    
    if (!entry) throw new Error(`mc-icons: Minecraft ${version} is not in the version manifest`)
    
    const { url, size } = (await fetch(entry.url).then((res: Response) => res.json())).downloads.client
    console.log(`mc-icons: downloading Minecraft ${version} client jar (${(size / 1048576).toFixed(1)} MB)`)
    
    mkdirSync(cacheDir, { recursive: true })
    writeFileSync(jar, Buffer.from(await (await fetch(url)).arrayBuffer()))
  }

  const { prepareAssets, readFile, renderBlock, renderItem } = await import('block-model-renderer')
  const assets = await prepareAssets([jar], { cache: true, version })

  const exists = async (path: string) => Boolean(await readFile(path, assets))
  const defines = async ({ type, id }: Icon) => {
    const [namespace, file] = id.includes(':') ? id.split(':') : ['minecraft', id]
    return exists(`${`assets/${namespace}`}/${type === "block" ? "blockstates" : "items"}/${file}.json`)
  }

  for (const icon of todo) {
    // an unknown id silently renders a missing texture placeholder
    if (!(await defines(icon))) {
      unknown.push(icon)
      continue
    }

    const options: RenderBlockArgs | RenderItemArgs = {
      id: icon.id,
      assets,
      width: ICON_SIZE,
      height: ICON_SIZE,
      seed: 0,
      format: 'webp',
      output: { lossless: true }
    }

    const buffer = icon.type === 'block' ? await renderBlock(options) : await renderItem(options)

    mkdirSync(dirname(target(icon)), { recursive: true })
    writeFileSync(target(icon), buffer)
    
    rendered += 1
    
    console.log(`mc-icons: ${iconUrl(icon.type, icon.id)} ${(buffer.length / 1024).toFixed(1)} KB`)
  }
}

// an orphan is not merely dead weight: the PWA precache lists every .webp and ships it to every visitor
for (const url of stale) {
  unlinkSync(join(publicDir, url.slice(1)))
  console.log(`mc-icons: pruned ${url}`)
}

console.log(`mc-icons: ${rendered} rendered, ${stale.length} pruned, ${all.length - todo.length} already present, ${unknown.length} unknown`)

for (const icon of unknown) {
  console.error(`mc-icons: ${icon.id} (${icon.type}) is not in Minecraft ${version}, check the id`)
}

if (unknown.length) process.exitCode = 1
