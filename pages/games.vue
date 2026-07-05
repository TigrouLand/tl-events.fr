<template>
  <ResizablePanelGroup direction="horizontal" class="h-full">
    <ResizablePanel :default-size="22" :min-size="12" :max-size="40">
      <aside class="flex h-full flex-col overflow-y-hidden">
        <div class="backdrop-blur-xl p-5">
          <Input v-model="query" :placeholder="t('gamesPage.search')" />
        </div>
        <ScrollArea class="flex-1 min-h-0">
          <div class="flex flex-col gap-4 px-4 pb-6"> <!-- we put another wrapper here to not overlap scrollarea flexbox styles -->
            <GameCard
              v-for="game in filteredGames"
              :key="game.id"
              :game="gameWithUsernames(game)"
              :selected="selected(game)"
              @click="selectGame(game)" />
          </div>
        </ScrollArea>
      </aside>
    </ResizablePanel>

    <ResizableHandle with-handle />

    <ResizablePanel class="overflow-y-auto!">
      <Nav :floating="false" />
        
      <section v-if="selectedGame" class="relative grid h-full w-full grid-cols-1 gap-4 p-4 sm:grid-cols-2 sm:grid-rows-[auto_1fr]">
          <article class="rounded-xl border bg-card text-foreground border-border p-8 shadow">
            <h1 class="text-center text-lg font-bold">{{ selectedGame.name }}</h1>

            <div class="mb-4 text-center text-lg font-bold text-gray-400">
              <Icon :name="gameInfo.icon" class="mb-1 mr-1" />
              {{ t('gamesPage.gamePrefix') }} {{ gameInfo.type }}
            </div>

            <ul class="space-y-1 font-medium">
              <li class="flex gap-x-1">
                <Icon name="ion:game-controller" class="mb-0.5 mr-1 h-5 w-5" />
                {{ t('gamesPage.type') }} : {{ formatEventType(selectedGame.type) }}
              </li>
              <li class="flex gap-x-1">
                <Icon name="fa6-solid:users" class="mb-0.5 mr-1 h-5 w-5" />
                {{ t('gamesPage.players') }} : {{ selectedGame.players.length }}
              </li>
              <li v-if="isArchived(selectedGame)" class="flex gap-x-1">
                <Icon name="fa6-solid:clock" class="mb-0.5 mr-1 h-5 w-5 p-0.5" />
                {{ t('gamesPage.duration') }} : {{ formatTime() }}
              </li>
              <li class="flex gap-x-1">
                <Icon name="fa6-solid:calendar" class="mb-0.5 mr-1 h-5 w-5 p-0.5" />
                {{ t('gamesPage.startDate') }} : {{ formatDate(selectedGame.startDate) }}
              </li>
              <li v-if="selectedGame.modifiers && selectedGame.modifiers.length > 0" class="flex gap-x-1">
                <Icon name="ion:erlenmeyer-flask" class="mb-0.5 mr-1 h-5 w-5" />
                {{ t('gamesPage.scenarios') }} : {{ selectedGame.modifiers.join(', ') }}
              </li>
              <li v-if="selectedGame.events && selectedGame.events.length > 0" class="flex gap-x-1">
                <Icon name="fa6-solid:bolt" class="mb-0.5 mr-1 h-5 w-5 p-px" />
                {{ t('gamesPage.randomEvents') }} : {{ selectedGame.events.join(', ') }}
              </li>
              <li v-if="selectedGame.hiddenRoles" class="flex gap-x-1">
                <Icon name="fa6-solid:eye-slash" class="mb-0.5 mr-1 h-5 w-5 p-px" />
                {{ t('gamesPage.hiddenRoles') }}
              </li>
            </ul>
          </article>

          <article class="rounded-xl border bg-card text-foreground border-border p-8 shadow h-fit sm:col-start-1">
            <h1 class="text-center text-lg font-bold">
              {{ t('gamesPage.sectionPlayers') }}
            </h1>

          <ul v-if="selectedGame?.playerTeams && selectedGame.finalTeams" class="mt-4 grid">
            <li v-for="player in selectedGame.players" :key="player" class="my-2 grid grid-cols-[auto_1fr] grid-rows-2">
                <PlayerAvatar :player="getUsernameByUuid(player)" type="rounded" class="row-span-2 my-auto mr-4" />

                <div :class="cn('col-span-2 text-gray-400', { 'font-bold text-foreground!': isAlive(player) })">
                    <Icon :name="isAlive(player) ? 'fa-solid:trophy' : 'fa-solid:skull'" class="mb-1.5" />
                    {{ getUsernameByUuid(player) }}
                </div>

                <div class="col-span-2 col-start-2 row-start-2 flex items-center space-x-2">
                  <span :style="getStyleForTeam(getTeamOfPlayer(player))">{{ getTeamOfPlayer(player)?.name }}</span>
                  <Icon name="fa6-solid:caret-right" class="text-gray-300" />
                  <span :style="getStyleForTeam(getFinalTeamOfPlayer(player))">{{ getFinalTeamOfPlayer(player)?.name }}</span>
                </div>
            </li>
        </ul>

        <ul v-else-if="selectedGame.teams" class="mt-4 grid">
            <li v-for="team in selectedGame.teams.filter((t): boolean => t.name !== '')" :key="team.name">
                <h2 class="text-lg font-semibold" :style="getStyleForTeam(team)">
                {{ selectedGame.type === 'SkyDefender' ? (team.name === 'Bleue' ? t('gamesPage.attackers') : t('gamesPage.defenders')) : t('gamesPage.team', { name: team.name }) }}
                </h2>

                <div
                v-for="{ username: player, uuid } in getPlayersInTeam(team.name)"
                :key="uuid"
                class="my-4 grid grid-cols-[auto_1fr] grid-rows-[1fr_auto]">
                    <PlayerAvatar :player="player" type="rounded" class="row-span-2 my-auto mr-4" />

                    <div :class="cn('my-auto text-gray-400', { 'font-bold text-foreground!': isAlive(uuid) })">
                        <Icon :name="isAlive(uuid) ? 'fa-solid:trophy' : 'fa-solid:skull'" class="mb-1.5" />
                        {{ player }}
                    </div>

                    <div v-if="selectedGame.type === 'TaupeGun' && selectedGame.moles?.includes(uuid)" class="col-span-2 col-start-2 row-start-2 inline-block space-x-1 text-red-300">
                        <Icon name="fa6-solid:handshake-simple-slash" /> {{ t('gamesPage.mole') }}
                    </div>
                </div>
            </li>
        </ul>

        <ul v-else-if="selectedGame" class="mt-4 grid">
            <li v-for="player in selectedGame.players" :key="player" :class="cn('my-4 grid grid-cols-[auto_1fr] grid-rows-[1fr_auto]', { 'text-gray-400': !isAlive(player) })">
                <PlayerAvatar :player="getUsernameByUuid(player)" type="rounded" class="row-span-2 my-auto mr-4" />
    
                <div :class="cn('col-span-1 my-auto', { 'font-bold': isAlive(player)})">
                    <Icon :name="isAlive(player) ? 'fa-solid:trophy' : 'fa-solid:skull'" class="mb-1.5" />
                    {{ getUsernameByUuid(player) }}
                </div>
    
                <span v-if="selectedGame.type === 'LGUHC'" class="col-span-2 col-start-2 row-start-2 flex items-center space-x-2">
                    {{ getRoleForPlayer(player) }}
                </span>
            </li>
        </ul>
    </article>

    <article class="rounded-xl border bg-card text-foreground border-border p-8 shadow h-fit sm:col-start-2 sm:row-span-full sm:row-start-1">
        <h1 class="text-center text-lg font-bold">{{ t('gamesPage.sectionLogs') }}</h1>

        <ol
        class="relative mt-4 space-y-6 before:absolute before:top-1/2 before:h-[calc(100%-25px)] before:w-0.5 before:-translate-y-1/2 before:bg-gray-700">
            <li
            v-for="log in selectedGame.logs"
            :key="log"
            class="relative ml-4 text-accent-foreground before:absolute before:-left-5 before:top-1 before:h-3 before:w-3 before:rounded-full before:border before:border-background before:bg-gray-700">
                <template v-for="segment in parseLog(log)" :key="segment.value">
                    <span v-if="segment.type === 'player'" class="inline-flex items-center gap-1 font-medium">
                        <PlayerAvatar :player="segment.value" type="rounded" class="inline-block mb-1 size-4!" />
                        {{ segment.value }}
                    </span>
                    <template v-else>
                        {{ segment.value }}
                    </template>
                </template>
            </li>
        </ol>
    </article>
    </section>
    </ResizablePanel>
  </ResizablePanelGroup>
</template>

<script setup lang="ts">
import dayjs from 'dayjs'
import Nav from '~/components/Nav.vue'
import { Input } from '~/components/ui/input'
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from '~/components/ui/resizable'
import { ScrollArea } from '~/components/ui/scroll-area'
import { fetchAPI, type API } from '~/tools/api'
import { findQuery } from '~/tools/utils'

const { t } = useI18n()

useHead({
  title: t('games')
})

const [gamesResponse, membersResponse] = await Promise.all([useFetch(fetchAPI('games')), useFetch(fetchAPI('members'))])

const getUsernameByUuid = (uuid: string): string => {
  const memberName = members.value.find((p): boolean => p.uuid === uuid)?.name ?? ''
  return memberName.startsWith('~') ? memberName.slice(1) : memberName
}

const replaceUuids = (value: string): string => {
  // Each log can contain a uuid, we need to replace it by the username
  // The uuid is stored like this: <@uuid>

  const uuidRegex = /<@([a-zA-Z0-9-]+)>/g
  const matches = value.match(uuidRegex)

  if (!matches) {
    return value
  }

  matches.forEach((match): void => {
    const uuid = match.replace('<@', '').replace('>', '')
    const username = getUsernameByUuid(uuid)

    if (username) {
      value = value.replace(match, username)
    }
  })

  return value
}

const fixGameUuids = (game: API.Game): API.Game => {
  game.logs = game.logs.map(replaceUuids)

  const fixKeys: Array<keyof typeof game> = ['playerRoles', 'playerTeams', 'finalTeams']

  fixKeys.forEach((key): void => {
    if (game[key]) {
      const nodes = {} as Record<string, unknown>

      Object.entries(game[key] as object).forEach(([uuid, value]): void => {
        const username = replaceUuids(uuid)
        nodes[username] = value
      })

      game[key] = nodes as never
    }
  })

  return game
}

const defineGameInfo = (game: API.Game): { type: string; icon: string } => {
  if (isScheduled(game)) return { type: t('gamesPage.status.scheduled'), icon: 'fa6-solid:clock' }
  if (isArchived(game)) return { type: t('gamesPage.status.archived'), icon: 'fa6-solid:box-archive' }
  return { type: t('gamesPage.status.live'), icon: 'ion:game-controller' }
}

const isArchived = (game: API.Game): boolean => {
  return game.archiveDate !== -1
}

const isScheduled = (game: API.Game): boolean => {
  return game.startDate === -1 && game.scheduleDate !== -1
}

const formatDate = (timestamp: number): string => {
  return dayjs(timestamp).format('DD/MM/YYYY à HH:mm')
}

const gamesData = gamesResponse.data as Ref<API.GameResponse>
const members = membersResponse.data as Ref<API.Member[]>

const archivedGames = ref<API.Game[]>(gamesData.value.archivedGames)
const games = ref<API.Game[]>(gamesData.value.games)
const query = ref('')
const allGames = computed(() => [...games.value, ...archivedGames.value])
const filteredGames = computed(() => (query.value ? findQuery(allGames, query) : allGames.value))
const selectedGame = ref<API.Game>(fixGameUuids([...archivedGames.value, ...games.value][0]))
const gameInfo = defineGameInfo(selectedGame.value)

const interval = ref<NodeJS.Timeout | null>(null)

onMounted((): void => {
  interval.value = setInterval(refreshGames, 10000)
})

onUnmounted((): void => {
  clearInterval(interval.value as NodeJS.Timeout)
})

const getStyleForTeam = (team: API.Team | undefined): string => {
  return `color: rgba(${team?.colors.join(', ')});`
}

const selectGame = (game: API.Game): void => {
  if (archivedGames.value.includes(game)) {
    selectedGame.value = fixGameUuids(game)
  }
}

const gameWithUsernames = (game: API.Game): API.Game => {
  return {
    ...game,
    players: game.players
      ? game.players.map((player): string => {
          const member = members.value.find((m): boolean => m.uuid === player)
          return member ? member.name : player
        })
      : []
  }
}

const selected = (game: API.Game): boolean => {
  return selectedGame.value.id === game.id
}

const getRoleForPlayer = (uuid: string): string | undefined => {
  const username = getUsernameByUuid(uuid)
  return selectedGame.value.playerRoles?.[username]
}

const getPlayersInTeam = (name: string) => {
  return Object.entries(selectedGame.value.playerTeams || {})
    .filter(([_, v]): boolean => v === name)
    .map(([k, _]) => {
      return {
        username: k,
        uuid: getUuidByUsername(k)
      }
    })
}

const getTeamOfPlayer = (uuid: string): API.Team | undefined => {
  const username = getUsernameByUuid(uuid)
  const teamName = selectedGame.value.playerTeams?.[username]
  return getTeamByName(teamName)
}

const getFinalTeamOfPlayer = (uuid: string): API.Team | undefined => {
  const username = getUsernameByUuid(uuid)
  const teamName = selectedGame.value.finalTeams?.[username]
  return getTeamByName(teamName)
}

const getTeamByName = (name: string | undefined): API.Team | undefined => {
  return selectedGame.value.teams?.find((t): boolean => t.name === name)
}

const getUuidByUsername = (name: string): string => {
  return members.value.find((p): boolean => p.name === name || p.name === `~${name}`)?.uuid || ''
}

type LogSegment = { type: 'text' | 'player'; value: string }

const parseLog = (log: string): LogSegment[] => {
  const playerNames = members.value
    .map((m): string => (m.name.startsWith('~') ? m.name.slice(1) : m.name))
    .filter(Boolean)
    .sort((a, b) => b.length - a.length)

  let segments: LogSegment[] = [{ type: 'text', value: log }]

  for (const name of playerNames) {
    const next: LogSegment[] = []
    for (const seg of segments) {
      if (seg.type !== 'text') {
        next.push(seg)
        continue
      }
      const parts = seg.value.split(name)
      parts.forEach((part, i) => {
        if (part) next.push({ type: 'text', value: part })
        if (i < parts.length - 1) next.push({ type: 'player', value: name })
      })
    }
    segments = next
  }

  return segments
}

const refreshGames = async (): Promise<void> => {
  const data = await $fetch<API.GameResponse>(fetchAPI('games'))
  games.value = data.games
  archivedGames.value = data.archivedGames
}

const isAlive = (name: string): boolean => {
  return selectedGame.value.alive.includes(name)
}

const formatTime = (): string => {
  const { minutes, seconds, hours } = selectedGame.value
  const format = (value: number): string => value.toString().padStart(2, '0')

  return `${format(hours)}:${format(minutes)}:${format(seconds)}`
}

const formatEventType = (type: string): string => {
  switch (type) {
    case 'LGUHC':
      return 'LG-UHC'
    case 'UHCRun':
      return 'UHC-Run'
    default:
      return type || t('gamesPage.unknown')
  }
}
</script>
