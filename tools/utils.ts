import type { Ref } from 'vue'
import Levenshtein from 'levenshtein'

export const findQuery = <T extends { name: string }>(queries: Ref<T[]>, current: Ref<string>) => {
  return queries.value.filter(
    (query): boolean =>
      query.name.toLowerCase().startsWith(current.value.toLowerCase()) ||
      new Levenshtein(query.name.toLowerCase(), current.value.toLowerCase()).distance < 5
  )
}
