<template>
  <div v-if="props.active">
    <span class="inline-block flex-shrink-0 rounded-full bg-green-400 px-2 py-0.5 text-xs font-medium text-gray-800">Activé</span>
  </div>
  <div v-else>
    <span class="inline-block flex-shrink-0 rounded-full bg-red-400 px-2 py-0.5 text-xs font-medium text-gray-800">Désactivé</span>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  active: {
    type: Boolean,
    required: true,
  },
});
</script>
