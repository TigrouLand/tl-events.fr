<template>
  <div v-if="props.active">
    <span class="flex-shrink-0 inline-block px-2 py-0.5 text-gray-800 text-xs font-medium bg-green-400 rounded-full">Activé</span>
  </div>
  <div v-else>
    <span class="flex-shrink-0 inline-block px-2 py-0.5 text-gray-800 text-xs font-medium bg-red-400 rounded-full">Désactivé</span>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  active: {
    type: Boolean,
    required: true
  }
});
</script>
