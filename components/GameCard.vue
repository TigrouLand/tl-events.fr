<template>
  <component :is="isUpcoming(props.game) ? 'div': 'button'" :class="'bg-gray-800 border ' + (selected ? 'border-red-500 ' : 'border-gray-500 ') + 'rounded shadow w-full justify-start text-left'">
    <div class="w-full p-2">
      <div class="flex">
        <h1 class="text-white font-medium">
          <font-awesome-icon v-if="isUpcoming(props.game)" icon="fa-solid fa-clock" class="text-gray-400" />
          <font-awesome-icon v-else-if="isArchived(props.game)" icon="fa-solid fa-archive" class="text-gray-400" />
          <font-awesome-icon v-else icon="fa-solid fa-props.gamepad" class="text-green-500" />
          {{ props.game.name }} [#{{ props.game.id }}]
        </h1>
      </div>
      <div v-if="props.game.players" class="mt-2 -space-x-1 overflow-hidden justify-start text-left">
        <img v-for="player in props.game.players.slice(0, 7)" :key="player" class="inline-block h-6 w-6 rounded-full ring-2 ring-gray-800" :src="'https://avatars.tl-events.fr/helms/' + player + '.png'" alt="">
      </div>
      <div v-if="isArchived(props.game)" class="mt-2 text-gray-300 font-light text-sm justify-start text-left">
        <font-awesome-icon icon="fa-solid fa-clock" /> {{ format(props.game.scheduleDate) }}
      </div>
      <div v-else class="mt-2 text-gray-300 font-light text-sm justify-start text-left">
        <font-awesome-icon icon="fa-solid fa-clock" /> {{ format(props.game.archiveDate) }}
      </div>
      <div v-if="isArchived(props.game)" class="mt-2 text-gray-300 font-light text-sm justify-start text-left">
        <font-awesome-icon icon="fa-solid fa-arrow-circle-right" /> Voir les détails
      </div>
    </div>
  </component>
</template>

<script setup lang="ts">
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime.js';
import 'dayjs/locale/fr.js';
import type { PropType } from 'vue/dist/vue';
import type { Game } from '~/typings/api';

// eslint-disable-next-line import/no-named-as-default-member
dayjs.locale('fr');
// eslint-disable-next-line import/no-named-as-default-member
dayjs.extend(relativeTime);

const props = defineProps({
  game: {
    type: Object as PropType<Game>,
    required: true,
  },
  selected: {
    type: Boolean,
    required: false,
    default: false,
  },
});

const isArchived = (game: Game) => {
  return game.archiveDate !== -1;
};

const format = (timestamp: number) => {
  if (!timestamp || timestamp === -1) {
    return 'À venir';
  }
  const formatted = dayjs(timestamp).fromNow();
  return formatted.charAt(0).toUpperCase() + formatted.slice(1);
};

const isUpcoming = (game: Game) => {
  return game.status === 'CREATED';
};
</script>

<style scoped>

</style>
