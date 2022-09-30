<template>
  <li class="col-span-1 bg-gray-700 border border-gray-500 rounded shadow divide-y divide-gray-200">
    <div class="w-full flex items-center justify-between">
      <img class="h-24 w-auto bg-gray-700 rounded rounded-r-none px-3 pt-3" :src="'https://avatars.tl-events.fr/busts/' + player.name + '.png'" alt="">
      <div class="flex-1 truncate p-6">
        <div class="flex items-center space-x-1">
          <RankBadge :rank="player.rank" />
          <h1 class="text-white font-medium truncate">
            {{ player.name }}
          </h1>
        </div>
        <p class="mt-1 text-white text-sm truncate">
          {{ player.kills }}
          <img src="/sword.svg" alt="" class="svg-inline--fa fa-w-16 mr-3">
          {{ player.deaths }}
          <font-awesome-icon icon="fa-solid fa-skull" class="mr-3" />
          {{ player.wins }}
          <font-awesome-icon icon="fa-solid fa-trophy" />
        </p>
      </div>
    </div>
  </li>
</template>

<script>
export default defineComponent({
  name: 'PlayerCard',
  props: ['player']
});
</script>

<style scoped>

</style>
