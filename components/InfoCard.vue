<template>
  <li class="overflow-hidden rounded-lg bg-primary shadow">
    <div class="flex h-4/6 gap-x-4 p-6">
      <div class="grid h-12 w-12 place-items-center rounded-md bg-gray-700">
        <Icon :name="props.icon" class="text-primary" size="24" />
      </div>
      <div class="text-white">
        <span class="text-2xl font-semibold">{{ props.stats ?? '--' }}</span>
        <p class="text-sm font-medium">{{ props.title }}</p>
      </div>
    </div>

    <nuxt-link
      :to="to"
      class="group flex h-2/6 w-full items-center gap-x-2 bg-gray-700 px-6 py-3 text-sm font-medium text-white transition-colors duration-75 hover:bg-gray-600">
      {{ props.description }} <Icon name="ion:ios-arrow-round-forward" class="transition-all group-hover:translate-x-2" size="20" />
    </nuxt-link>
  </li>
</template>

<script setup lang="ts">
import type { API } from '~/tools/types';

const props = defineProps({
  title: {
    type: String,
    required: true,
  },
  stats: {
    type: Number as PropType<API.Stats[keyof API.Stats]>,
    default: undefined,
  },
  description: {
    type: String,
    required: true,
  },
  icon: {
    type: String,
    required: true,
  },
  to: {
    type: String,
    required: true,
  },
});
</script>
