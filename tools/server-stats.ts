import { SERVER_IP } from './seo.ts'

/**
 * Shared by the browser, the Nuxt build and the icon CLI,  must stay free of node + Nuxt imports.
 * Relative imports name their extension: tools/icons/render.mts runs under plain Node.
 */
export const SERVER_STATS_URL = `https://api.mcsrvstat.us/3/${SERVER_IP}`

export type ServerStats = {
  online: boolean
  playersOnline: number
  playersMax: number
  version?: string
  software?: string
}

type RawStats = Omit<ServerStats, 'playersOnline' | 'playersMax'> & {
  players: { online?: number; max?: number }
}

/** a server that is down answers a trimmed payload, and a rate-limited API answers anything at all */
export const normalizeServerStats = (raw: Partial<RawStats>): ServerStats | undefined => {
  if (typeof raw !== 'object' || raw == null) return undefined
  const { online, players, version, software } = raw
  if (typeof online !== 'boolean') return undefined
  return { online, playersOnline: players?.online ?? 0, playersMax: players?.max ?? 0, version, software }
}

export const fetchServerStats = async (): Promise<ServerStats | undefined> => {
  try {
    const res = await globalThis.fetch(SERVER_STATS_URL, { signal: AbortSignal.timeout(5_000) })
    return normalizeServerStats(await res.json())
  } catch {
    return undefined
  }
}
