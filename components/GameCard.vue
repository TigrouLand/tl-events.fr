<template>
  <component
    :is="isUpcoming(props.game) ? 'div' : 'button'"
    :class="'group min-w-56 !ml-0 rounded border bg-gray-800 p-3 shadow ' + (selected ? 'border-primary' : 'border-gray-500')">
    <h1 class="w-fit whitespace-nowrap font-medium text-white">
      <Icon v-if="isUpcoming(props.game)" name="carbon:time-filled" class="text-gray-400" />
      <Icon v-else-if="isArchived(props.game)" name="fa6-solid:box-archive" class="text-gray-400" />
      <Icon v-else name="ion:game-controller" class="text-green-500" />
      {{ props.game.name }} [#{{ props.game.id }}]
    </h1>

    <div v-if="props.game.players.length > 0" class="my-2 w-fit -space-x-1">
      <Avatar
        v-for="player in [...props.game.players].slice(0, 8)"
        :key="player"
        :player="player"
        type="rounded"
        class="inline-block !h-6 !w-6 ring-2 ring-gray-800" />

      <div v-if="props.game.players.length > 8" class="inline-block h-6 w-6 rounded-full bg-gray-700 ring-2 ring-gray-800">
        <span class="grid h-full place-items-center text-[12px] font-bold text-gray-300">+{{ props.game.players.length - 8 }}</span>
      </div>
    </div>

    <div class="flex w-fit flex-col gap-y-1 text-sm font-light text-gray-300">
      <span class="w-fit">
        <Icon name="fa6-solid:clock" />
        {{ format(isArchived(props.game) ? props.game.scheduleDate : props.game.archiveDate) }}
      </span>
      <span v-if="isArchived(props.game)">
        <Icon name="ion:ios-arrow-round-forward" size="20" class="transition-transform group-hover:translate-x-1" />
        Voir les détails
      </span>
    </div>
  </component>
</template>

<script setup lang="ts">
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime.js';
import 'dayjs/locale/fr.js';
import type { API } from '~/tools/types';

dayjs.locale('fr');
dayjs.extend(relativeTime);

const props = defineProps({
  game: {
    type: Object as PropType<API.Game>,
    required: true,
  },
  selected: {
    type: Boolean,
    default: false,
  },
});

const isArchived = (game: API.Game): boolean => {
  return game.archiveDate !== -1;
};

const format = (timestamp: number): string => {
  if (!timestamp || timestamp === -1) return 'À venir';
  const formatted = dayjs(timestamp).fromNow();
  return formatted.charAt(0).toUpperCase() + formatted.slice(1);
};

const isUpcoming = (game: API.Game): boolean => {
  return game.status === 'CREATED';
};
</script>
