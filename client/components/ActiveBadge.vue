<template>
  <div v-if="active">
    <span class="flex-shrink-0 inline-block px-2 py-0.5 text-green-800 text-xs font-medium bg-green-100 rounded-full">Activé</span>
  </div>
  <div v-else>
    <span class="flex-shrink-0 inline-block px-2 py-0.5 text-red-800 text-xs font-medium bg-red-100 rounded-full">Désactivé</span>
  </div>
</template>

<script>
export default {
  name: 'ActiveBadge',
  props: ['active']
};
</script>
