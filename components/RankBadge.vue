<template>
  <Badge :class="cn(RANK_COLORS[props.rank] ?? 'bg-gray-400', 'text-[10px] uppercase text-white select-none')">
    {{ $t(`ranks.${props.rank.toLowerCase()}`) }}
  </Badge>
</template>

<script setup lang="ts">
import { Badge } from '~/components/ui/badge'

const props = defineProps({
  rank: { type: String, required: true }
})

const RANK_COLORS: Record<string, string> = {
  ADMIN: 'bg-red-400',
  BUILDER: 'bg-blue-400',
  GRAPHIST: 'bg-yellow-400',
  STREAMER: 'bg-purple-400'
}
</script>
