/**
 * this is a Nitro plugin, not an app plugin (/plugins):
 * nuxt-llms only exposes its generation hooks server-side.
 */
import type { ModuleOptions } from 'nuxt-llms'
import { defineNitroPlugin } from 'nitropack/runtime'
import { MC_VERSION_TOKEN } from '~/tools/llms'
import { fetchServerStats } from '~/tools/server-stats'

type Section = ModuleOptions['sections'][number] & { contentCollection?: string }

const renderLink = (link: { title: string; href: string; description?: string }): string =>
  link.description ? `- [${link.title}](${link.href}): ${link.description}` : `- [${link.title}](${link.href})`

/** static sections of llms.txt, inlined so an agent reading only llms-full.txt still gets the site map */
const renderIndex = (options: ModuleOptions): string => {
  const blocks = [`# ${options.title ?? 'Documentation'}`, options.description ? `> ${options.description}` : '']

  for (const section of options.sections as Section[]) {
    if (section.contentCollection) continue
    const links = (section.links ?? []).map(renderLink).join('\n')
    if (!links) continue
    blocks.push([`## ${section.title}`, section.description ?? '', links].filter((part) => part).join('\n\n'))
  }

  if (options.notes?.length) blocks.push(['## Notes', options.notes.map((note) => `- ${note}`).join('\n')].join('\n\n'))

  return blocks.filter((block) => block).join('\n\n')
}

/** the same request the nav pill answers: nothing else decides what version this document prints */
const fillVersion = async (options: ModuleOptions): Promise<void> => {
  if (!options.description?.includes(MC_VERSION_TOKEN)) return
  const stats = await fetchServerStats()
  // an unverified number is worse than none: llms.txt is what an agent quotes back to its user
  const clause = stats?.online && stats.version ? `, version ${stats.version}` : ''
  options.description = options.description.replace(MC_VERSION_TOKEN, clause)
}

export default defineNitroPlugin((nitroApp) => {
  nitroApp.hooks.hook('llms:generate', async (_event, options) => {
    await fillVersion(options)
  })

  nitroApp.hooks.hook('llms:generate:full', async (_event, options, contents) => {
    await fillVersion(options)
    contents.unshift(renderIndex(options))
  })
})
