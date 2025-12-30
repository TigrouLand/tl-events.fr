<template>
  <span v-if="props.rank === 'ADMIN'" class="custom-item bg-red-400">{{ getBadgeName(props.rank) }}</span>
  <span v-else-if="props.rank === 'BUILDER'" class="custom-item bg-blue-400">{{ getBadgeName(props.rank) }}</span>
  <span v-else-if="props.rank === 'GRAPHIST'" class="custom-item bg-yellow-400">{{ getBadgeName(props.rank) }}</span>
  <span v-else-if="props.rank === 'STREAMER'" class="custom-item bg-purple-400">{{ getBadgeName(props.rank) }}</span>
  <span v-else class="custom-item bg-gray-400">{{ getBadgeName(props.rank) }}</span>
</template>

<script setup lang="ts">
const props = defineProps({
  rank: { type: String, required: true }
})

const getBadgeName = (rank: typeof props.rank) => {
  return $t(`ranks.${rank.toLowerCase()}`)
}
</script>

<style scoped>
.custom-item {
  @apply uppercase rounded-full px-2 h-5 py-0.5 text-xs select-none font-semibold text-gray-800;
}
</style>
