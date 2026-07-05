<template>
  <li class="overflow-hidden rounded-lg bg-linear-to-tr from-primary to-[#f75854] shadow">
    <div class="h-4/6 p-6 text-foreground grid grid-cols-[auto_1fr] items-center grid-rows-[1fr_auto]">
      <Icon :name="props.icon" class="mr-6 row-span-2 h-12 w-12 p-3 rounded-md bg-gray-700" size="24" />
      <span class="text-2xl leading-none h-fit font-semibold">{{ props.stats ?? '--' }}</span>
      <span class="text-sm font-medium">{{ props.title }}</span>
    </div>

    <nuxt-link
      :to="to"
      class="group flex h-2/6 w-full items-center gap-x-2 bg-gray-700 px-6 py-3 text-sm font-medium text-white transition-colors duration-75 hover:bg-gray-600">
      {{ props.description }} <Icon name="ion:ios-arrow-round-forward" class="transition-all group-hover:translate-x-2" size="20" />
    </nuxt-link>
  </li>
</template>

<script setup lang="ts">
import type { API } from '~/tools/api'

const props = defineProps({
  title: { type: String, required: true },
  stats: { type: Number as PropType<API.Stats[keyof API.Stats]>, default: undefined },
  description: { type: String, required: true },
  icon: { type: String, required: true },
  to: { type: String, required: true }
})
</script>
