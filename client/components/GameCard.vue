<template>
  <component :is="isUpcoming(game) ? 'div': 'button'" :class="'bg-gray-800 border ' + (selected ? 'border-red-500 ' : 'border-gray-500 ') + 'rounded shadow w-full justify-start text-left'">
    <div class="w-full p-2">
      <div class="flex">
        <div class="text-white font-medium">
          <font-awesome-icon v-if="isScheduled(game)" :icon="faClock" class="text-gray-400" />
          <font-awesome-icon v-else-if="isArchived(game)" :icon="faArchive" class="text-gray-400" />
          <font-awesome-icon v-else :icon="faGamepad" class="text-green-500" />
          {{ game.name }} [#{{ game.id }}]
        </div>
      </div>
      <div class="py-1 -space-x-1 overflow-hidden justify-start text-left" v-if="game.players">
        <img v-for="player in game.players.slice(0, 7)" :key="player" class="inline-block h-6 w-6 rounded-full ring-2 ring-gray-800" :src="'https://cravatar.eu/helmavatar/' + player + '/96'" alt="">
      </div>
      <div v-if="isScheduled(game)" class="text-gray-300 font-light text-sm justify-start text-left">
        <font-awesome-icon :icon="faClock" /> {{ format(game.scheduleDate) }}
      </div>
      <div v-else class="text-gray-300 font-light text-sm justify-start text-left">
        <font-awesome-icon :icon="faClock" /> {{ format(game.archiveDate) }}
      </div>
    </div>
  </button>
</template>

<script>
import { faArchive, faClock, faGamepad } from '@fortawesome/free-solid-svg-icons';
import moment from 'moment';

moment.locale('fr');

export default {
  name: 'GameCard',
  props: ['game'],
  computed: {
    faClock: () => faClock,
    faGamepad: () => faGamepad,
    faArchive: () => faArchive
  },
  methods: {
    isArchived(game) {
      return game.archiveDate !== -1;
    },
    format: (timestamp) => {
      return moment(timestamp).fromNow();
    },
    isScheduled(game) {
      return game.startDate === -1 && game.scheduleDate !== -1;
    }
  }
};
</script>

<style scoped>

</style>
