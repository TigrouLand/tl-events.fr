<template>
  <div class="max-w-7xl mx-auto sm:px-6 lg:px-8 py-10">
    <div class="pt-2 relative mx-auto text-white space-y-4 px-5 lg:px-0 mb-7">
      <input
        v-model="search"
        class="border border-gray-400 bg-gray-600 h-10 px-5 pr-16 rounded-lg text-sm focus:outline-none w-full"
        placeholder="Rechercher par pseudonyme ..."
        @keyup="searchPlayers"
      >
    </div>
    <ul class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 mx-5 lg:mx-0">
      <PlayerCard v-for="player in displayedPlayers" :key="player._id" :player="player" />
    </ul>
  </div>
</template>

<script>
import Levenshtein from 'levenshtein';
import PlayerCard from '../components/PlayerCard';

export default {
  name: 'Players',
  components: { PlayerCard },
  data() {
    return {
      players: undefined,
      displayedPlayers: undefined,
      search: undefined
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
        this.players = this.displayedPlayers = players;
        this.$nuxt.$loading.finish();
      });
    },
    searchPlayers() {
      if (!this.search) {
        this.displayedPlayers = this.players;
        return;
      }
      const search = this.search.toLowerCase();
      this.displayedPlayers = this.players.filter(player => player.name.toLowerCase().startsWith(search) || new Levenshtein(player.name.toLowerCase(), search).distance < 5);
    }
  }
};
</script>
