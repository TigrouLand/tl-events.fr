<template>
  <div v-if="rank === 'Admin'">
    <span class="flex-shrink-0 inline-block px-2 py-0.5 text-gray-800 text-xs font-medium bg-red-400 rounded-full">Admin</span>
  </div>
  <div v-else>
    <span class="flex-shrink-0 inline-block px-2 py-0.5 text-gray-800 text-xs font-medium bg-gray-400 rounded-full">Joueur</span>
  </div>
</template>

<script>
export default {
  name: 'RankBadge',
  props: ['rank']
};
</script>

<style scoped>

</style>
