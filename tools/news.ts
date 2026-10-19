export interface NewsTag {
  slug: string
  label: string
  count: number
}

const hashKey = (value: string): string => {
  let hash = 0
  for (const char of value) hash = (hash * 31 + char.charCodeAt(0)) >>> 0
  return hash.toString(36)
}

/** Tags are free-form author text ("Màj", "Saison 5"), so the URL form is derived, not stored. */
export const slugifyTag = (tag: string): string => {
  const slug = tag
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '')
    .trim()
    .toLowerCase()
    .replace(/[^\p{L}\p{N}]+/gu, '-')
    .replace(/^-+|-+$/g, '')
  return slug || `tag-${hashKey(tag)}`
}

export const collectTags = (posts: readonly { tags?: string[] | null }[]): NewsTag[] => {
  const grouped = new Map<string, { labels: Map<string, number>; count: number }>()

  for (const post of posts) {
    for (const tag of post.tags ?? []) {
      const slug = slugifyTag(tag)
      const group = grouped.get(slug) ?? { labels: new Map<string, number>(), count: 0 }
      group.labels.set(tag, (group.labels.get(tag) ?? 0) + 1)
      group.count += 1
      grouped.set(slug, group)
    }
  }

  return [...grouped]
    .map(([slug, group]) => ({
      slug,
      // spellings that only differ by case or accents collapse into one tag; keep the most used
      label: [...group.labels].sort(([a, na], [b, nb]) => nb - na || a.localeCompare(b))[0][0],
      count: group.count
    }))
    .sort((a, b) => b.count - a.count || a.label.localeCompare(b.label))
}

export const formatDateLocalized = (value: string | Date | null | undefined, locale: string): string =>
  value ? new Intl.DateTimeFormat(locale, { dateStyle: 'long' }).format(new Date(value)) : ''
