<template>
  <div class="h-full w-full background">
    <div class="max-w-7xl mx-auto sm:px-6 lg:px-8 py-10">
      <div class="flex justify-center items-center py-10">
        <h1 class="text-white text-4xl lg:text-7xl font-bold drop-shadow" style="text-shadow: 6px 6px 0 rgba(178, 55, 52, 0.8);">
          tl-events.fr
        </h1>
      </div>
      <div class="p-5 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        <div class="relative bg-tigrouland pt-5 px-4 pb-12 sm:pt-6 sm:px-6 shadow rounded-lg overflow-hidden">
          <div>
            <div class="absolute bg-gray-700 rounded-md h-12 w-12 px-4 py-3">
              <font-awesome-icon icon="fa-solid fa-user" class="text-tigrouland" />
            </div>
            <p class="ml-16 text-2xl font-semibold text-white">
              {{ stats.games || '--' }}
            </p>
          </div>
          <div class="ml-16 pb-6 flex items-baseline sm:pb-7">
            <p class="text-sm font-medium text-white">
              Membres uniques
            </p>
            <div class="absolute bottom-0 inset-x-0 bg-gray-700 px-4 py-4 sm:px-6">
              <div class="text-sm">
                <nuxt-link to="/members" class="font-medium text-white hover:text-gray-200">
                  Voir leurs statistiques <font-awesome-icon icon="fa-solid fa-arrow-right" />
                </nuxt-link>
              </div>
            </div>
          </div>
        </div>
        <div class="relative bg-tigrouland pt-5 px-4 pb-12 sm:pt-6 sm:px-6 shadow rounded-lg overflow-hidden">
          <div>
            <div class="absolute bg-gray-700 rounded-md h-12 w-12 px-4 py-3">
              <font-awesome-icon icon="fa-solid fa-dice" class="text-tigrouland" />
            </div>
            <p class="ml-16 text-2xl font-semibold text-white">
              {{ stats.modifiers || '--' }}
            </p>
          </div>
          <div class="ml-16 pb-6 flex items-baseline sm:pb-7">
            <p class="text-sm font-medium text-white">
              Scénarios disponibles
            </p>
            <div class="absolute bottom-0 inset-x-0 bg-gray-700 px-4 py-4 sm:px-6">
              <div class="text-sm">
                <nuxt-link to="/modifiers" class="font-medium text-white hover:text-gray-200">
                  Voir la liste complète <font-awesome-icon icon="fa-solid fa-arrow-right" />
                </nuxt-link>
              </div>
            </div>
          </div>
        </div>
        <div class="relative bg-tigrouland pt-5 px-4 pb-12 sm:pt-6 sm:px-6 shadow rounded-lg overflow-hidden">
          <div>
            <div class="absolute bg-gray-700 rounded-md h-12 w-12 px-4 py-3">
              <font-awesome-icon icon="fa-solid fa-gamepad" class="text-tigrouland" />
            </div>
            <p class="ml-16 text-2xl font-semibold text-white">
              {{ stats.games || '--' }}
            </p>
          </div>
          <div class="ml-16 pb-6 flex items-baseline sm:pb-7">
            <p class="text-sm font-medium text-white">
              Parties jouées
            </p>
            <div class="absolute bottom-0 inset-x-0 bg-gray-700 px-4 py-4 sm:px-6">
              <div class="text-sm">
                <nuxt-link to="/games" class="font-medium text-white hover:text-gray-200">
                  Voir les résumés détaillés <font-awesome-icon icon="fa-solid fa-arrow-right" />
                </nuxt-link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default defineComponent({
  async setup () {
    useHead({
      title: 'Accueil - TL Events'
    });
    const { data: stats } = await useFetch('https://api.tl-events.fr/stats');
    return { stats };
  }
});
</script>

<style scoped>
.background {
  background: url("/background.png") center no-repeat;
}
</style>
