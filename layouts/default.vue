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
              <a href="#" class="border-white text-white inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium" aria-current="page">
                Accueil
              </a>
              <a href="#" class="border-transparent text-white hover:border-white inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium">
                Joueurs
              </a>
            </div>
          </div>
<!--          <div class="hidden sm:ml-6 sm:flex sm:items-center">-->
<!--          </div>-->
          <div class="flex items-center sm:hidden">
            <button type="button" class="bg-gray-100 inline-flex items-center justify-center p-2 rounded-md text-tigrouland hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-700" aria-controls="mobile-menu" aria-expanded="false" @click="dropdown = !dropdown">
              <span class="sr-only">Open main menu</span>
              <svg class="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true" v-if="!dropdown">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
              <svg class="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true" v-if="dropdown">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      </div>
      <div class="sm:hidden" id="mobile-menu" v-if="dropdown">
        <div class="pt-2 pb-3 space-y-1">
          <!-- Current: "bg-indigo-50 border-indigo-500 text-indigo-700", Default: "border-transparent text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800" -->
          <a href="#" class="bg-gray-100 border-tigrouland text-tigrouland block pl-3 pr-4 py-2 border-l-4 text-base font-medium" aria-current="page">
            Accueil
          </a>
          <a href="#" class="border-transparent text-gray-100 bg-tigrouland hover:bg-gray-100 hover:border-tigrouland hover:text-tigrouland block pl-3 pr-4 py-2 border-l-4 text-base font-medium">
            Joueurs
          </a>
        </div>
<!--        <div class="pt-4 pb-3 border-t border-gray-200">-->
<!--        </div>-->
      </div>
    </nav>

    <div class="py-10">
      <main>
        <div class="max-w-7xl mx-auto sm:px-6 lg:px-8">
          <Nuxt />
        </div>
      </main>
    </div>
  </div>
</template>

<script lang="ts">

export default {
  data() {
    return {
      dropdown: false,
    }
  }
}

</script>
