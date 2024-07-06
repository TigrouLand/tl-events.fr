<template>
  <div class="flex h-screen flex-col bg-gray-800">
    <nav class="sticky top-0 z-50 overflow-hidden bg-primary" :style="{ height: dropdown ? '300px' : 'auto' }">
      <div class="mx-auto flex max-w-7xl justify-between px-4 sm:px-4 md:px-6 lg:px-8">
        <img src="/logo.webp" alt="Logo" draggable="false" class="h-16 select-none" />

        <ul
          class="absolute left-0 top-20 mr-auto flex flex-col sm:relative sm:top-[initial] sm:-my-px sm:ml-4 sm:flex-row sm:space-x-4 md:ml-6 md:space-x-8">
          <NuxtLink to="/" class="nav-link">Accueil</NuxtLink>
          <NuxtLink to="/members" class="nav-link">Membres</NuxtLink>
          <NuxtLink to="/modifiers" class="nav-link">Scénarios</NuxtLink>
          <NuxtLink to="/games" class="nav-link">Parties</NuxtLink>
        </ul>

        <ul
          class="absolute left-1/2 top-[250px] mx-auto flex -translate-x-1/2 items-center space-x-4 sm:relative sm:left-[initial] sm:top-[initial] sm:mx-0 sm:-translate-x-[0]">
          <a
            href="https://github.com/TigrouLand/tl-events.fr"
            target="_blank"
            rel="noopener noreferrer"
            class="social-link bg-gray-900 hover:bg-gray-800">
            <Icon name="mdi:github" size="20" /> <span class="ml-2 max-[900px]:hidden">Github</span>
          </a>
          <a
            href="mumble://mumble.tl-events.fr"
            target="_blank"
            rel="noopener noreferrer"
            class="social-link bg-blue-900 hover:bg-blue-800">
            <img src="/mumble.webp" class="h-5 w-5 select-none" draggable="false" /> <span class="ml-2 max-[900px]:hidden">Mumble</span>
          </a>
          <a href="https://discord.gg/qV5TYGx" target="_blank" rel="noopener noreferrer" class="social-link bg-discord hover:bg-indigo-500">
            <Icon name="ic:baseline-discord" size="20" /> <span class="ml-2 max-[900px]:hidden">Discord</span>
          </a>
        </ul>

        <div class="flex items-center sm:hidden">
          <button
            type="button"
            class="inline-flex items-center justify-center rounded-md bg-gray-100 p-2 text-primary hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-red-700 focus:ring-offset-2"
            aria-controls="mobile-menu"
            aria-expanded="false"
            @click="dropdown = !dropdown">
            <span class="sr-only">Open main menu</span>
            <svg
              class="h-6 w-6"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true">
              <template v-if="!dropdown">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
              </template>
              <template v-else>
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </template>
            </svg>
          </button>
        </div>
      </div>
    </nav>
    <main class="h-screen w-screen flex-1 overflow-y-auto overflow-x-hidden">
      <slot />
    </main>
  </div>
</template>

<script setup>
const dropdown = ref(false);
</script>

<style scoped>
.nav-link {
  @apply block w-screen items-center px-4 py-2 text-center text-base font-medium text-white sm:inline-flex sm:w-fit sm:px-1 sm:py-0 sm:pt-1 sm:text-sm sm:hover:border-white/50;
}

.nav-link[aria-current='page'] {
  @apply bg-gray-100 text-primary sm:border-b-2 sm:border-white sm:bg-transparent sm:text-white sm:hover:border-white;
}

.social-link {
  @apply inline-flex items-center rounded-md border border-transparent px-4 py-2 text-sm font-medium text-white shadow-sm focus:outline-none;
}
</style>

<style>
.container {
  @apply mx-auto max-w-7xl space-y-10 px-4 py-10 sm:px-6 lg:px-8;
}
</style>
