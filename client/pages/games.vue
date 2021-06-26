<template>
  <div class="h-full flex bg-gray-100">
    <div class="hidden md:flex md:flex-shrink-0">
      <div class="flex flex-col w-64">
        <div class="flex flex-col h-0 flex-1">
          <div class="flex justify-center items-center h-20 bg-gray-900">
            <h2 class="text-white text-xl font-medium">
              Liste des parties
            </h2>
          </div>
          <div v-for="game in games" :key="game._id" class="px-4 py-3 bg-gray-900" @click="selectedGame = game;">
            <GameCard :game="game" />
          </div>
          <div v-for="game in archivedGames" :key="game._id" class="px-4 py-3 bg-gray-900" @click="selectedGame = game;">
            <GameCard :game="game" />
          </div>
          <div class="flex-1 flex flex-col overflow-y-auto">
            <nav class="flex-1 px-2 py-4 bg-gray-900 space-y-1" />
          </div>
        </div>
      </div>
    </div>
    <main class="flex-1 relative overflow-y-auto focus:outline-none bg-gray-800">
      <div class="md:hidden items-center flex overflow-visible overflow-x-scroll bg-gray-900">
        <div v-for="game in archivedGames" :key="game._id" class="px-4 py-3 bg-gray-900" @click="selectedGame = game;">
          <GameCard :game="game" />
        </div>
      </div>
      <div class="py-6 max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
        <div v-if="selectedGame" class="md:grid md:grid-rows-3 md:grid-flow-col gap-4">
          <div class="row-span-3 mb-4 md:mb-0">
            <div class="bg-gray-900 border border-gray-500 rounded shadow text-white">
              <div class="w-full p-4">
                <div class="font-bold text-lg text-center">
                  {{ selectedGame.name }}
                </div>
                <div v-if="isScheduled(selectedGame)" class="font-bold text-lg text-center mb-4 text-gray-400">
                  <font-awesome-icon :icon="faClock" class="text-gray-400" />
                  Partie programmée
                </div>
                <div v-else-if="isArchived(selectedGame)" class="font-bold text-lg text-center mb-4 text-gray-400">
                  <font-awesome-icon :icon="faArchive" class="text-gray-400" />
                  Partie archivée
                </div>
                <div v-else class="font-bold text-lg text-center mb-4 text-green-500">
                  <font-awesome-icon :icon="faGamepad" class="text-green-500" />
                  Partie en cours
                </div>
                <div>
                  <font-awesome-icon :icon="faGamepad" class="text-white" />
                  <span class="font-medium">Type de jeu :</span> {{ formatType() }}
                </div>
                <div>
                  <font-awesome-icon :icon="faUsers" class="text-white" />
                  <span class="font-medium">Participants :</span> {{ selectedGame.players.length }}
                </div>
                <div v-if="isArchived(selectedGame)">
                  <font-awesome-icon :icon="faClock" class="text-white" />
                  <span class="font-medium">Temps de jeu :</span> {{ formatTime() }}
                </div>
              </div>
            </div>
          </div>
          <div class="col-span-2 mb-4 md:mb-0">
            <div class="border border-gray-500 rounded bg-gray-900 text-white h-full">
              <div class="flex font-bold text-lg justify-center p-4">
                Joueurs
              </div>
              <table class="table-auto mb-3">
                <tbody>
                  <tr v-for="player in selectedGame.players" :key="player">
                    <td>
                      <img :class="`m-4 h-10 w-10 rounded-full ring-2 ring-offset-2 ring-offset-gray-900 ring-${isAlive(player) ? 'green' : 'red'}-500`" :src="'https://cravatar.eu/helmavatar/' + player + '/96'" alt="">
                    </td>
                    <td>
                      <div class="flex">
                        {{ getUsernameByUuid(player) }}
                      </div>
                      <div v-if="isAlive(player)">
                        <div class="text-green-500 font-bold">
                          Joueur en vie
                        </div>
                      </div>
                      <div v-else>
                        <div class="text-red-500 font-bold">
                          Joueur mort
                        </div>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <div class="row-span-2 col-span-2 mb-4 md:mb-0">
            <div class="border border-gray-500 rounded bg-gray-900 text-white p-6">
              <div class="flex font-bold text-lg justify-center mb-2">
                Événements de la partie
              </div>
              <div v-for="(log, i) in selectedGame.logs" :key="log">
                <GameLog :log="log" :last="i === selectedGame.logs.length - 1" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
import { faArchive, faClock, faGamepad, faUsers } from '@fortawesome/free-solid-svg-icons';
import GameCard from '../components/GameCard';

export default {
  name: 'Games',
  components: { GameCard },
  data() {
    return {
      games: [],
      players: [],
      archivedGames: [],
      selectedGame: null,
      interval: null
    };
  },
  head: {
    title: 'Parties'
  },
  computed: {
    faUsers: () => faUsers,
    faGamepad: () => faGamepad,
    faArchive: () => faArchive,
    faClock: () => faClock
  },
  mounted() {
    this.fetch();
    this.interval = setInterval(this.refreshGames, 10000);
  },
  destroyed() {
    clearInterval(this.interval);
  },
  methods: {
    fetch() {
      this.$nuxt.$nextTick(async () => {
        this.$nuxt.$loading.start();
        const { games, archivedGames } = await this.$axios.$get('/games').catch(this.$nuxt.$loading.fail);
        this.games = games;
        this.archivedGames = archivedGames;
        const { players } = await this.$axios.$get('/players').catch(this.$nuxt.$loading.fail);
        this.players = this.displayedPlayers = players;
        this.$nuxt.$loading.finish();
      });
    },
    getUsernameByUuid(uuid) {
      return this.players.find(p => p.uuid === uuid)?.name;
    },
    async refreshGames() {
      const { games, archivedGames } = await this.$axios.$get('/games').catch(this.$nuxt.$loading.fail);
      this.games = games;
      this.archivedGames = archivedGames;
    },
    isAlive(player) {
      if (this.selectedGame && this.selectedGame.alive)
        return this.selectedGame.alive.includes(player);
      return false;
    },
    isArchived(game) {
      return game.archiveDate !== -1;
    },
    isScheduled(game) {
      return game.startDate === -1 && game.scheduleDate !== -1;
    },
    formatTime() {
      let { hours, minutes, seconds } = this.selectedGame;
      if (hours < 9)
        hours = `0${hours}`;
      if (minutes < 9)
        minutes = `0${minutes}`;
      if (seconds < 9)
        seconds = `0${seconds}`;
      return `${hours}:${minutes}:${seconds}`;
    },
    formatType() {
      if (this.selectedGame && this.selectedGame.type) {
        const { type } = this.selectedGame;
        if (type === 'UHC_RUN')
          return 'UHC-Run';
        // String to PascalCase: https://stackoverflow.com/a/53952925
        return type
          .replace(/[-_]+/g, ' ')
          .replace(/[^\w\s]/g, '')
          .replace(/\s+(.)(\w+)/g, (_$1, $2, $3) => `${$2.toUpperCase() + $3.toLowerCase()}`)
          .replace(/\s/g, '')
          .replace(/\w/, s => s.toUpperCase());
      }
    }
  }
};
</script>

<style scoped>

</style>
