/**
 * this is a Nitro plugin, not an app plugin (/plugins),
 * llms:generate:full only exists server-side.
 */
import type { ModuleOptions } from 'nuxt-llms'
import { defineNitroPlugin } from 'nitropack/runtime'

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

export default defineNitroPlugin((nitroApp) => {
  nitroApp.hooks.hook('llms:generate:full', (_event, options, contents) => {
    contents.unshift(renderIndex(options))
  })
})
