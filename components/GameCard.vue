<template>
  <component
    :is="isUpcoming(props.game) ? 'div' : 'button'"
    ref="cardRef"
    :class="'group w-full rounded border-2 bg-card p-3 shadow text-left ' + (selected ? 'border-primary' : 'border-border')">
    <h1 class="flex w-fit items-center gap-2 whitespace-nowrap font-medium">
      <Icon v-if="isUpcoming(props.game)" name="carbon:time-filled" class="text-accent-foreground" />
      <Icon v-else-if="isArchived(props.game)" name="fa6-solid:box-archive" class="text-accent-foreground" />
      <Icon v-else name="ion:game-controller" class="text-green-500" />
      <span class='text-foreground'>{{ props.game.name }}</span>
      <Badge variant="outline">#{{ props.game.id }}</Badge>
    </h1>

    <div v-if="props.game.players.length > 0" class="my-2 h-6 -space-x-1 flex items-center">
      <PlayerAvatar
        v-for="player in visiblePlayers"
        :key="player"
        :player="player"
        type="rounded"
        class="inline-block h-full w-6! ring-2 ring-card"
      />
      <div v-if="hiddenCount > 0" class="inline-grid place-items-center text-[12px] font-bold select-none w-6 text-accent-foreground rounded-full bg-background ring-2 ring-background z-1 h-full">
        +{{ hiddenCount }}
      </div>
    </div>

    <div class="flex w-fit flex-col gap-y-1 text-sm font-light text-accent-foreground">
      <span class="w-fit">
        <Icon name="fa6-solid:clock" class="mr-1.5" />
        {{ format(isArchived(props.game) ? props.game.scheduleDate : props.game.archiveDate) }}
      </span>
      <span v-if="isArchived(props.game)">
        <Icon name="ion:ios-arrow-round-forward" size="20" class="transition-transform group-hover:translate-x-1" />
        {{ t('gameCard.viewDetails') }}
      </span>
    </div>
  </component>
</template>

<script setup lang="ts">
import { useResizeObserver } from '@vueuse/core'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime.js'
import { Badge } from '~/components/ui/badge'
import 'dayjs/locale/fr.js'
import type { API } from '~/tools/api'
import { DEFAULT_LANG } from '~/tools/i18n'

dayjs.locale(DEFAULT_LANG.code)
dayjs.extend(relativeTime)

const { t } = useI18n()

const props = defineProps({
  game: { type: Object as PropType<API.Game>, required: true },
  selected: { type: Boolean, default: false }
})

const cardRef = ref<HTMLElement>()
const cardWidth = ref(0)

useResizeObserver(cardRef, ([entry]) => {
  cardWidth.value = entry.contentRect.width
})

// p-3 = 12px each side; avatar = 24px; -space-x-1 overlap = 4px → net 20px per extra avatar
const PADDING = 24
const AVATAR_SIZE = 24
const AVATAR_NET = 20

const maxVisible = computed(() => {
  const total = props.game.players.length
  const available = cardWidth.value - PADDING
  if (available <= 0) return 1

  const allWidth = AVATAR_SIZE + (total - 1) * AVATAR_NET
  if (allWidth <= available) return total

  // Reserve one badge slot
  return Math.max(1, Math.floor((available - AVATAR_SIZE) / AVATAR_NET))
})

const visiblePlayers = computed(() => props.game.players.slice(0, maxVisible.value))
const hiddenCount = computed(() => Math.max(0, props.game.players.length - maxVisible.value))

const isArchived = (game: API.Game): boolean => {
  return game.archiveDate !== -1
}

const format = (timestamp: number): string => {
  if (!timestamp || timestamp === -1) return t('gameCard.upcoming')
  const relative = dayjs(timestamp).fromNow()
  const relativeFormatted = relative.charAt(0).toUpperCase() + relative.slice(1)
  const absolute = dayjs(timestamp).format('DD/MM/YYYY à HH:mm')
  return t('gameCard.dateFormat', { relative: relativeFormatted, date: absolute })
}

const isUpcoming = (game: API.Game): boolean => {
  return game.status === 'CREATED'
}
</script>
