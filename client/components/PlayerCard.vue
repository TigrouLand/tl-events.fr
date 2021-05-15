<template>
  <li class="col-span-1 bg-gray-700 border border-gray-500 rounded shadow divide-y divide-gray-200">
    <div class="w-full flex items-center justify-between">
      <img class="h-24 w-auto bg-gray-300 rounded rounded-r-none" :src="'https://crafthead.net/avatar/' + player.name" alt="">
      <div class="flex-1 truncate p-6">
        <div class="flex items-center space-x-1">
          <RankBadge :rank="player.rank" />
          <h3 class="text-white font-medium truncate">
            {{ player.name }}
          </h3>
        </div>
        <p class="mt-1 text-white text-sm truncate">
          {{ player.kills }}
          <svg
            data-v-0a54e4ac=""
            aria-hidden="true"
            focusable="false"
            data-prefix="fas"
            data-icon="skull"
            role="img"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512 512"
            class="svg-inline--fa fa-skull fa-w-16 mr-3"
          ><path fill="currentColor" d="M110.11 227.59c-6.25-6.25-16.38-6.25-22.63 0l-18.79 18.8a16.005 16.005 0 0 0-2 20.19l53.39 80.09-53.43 53.43-29.26-14.63a13.902 13.902 0 0 0-16.04 2.6L4.07 405.36c-5.42 5.43-5.42 14.22 0 19.64L87 507.93c5.42 5.42 14.22 5.42 19.64 0l17.29-17.29a13.873 13.873 0 0 0 2.6-16.03l-14.63-29.26 53.43-53.43 80.09 53.39c6.35 4.23 14.8 3.39 20.19-2l18.8-18.79c6.25-6.25 6.25-16.38 0-22.63l-174.3-174.3zM493.73.16L400 16 171.89 244.11l96 96L496 112l15.83-93.73c1.51-10.56-7.54-19.61-18.1-18.11z" class="" /></svg>
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
