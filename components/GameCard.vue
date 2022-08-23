<template>
  <component :is="isUpcoming(game) ? 'div': 'button'" :class="'bg-gray-800 border ' + (selected ? 'border-red-500 ' : 'border-gray-500 ') + 'rounded shadow w-full justify-start text-left'">
    <div class="w-full p-2">
      <div class="flex">
        <div class="text-white font-medium">
          <font-awesome-icon v-if="isUpcoming(game)" icon="fa-solid fa-clock" class="text-gray-400" />
          <font-awesome-icon v-else-if="isArchived(game)" icon="fa-solid fa-archive" class="text-gray-400" />
          <font-awesome-icon v-else icon="fa-solid fa-gamepad" class="text-green-500" />
          {{ game.name }} [#{{ game.id }}]
        </div>
      </div>
      <div v-if="game.players" class="mt-2 -space-x-1 overflow-hidden justify-start text-left">
        <img v-for="player in game.players.slice(0, 7)" :key="player" class="inline-block h-6 w-6 rounded-full ring-2 ring-gray-800" :src="'https://cravatar.eu/helmavatar/' + player + '/96'" alt="">
      </div>
      <div v-if="isArchived(game)" class="mt-2 text-gray-300 font-light text-sm justify-start text-left">
        <font-awesome-icon icon="fa-solid fa-clock" /> {{ format(game.scheduleDate) }}
      </div>
      <div v-else class="mt-2 text-gray-300 font-light text-sm justify-start text-left">
        <font-awesome-icon icon="fa-solid fa-clock" /> {{ format(game.archiveDate) }}
      </div>
      <div v-if="isArchived(game)" class="mt-2 text-gray-300 font-light text-sm justify-start text-left">
        <font-awesome-icon icon="fa-solid fa-arrow-circle-right" /> Voir les détails
      </div>
    </div>
  </component>
</template>

<script>
import moment from 'moment';

moment.locale('fr');

export default {
  name: 'GameCard',
  props: ['game', 'selected'],
  methods: {
    isArchived (game) {
      return game.archiveDate !== -1;
    },
    format: (timestamp) => {
      if (!timestamp || timestamp === -1) { return 'À venir'; }
      const formatted = moment(timestamp).fromNow();
      return formatted.charAt(0).toUpperCase() + formatted.slice(1);
    },
    isReset (game) {
      return game.status === 'RESET';
    },
    isUpcoming (game) {
      return game.status === 'CREATED';
    }
  }
};
</script>

<style scoped>

</style>