<template>
  <div class="bg-gray-800 border border-gray-500 rounded shadow">
    <div class="w-full p-2">
      <div class="flex">
        <div class="text-white font-medium">
          <font-awesome-icon v-if="isScheduled(game)" :icon="faClock" class="text-gray-400" />
          <font-awesome-icon v-else-if="isArchived(game)" :icon="faArchive" class="text-gray-400" />
          <font-awesome-icon v-else :icon="faGamepad" class="text-green-500" />
          {{ game.name }}
        </div>
        <div class="flex px-2 -space-x-1 overflow-hidden">
          <img v-for="player in game.players.slice(0, 5)" :key="player" class="inline-block h-6 w-6 rounded-full ring-2 ring-gray-800" :src="'https://cravatar.eu/helmavatar/' + player + '/96'" alt="">
        </div>
      </div>
      <div v-if="isScheduled(game)" class="text-gray-300 font-light text-sm">
        <font-awesome-icon :icon="faClock" /> dans {{ format(game.scheduleDate) }}
      </div>
      <div v-else class="text-gray-300 font-light text-sm">
        <font-awesome-icon :icon="faClock" /> il y a {{ format(game.archiveDate) }}
      </div>
    </div>
  </div>
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
      return moment.duration(Date.now() - timestamp).humanize();
    },
    isScheduled(game) {
      return game.startDate === -1 && game.scheduleDate !== -1;
    }
  }
};
</script>

<style scoped>

</style>
