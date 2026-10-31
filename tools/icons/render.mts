import { existsSync, mkdirSync, readdirSync, readFileSync, unlinkSync, writeFileSync } from 'node:fs'
import { dirname, join, relative, resolve } from 'node:path'
import process from 'node:process'
import { fileURLToPath } from 'node:url'
import { unzipSync } from 'fflate'
import sharp from 'sharp'
import { markdownIn } from '../markdown.ts'
import { collectIcons, ICON_SIZE, type Icon, type IconType, iconUrl, isGenerated } from '../mc-icons.ts'
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

const target = ({ type, id }: Icon) => join(publicDir, iconUrl(type, id).slice(1))

const renderedIcons = (): string[] =>
  (['block', 'item'] as IconType[]).flatMap((type) => {
    const dir = join(publicDir, 'icons', type)
    return existsSync(dir) ? readdirSync(dir).filter((file) => file.endsWith('.webp')).map((file) => `/icons/${type}/${file}`) : []
  })

type Request = Icon & { files: Set<string> }

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
const absent = all.filter((icon) => !existsSync(target(icon)))
const todo = flag('force') ? all.filter(isGenerated) : absent.filter(isGenerated)
const unrenderable = absent.filter((icon) => !isGenerated(icon))
const stale = prune ? renderedIcons().filter((url) => !referenced.has(url)) : []

const askFor = (icon: Request): string =>
  `mc-icons: ${iconUrl(icon.type, icon.id)} is referenced by ${[...icon.files].join(', ')} but has no file. Block sprites are committed ` +
  'rather than generated: render one wherever block models render, or take the flat form with type="item"'

if (check) {
  for (const icon of todo)
    console.error(`mc-icons: ${iconUrl(icon.type, icon.id)} is referenced by ${[...icon.files].join(', ')} but was never rendered`)

  for (const icon of unrenderable) console.error(askFor(icon))
  for (const url of stale) console.error(`mc-icons: ${url} is rendered, but no markdown references it anymore`)

  if (todo.length || unrenderable.length || stale.length) process.exitCode = 1
  else console.log(`mc-icons: ${all.length} referenced icons are all present, and none is stale`)

  process.exit(process.exitCode ?? 0)
}

for (const icon of unrenderable) console.error(askFor(icon))

let rendered = 0
const unknown: Icon[] = []
let version: string | undefined

if (todo.length) {
  version = (await fetchServerStats())?.version

  if (!version) throw new Error('mc-icons: the server reported no version, so there is nothing to fetch')

  const jar = join(cacheDir, `${version}.jar`)

  if (!existsSync(jar)) {
    const { versions } = (await (await fetch(MANIFEST)).json()) as { versions: { id: string; url: string }[] }
    const entry = versions.find(({ id }) => id === version)

    if (!entry) throw new Error(`mc-icons: Minecraft ${version} is not in the version manifest`)

    const { url, size } = ((await (await fetch(entry.url)).json()) as { downloads: { client: { url: string; size: number } } })
      .downloads.client

    console.log(`mc-icons: downloading Minecraft ${version} client jar (${(size / 1048576).toFixed(1)} MB)`)

    mkdirSync(cacheDir, { recursive: true })
    writeFileSync(jar, Buffer.from(await (await fetch(url)).arrayBuffer()))
  }

  const wanted = new Map(todo.map((icon) => [`assets/minecraft/textures/item/${icon.id.replace(/^minecraft:/, '')}.png`, icon]))
  const textures = unzipSync(readFileSync(jar), { filter: (file) => wanted.has(file.name) })

  for (const [name, icon] of wanted) {
    const texture = textures[name]

    if (!texture) {
      unknown.push(icon)
      continue
    }

    const buffer = await sharp(texture).resize(ICON_SIZE, ICON_SIZE, { kernel: 'nearest' }).webp({ lossless: true }).toBuffer()

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

const present = all.filter(isGenerated).length - todo.length

console.log(`mc-icons: ${rendered} rendered, ${stale.length} pruned, ${present} already present, ${unknown.length} unknown`)

for (const icon of unknown) console.error(`mc-icons: ${icon.id} has no item texture in the Minecraft ${version} jar, check the id`)

if (unknown.length || unrenderable.length) process.exitCode = 1
