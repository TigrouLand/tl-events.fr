<template>
  <div v-if="props.rank === 'ADMIN'">
    <span class="flex-shrink-0 inline-block px-2 py-0.5 text-gray-800 text-xs font-medium bg-red-400 rounded-full">Admin</span>
  </div>
  <div v-else-if="props.rank === 'BUILDER'">
    <span class="flex-shrink-0 inline-block px-2 py-0.5 text-gray-800 text-xs font-medium bg-blue-400 rounded-full">Builder</span>
  </div>
  <div v-else-if="props.rank === 'GRAPHIST'">
    <span class="flex-shrink-0 inline-block px-2 py-0.5 text-gray-800 text-xs font-medium bg-yellow-400 rounded-full">Graphiste</span>
  </div>
  <div v-else-if="props.rank === 'STREAMER'">
    <span class="flex-shrink-0 inline-block px-2 py-0.5 text-gray-800 text-xs font-medium bg-purple-400 rounded-full">Streamer</span>
  </div>
  <div v-else>
    <span class="flex-shrink-0 inline-block px-2 py-0.5 text-gray-800 text-xs font-medium bg-gray-400 rounded-full">Joueur</span>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  rank: {
    type: String,
    required: true
  }
});
</script>

<style scoped>

</style>
