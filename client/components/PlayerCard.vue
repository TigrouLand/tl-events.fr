<template>
  <li class="col-span-1 bg-gray-700 border border-gray-500 rounded shadow divide-y divide-gray-200">
    <div class="w-full flex items-center justify-between">
      <img class="h-24 w-auto bg-gray-300 rounded rounded-r-none" :src="'https://cravatar.eu/helmavatar/' + player.name + '/96'" alt="">
      <div class="flex-1 truncate p-6">
        <div class="flex items-center space-x-1">
          <RankBadge :rank="player.rank" />
          <h3 class="text-white font-medium truncate">
            {{ player.name }}
          </h3>
        </div>
        <p class="mt-1 text-white text-sm truncate">
          {{ player.kills }}
          <img src="~/assets/sword.svg" alt="" class="svg-inline--fa fa-w-16 mr-3">
          {{ player.deaths }}
          <font-awesome-icon :icon="faSkull" class="mr-3" />
          {{ player.wins }}
          <font-awesome-icon :icon="faTrophy" />
        </p>
      </div>
    </div>
  </li>
</template>

<script>
import { faSkull, faTrophy } from '@fortawesome/free-solid-svg-icons';
import RankBadge from './RankBadge';

export default {
  name: 'PlayerCard',
  components: { RankBadge },
  props: ['player'],
  computed: {
    faSkull() {
      return faSkull;
    },
    faTrophy() {
      return faTrophy;
    }
  }
};
</script>

<style scoped>

</style>
