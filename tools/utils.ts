import type { Ref } from 'vue'
import { type CxOptions, cx } from 'class-variance-authority'
import Levenshtein from 'levenshtein'
import { twMerge } from 'tailwind-merge'

export const cn = (...inputs: CxOptions) => twMerge(cx(inputs))

export const PLAYER_STATS = [
  { key: 'wins', icon: 'fa-solid:trophy' },
  { key: 'kills', icon: 'game-icons:broadsword' },
  { key: 'deaths', icon: 'fa-solid:skull' },
] as const

export type StatKey = (typeof PLAYER_STATS)[number]['key']

export const findQuery = <T extends { name: string }>(queries: Ref<T[]>, current: Ref<string>) => {
  return queries.value.filter(
    (query): boolean =>
      query.name.toLowerCase().startsWith(current.value.toLowerCase()) ||
      new Levenshtein(query.name.toLowerCase(), current.value.toLowerCase()).distance < 5
  )
}
