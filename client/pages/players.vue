<template>
  <div class="max-w-7xl mx-auto sm:px-6 lg:px-8 py-10">
    <ul class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 mx-5 lg:mx-0">
      <PlayerCard v-for="player in players" :key="player._id" :player="player" />
    </ul>
  </div>
</template>

<script>
import PlayerCard from '../components/PlayerCard';

export default {
  name: 'Players',
  components: { PlayerCard },
  data() {
    return {
      players: undefined
    };
  },
  mounted() {
    this.fetchPlayers();
  },
  methods: {
    fetchPlayers() {
      this.$nuxt.$nextTick(async () => {
        this.$nuxt.$loading.start();
        const { players } = await this.$axios.$get('/players');
        this.players = players;
        this.$nuxt.$loading.finish();
      });
    }
  }
};
</script>
