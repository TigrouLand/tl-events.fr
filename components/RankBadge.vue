<template>
  <div v-if="props.rank === 'ADMIN'">
    <span class="custom-item bg-red-400">Admin</span>
  </div>
  <div v-else-if="props.rank === 'BUILDER'">
    <span class="custom-item bg-blue-400">Builder</span>
  </div>
  <div v-else-if="props.rank === 'GRAPHIST'">
    <span class="custom-item bg-yellow-400">Graphiste</span>
  </div>
  <div v-else-if="props.rank === 'STREAMER'">
    <span class="custom-item bg-purple-400">Streamer</span>
  </div>
  <div v-else>
    <span class="custom-item bg-gray-400">Joueur</span>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  rank: {
    type: String,
    required: true,
  },
});
</script>

<style scoped>
.custom-item {
  @apply inline-block flex-shrink-0 rounded-full px-2 py-0.5 text-xs font-medium text-gray-800;
}
</style>
