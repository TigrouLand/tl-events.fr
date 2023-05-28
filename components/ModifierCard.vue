<template>
  <li class="col-span-1 bg-gray-700 border border-gray-500 rounded shadow divide-y divide-gray-200">
    <div class="w-full flex items-center justify-between">
      <img class="h-24 p-2 m-4 w-auto" :src="`/${props.modifier.material.toLowerCase()}.png`" :alt="props.modifier.material">
      <div class="flex-1 truncate py-6">
        <div class="flex items-center space-x-1">
          <h1 class="text-white font-medium mr-2">
            {{ props.modifier.name }}
          </h1>
        </div>
        <p class="mt-1 text-white text-sm" v-html="getDescription(props.modifier)" />
      </div>
    </div>
  </li>
</template>

<script setup lang="ts">
import { PropType } from 'vue/dist/vue';
import { Modifier } from '~/typings/api';

const props = defineProps({
  modifier: {
    type: Object as PropType<Modifier>,
    required: true
  }
});

const getDescription = (modifier: Modifier) => {
  const desc = modifier.web || modifier.description;
  let computed = desc.join('<br>');
  computed = computed.replace(/§./g, '');
  return computed.replace(/\(.+\)/g, '');
};
</script>
