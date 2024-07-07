<template>
  <li class="col-span-1 flex rounded border border-gray-500 bg-gray-700 py-2 shadow">
    <img
      class="custom-image m-4 h-24 w-auto p-2"
      :src="`/${props.modifier.material.toLowerCase()}.webp`"
      :alt="props.modifier.material"
      draggable="false" />

    <div class="mr-2 flex flex-col justify-center text-white">
      <h1 class="mr-2 font-medium">{{ props.modifier.name }}</h1>
      <p class="mr-2 mt-1 text-sm">{{ getDescription(props.modifier) }}</p>
    </div>
  </li>
</template>

<script setup lang="ts">
import type { PropType } from 'vue';
import type { API } from '~/tools/types';

const props = defineProps({
  modifier: {
    type: Object as PropType<API.Modifier>,
    required: true,
  },
});

const getDescription = (modifier: API.Modifier): string => {
  const desc = modifier.web || modifier.description;
  let computed = desc.join(' ');
  computed = computed.replace(/§./g, '');
  return computed.replace(/\(.+\)/g, '');
};
</script>

<style scoped>
.custom-image {
  user-select: none;
  image-rendering: pixelated;
}
</style>
