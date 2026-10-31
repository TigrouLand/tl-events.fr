import { useIntervalFn } from '@vueuse/core'
import { normalizeServerStats, SERVER_STATS_URL } from '~/tools/server-stats'

type Options = {
  poll?: number
}

export const useServerStats = (options: Options = {}) => {
  // client-only, as the upstream answer is a live socket ping with nothing to render on the server
  const { data, refresh } = useFetch(SERVER_STATS_URL, {
    key: 'server-stats',
    server: false,
    lazy: true,
    transform: normalizeServerStats
  })

  // useFetch dedupes by key, but each caller would start its own timer; immediate:false keeps it out of SSR
  if (options.poll) useIntervalFn(refresh, options.poll, { immediate: import.meta.client })

  return {
    // the payload as soon as the API answers, up or not: a pill that copies the IP must survive a downtime
    stats: data,
    online: computed(() => data.value?.online === true),
    playersOnline: computed(() => data.value?.playersOnline ?? 0),
    playersMax: computed(() => data.value?.playersMax ?? 0),
    version: computed(() => data.value?.version),
    software: computed(() => data.value?.software),
    refresh
  }
}
