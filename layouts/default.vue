<template>
  <div class="flex flex-col h-screen bg-gray-800">
    <nav class="bg-tigrouland sticky top-0 z-50">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between">
          <div class="flex">
            <div class="flex-shrink-0 flex items-center">
              <img class="block h-16 w-auto" src="/icon.png" alt="Workflow">
            </div>
            <div class="hidden sm:-my-px sm:ml-6 sm:flex sm:space-x-8">
              <NuxtLink to="/" :class="getDeskNavClass($route.name === 'index')" aria-current="page">
                Accueil
              </NuxtLink>
              <NuxtLink to="/members" :class="getDeskNavClass($route.name === 'members')">
                Membres
              </NuxtLink>
              <NuxtLink to="/modifiers" :class="getDeskNavClass($route.name === 'modifiers')">
                Scénarios
              </NuxtLink>
              <NuxtLink to="/games" :class="getDeskNavClass($route.name === 'games')">
                Parties
              </NuxtLink>
            </div>
          </div>
          <div class="hidden sticky sm:ml-6 sm:flex sm:items-center space-x-4">
            <a href="https://github.com/TigrouLand/EventsStats" target="_blank" rel="noopener noreferrer" type="button" class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-gray-900 hover:bg-gray-800 focus:outline-none">
              <font-awesome-icon icon="fa-brands fa-github" class="mr-2 fa-lg" /> GitHub
            </a>
            <a href="https://twitter.com/EventsTLV2" target="_blank" rel="noopener noreferrer" type="button" class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-twitter hover:bg-blue-400 focus:outline-none">
              <font-awesome-icon icon="fa-brands fa-twitter" class="mr-2 fa-lg" /> Twitter
            </a>
            <a href="https://discord.gg/qV5TYGx" target="_blank" rel="noopener noreferrer" type="button" class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blurple hover:bg-indigo-500 focus:outline-none">
              <font-awesome-icon icon="fa-brands fa-discord" class="mr-2 fa-lg" /> Nous rejoindre sur Discord
            </a>
          </div>
          <div class="flex items-center sm:hidden">
            <button type="button" class="bg-gray-100 inline-flex items-center justify-center p-2 rounded-md text-tigrouland hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-700" aria-controls="mobile-menu" aria-expanded="false" @click="dropdown = !dropdown">
              <span class="sr-only">Open main menu</span>
              <svg
                v-if="!dropdown"
                class="h-6 w-6"
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
          <NuxtLink to="/" :class="getMobileNavClass($route.name === 'index')">
            Accueil
          </NuxtLink>
          <NuxtLink to="/members" :class="getMobileNavClass($route.name === 'members')">
            Membres
          </NuxtLink>
          <NuxtLink to="/modifiers" :class="getMobileNavClass($route.name === 'modifiers')">
            Scénarios
          </NuxtLink>
          <NuxtLink to="/games" :class="getMobileNavClass($route.name === 'games')">
            Parties
          </NuxtLink>
        </div>
        <div class="flex flex-wrap">
          <div class="flex-1 p-4">
            <a href="https://github.com/TigrouLand/EventsStats" target="_blank" rel="noopener noreferrer" type="button" class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-gray-900 hover:bg-gray-800 focus:outline-none w-full">
              <font-awesome-icon icon="fa-brands fa-github" class="mr-2 fa-lg" /> GitHub
            </a>
          </div>
          <div class="flex-1 px-4 pb-4">
            <a href="https://discord.gg/qV5TYGx" target="_blank" rel="noopener noreferrer" type="button" class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blurple hover:bg-indigo-500 focus:outline-none w-full">
              <font-awesome-icon icon="fa-brands fa-discord" class="mr-2 fa-lg" /> Nous rejoindre sur Discord
            </a>
          </div>
        </div>
      </div>
    </nav>
    <main class="flex-1 overflow-y-auto">
      <slot />
    </main>
  </div>
</template>

<script setup>

const dropdown = ref(false);

const getDeskNavClass = (active) => {
  return active
    ? 'border-white text-white inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium'
    : 'border-transparent text-white hover:border-white inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium';
};
const getMobileNavClass = (active) => {
  return active
    ? 'bg-gray-100 border-tigrouland text-tigrouland block pl-3 pr-4 py-2 border-l-4 text-base font-medium'
    : 'border-transparent text-gray-100 bg-tigrouland hover:bg-gray-100 hover:border-tigrouland hover:text-tigrouland block pl-3 pr-4 py-2 border-l-4 text-base font-medium';
};
</script>
