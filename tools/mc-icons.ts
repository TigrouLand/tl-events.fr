/**
 * The contract every MCicon writer shares: the markdown tag, the id it points at and the file the
 * generator has to have produced. Read by the component (URL), the build guard (existence) and
 * tools/icons/render.mts (generation), so the three can never disagree on a path.
 */

export type IconType = 'block' | 'item'

export type Icon = { type: IconType; id: string }

/** Rendered square, big enough to stay crisp at twice the default display size. */
export const ICON_SIZE = 96

const ICON_TYPES: readonly string[] = ['block', 'item']

/** MDC kebab-cases component tags, so <MCicon> reaches us as m-cicon; the other two are author typos we still accept. */
const TAG = /<(?:m-cicon|mc-icon|mcicon)\b([^>]*)>/gi
const ATTR = /(\w[\w-]*)(?:\s*=\s*"([^"]*)")?/g
const SAFE_ID = /^[a-z0-9_.:-]+$/

/** one picture per id: the foil rides on top of this file as a mask, so nothing renders a second copy */
export const iconUrl = (type: IconType, id: string): string => `/icons/${type}/${id.replace(/^minecraft:/, '')}.webp`

/** a bare markdown attribute arrives as an empty string, and presence alone is the ask */
export const isEnchanted = (value: unknown): boolean =>
  value === '' || value === true || (typeof value === 'string' && !['false', '0'].includes(value.toLowerCase()))

/** `enchanted` and `glint` are the same ask spelled two ways, and either one only ever moves CSS */
export const wantsFoil = (enchanted: unknown, glint: unknown): boolean => isEnchanted(enchanted) || isEnchanted(glint)

const parseAttrs = (source: string): Record<string, string> => {
  const props: Record<string, string> = {}
  for (const [, name, value] of source.matchAll(ATTR)) {
    props[name.toLowerCase()] = value ?? ''
  }
  return props
}

export const collectIcons = (body: string): Icon[] => {
  const found = new Map<string, Icon>()

  for (const [, attrs] of body.matchAll(TAG)) {
    const { type, id } = parseAttrs(attrs)

    if (!id || !SAFE_ID.test(id) || id.includes('..')) continue

    const icon: Icon = { type: (ICON_TYPES.includes(type) ? type : 'block') as IconType, id }
    found.set(iconUrl(icon.type, icon.id), icon)
  }

  return [...found.values()]
}
