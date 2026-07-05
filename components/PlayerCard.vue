<script setup lang="ts">
import type { API } from '~/tools/api'
import { Card, CardContent, CardHeader, CardTitle } from '~/components/ui/card'
import { PLAYER_STATS } from '~/tools/utils'

const props = defineProps({
  player: { type: Object as PropType<API.Member>, required: true },
  podium: { type: Number as PropType<1 | 2 | 3>, default: undefined }
})

const blacklisted = props.player.name.startsWith('~')

const podiumClass = computed(() => ({
  1: 'border-yellow-400/50 bg-yellow-400/25',
  2: 'border-slate-300/50 bg-slate-300/25',
  3: 'border-orange-400/50 bg-orange-400/25',
}[props.podium!]))
</script>

<template>
  <Card v-if="!blacklisted" :class="cn('grid grid-cols-[auto_1fr] gap-0 p-0 px-4', podiumClass)">
    <PlayerAvatar :player="props.player.name" type="flat" class="row-span-2 mt-3 mr-6 w-24!" />
    <CardContent class="mt-5 p-0 text-sm text-muted-foreground">
      <RankBadge :rank="props.player.rank" />
      <CardTitle :title="props.player.name" class="text-foreground text-lg truncate max-w-37">{{ props.player.name }}</CardTitle>
      <ul className='flex items-center gap-x-3'>
        <li v-for="stat in PLAYER_STATS" :key="stat.key" class="inline-flex items-center gap-1.5">
          {{ props.player[stat.key] }} <Icon :name="stat.icon" />
        </li>
      </ul>
    </CardContent>
  </Card>
</template>
