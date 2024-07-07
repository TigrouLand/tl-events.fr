<template>
  <li v-if="!blacklisted" class="col-span-1 flex w-full rounded border border-gray-500 bg-gray-700 px-6 shadow">
    <Avatar :player="props.player.name" class="pt-3" />

    <div class="ml-8 flex w-full flex-col justify-center truncate text-white">
      <div class="flex w-full">
        <RankBadge :rank="props.player.rank" />
        <h1 class="!ml-3 truncate font-medium">{{ props.player.name }}</h1>
      </div>
      <ul class="mt-1 flex space-x-5 text-sm">
        <li class="flex items-center gap-x-2">{{ props.player.kills }} <Icon name="game-icons:broadsword" /></li>
        <li class="flex items-center gap-x-2">{{ props.player.deaths }} <Icon name="fa-solid:skull" /></li>
        <li class="flex items-center gap-x-2">{{ props.player.wins }} <Icon name="fa-solid:trophy" /></li>
      </ul>
    </div>
  </li>
</template>

<script setup lang="ts">
import type { API } from '~/tools/types';

const props = defineProps({
  player: {
    type: Object as PropType<API.Member>,
    required: true,
  },
});

const blacklisted = props.player.name.startsWith('~');
</script>
