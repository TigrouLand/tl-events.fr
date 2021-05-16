<template>
  <div class="flex flex-col object-cover h-full w-full">
    <video
      muted
      autoplay
      playsinline
      preload="none"
      class="object-cover h-full w-full"
    >
      <source src="~/assets/showcase.mp4" type="video/mp4">
    </video>
    <div class="absolute w-full">
      <div class="max-w-7xl mx-auto py-10">
        <div class="flex justify-center items-center py-10">
          <p id="typewriting" class="text-white text-4xl lg:text-7xl font-bold" />
        </div>
        <div class="p-5 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          <div class="relative bg-tigrouland pt-5 px-4 pb-12 sm:pt-6 sm:px-6 shadow rounded-lg overflow-hidden">
            <div>
              <div class="absolute bg-white rounded-md h-12 w-12 px-4 py-3">
                <font-awesome-icon :icon="faUser" class="text-tigrouland" />
              </div>
              <p class="ml-16 text-2xl font-semibold text-white">
                {{ players || '--' }}
              </p>
            </div>
            <div class="ml-16 pb-6 flex items-baseline sm:pb-7">
              <p class="text-sm font-medium text-white">
                Joueurs uniques
              </p>
              <div class="absolute bottom-0 inset-x-0 bg-gray-50 px-4 py-4 sm:px-6">
                <div class="text-sm">
                  <nuxt-link to="/players" class="font-medium text-tigrouland hover:text-red-500">
                    Voir tout <font-awesome-icon :icon="faArrowRight" />
                  </nuxt-link>
                </div>
              </div>
            </div>
          </div>
          <div class="relative bg-tigrouland pt-5 px-4 pb-12 sm:pt-6 sm:px-6 shadow rounded-lg overflow-hidden">
            <div>
              <div class="absolute bg-white rounded-md h-12 w-12 px-4 py-3">
                <font-awesome-icon :icon="faDice" class="text-tigrouland" />
              </div>
              <p class="ml-16 text-2xl font-semibold text-white">
                {{ modifiers || '--' }}
              </p>
            </div>
            <div class="ml-16 pb-6 flex items-baseline sm:pb-7">
              <p class="text-sm font-medium text-white">
                Scénarios disponibles
              </p>
              <div class="absolute bottom-0 inset-x-0 bg-gray-50 px-4 py-4 sm:px-6">
                <div class="text-sm">
                  <nuxt-link to="/modifiers" class="font-medium text-tigrouland hover:text-red-500">
                    Voir tout <font-awesome-icon :icon="faArrowRight" />
                  </nuxt-link>
                </div>
              </div>
            </div>
          </div>
          <div class="relative bg-tigrouland pt-5 px-4 pb-12 sm:pt-6 sm:px-6 shadow rounded-lg overflow-hidden">
            <div>
              <div class="absolute bg-white rounded-md h-12 w-12 px-4 py-3">
                <font-awesome-icon :icon="faGamePad" class="text-tigrouland" />
              </div>
              <p class="ml-16 text-2xl font-semibold text-white">
                {{ games || '--' }}
              </p>
            </div>
            <div class="ml-16 pb-6 flex items-baseline sm:pb-7">
              <p class="text-sm font-medium text-white">
                Parties jouées
              </p>
              <div class="absolute bottom-0 inset-x-0 bg-gray-50 px-4 py-4 sm:px-6">
                <div class="text-sm">
                  <nuxt-link to="/games" class="font-medium text-tigrouland hover:text-red-500">
                    Voir tout <font-awesome-icon :icon="faArrowRight" />
                  </nuxt-link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { faUser, faArrowRight, faDice, faGamepad } from '@fortawesome/free-solid-svg-icons';

export default {
  data: () => {
    return {
      interval: undefined,
      players: undefined,
      modifiers: undefined,
      games: undefined
    };
  },
  head: {
    title: 'Accueil'
  },
  computed: {
    faUser() {
      return faUser;
    },
    faArrowRight() {
      return faArrowRight;
    },
    faDice() {
      return faDice;
    },
    faGamePad() {
      return faGamepad;
    }
  },
  mounted() {
    this.fetchStats();
    this.typeWriting();
  },
  methods: {
    fetchStats() {
      this.$nuxt.$nextTick(async () => {
        this.$nuxt.$loading.start();
        const { players, modifiers, games } = await this.$axios.$get('/stats').catch(this.$nuxt.$loading.fail);
        this.players = players;
        this.modifiers = modifiers;
        this.games = games;
        this.$nuxt.$loading.finish();
      });
    },
    typeWriting() {
      const writingArea = document.getElementById('typewriting');
      if (!writingArea)
        return;
      const letters = 'events.romitou.fr'.split('');
      this.interval = setInterval(() => {
        const letter = letters.shift();
        if (!letter) {
          clearInterval(this.interval);
          return;
        }
        writingArea.innerHTML = writingArea.innerHTML + letter;
      }, 150);
    }
  }
};
</script>
