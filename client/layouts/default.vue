<template>
  <div class="min-h-screen bg-gray-800">
    <nav class="bg-tigrouland">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between h-16">
          <div class="flex">
            <div class="flex-shrink-0 flex items-center">
              <img class="block h-16 w-auto" src="/icon.png" alt="Workflow">
            </div>
            <div class="hidden sm:-my-px sm:ml-6 sm:flex sm:space-x-8">
              <nuxt-link to="/" :class="getDeskNavClass($route.name === 'index')" aria-current="page">
                Accueil
              </nuxt-link>
              <nuxt-link to="/players" :class="getDeskNavClass($route.name === 'players')">
                Joueurs
              </nuxt-link>
              <nuxt-link to="/modifiers" :class="getDeskNavClass($route.name === 'modifiers')">
                Scénarios
              </nuxt-link>
            </div>
          </div>
          <div class="hidden sm:ml-6 sm:flex sm:items-center">
            <a href="https://discord.gg/qV5TYGx" type="button" class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blurple hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
              <font-awesome-icon :icon="faDiscord" class="mr-2 fa-lg" /> Nous rejoindre
            </a>
          </div>
          <div class="flex items-center sm:hidden">
            <button type="button" class="bg-gray-100 inline-flex items-center justify-center p-2 rounded-md text-tigrouland hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-700" aria-controls="mobile-menu" aria-expanded="false" @click="dropdown = !dropdown">
              <span class="sr-only">Open main menu</span>
              <svg
                class="h-6 w-6"
                v-if="!dropdown"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
              <svg
                v-if="dropdown"
                class="h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      </div>
      <div v-if="dropdown" id="mobile-menu" class="sm:hidden">
        <div class="pt-2 pb-3 space-y-1">
          <nuxt-link to="/" :class="getMobileNavClass($route.name === 'index')">
            Accueil
          </nuxt-link>
          <nuxt-link to="/players" :class="getMobileNavClass($route.name === 'players')">
            Joueurs
          </nuxt-link>
          <nuxt-link to="/modifiers" :class="getMobileNavClass($route.name === 'modifiers')">
            Scénarios
          </nuxt-link>
        </div>
        <div class="pt-4 pb-3 ml-2">
          <a href="https://discord.gg/qV5TYGx" type="button" class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blurple hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
            <font-awesome-icon :icon="faDiscord" class="mr-2 fa-lg" /> Nous rejoindre
          </a>
        </div>
      </div>
    </nav>
    <main>
      <Nuxt />
    </main>
  </div>
</template>

<script lang="ts">
import { faDiscord } from '@fortawesome/free-brands-svg-icons';

export default {
  data() {
    return {
      dropdown: false
    };
  },
  computed: {
    faDiscord() {
      return faDiscord;
    }
  },
  methods: {
    getDeskNavClass(active: boolean): string {
      return active
        ? 'border-white text-white inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium'
        : 'border-transparent text-white hover:border-white inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium';
    },
    getMobileNavClass(active: boolean): string {
      return active
        ? 'bg-gray-100 border-tigrouland text-tigrouland block pl-3 pr-4 py-2 border-l-4 text-base font-medium'
        : 'border-transparent text-gray-100 bg-tigrouland hover:bg-gray-100 hover:border-tigrouland hover:text-tigrouland block pl-3 pr-4 py-2 border-l-4 text-base font-medium';
    }
  }
};

</script>
