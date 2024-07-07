<template>
  <div class="custom-background min-h-full w-full">
    <div class="container">
      <h1 class="custom-shadow pt-10 text-center text-4xl font-bold text-white lg:text-7xl">tl-events.fr</h1>

      <ul class="grid grid-cols-1 gap-5 p-5 sm:grid-cols-2 lg:grid-cols-3">
        <InfoCard title="Membres uniques" :stats="stats?.members" description="Voir leurs statistiques" icon="ion:person-sharp" />
        <InfoCard
          title="Scénarios disponibles"
          :stats="stats?.modifiers"
          description="Voir la liste complète"
          icon="ion:erlenmeyer-flask" />
        <InfoCard title="Parties jouées" :stats="stats?.games" description="Voir les résumés détaillés" icon="ion:game-controller" />
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { API } from '~/tools/types';

const response = await useFetch('https://api.tl-events.fr/v1/stats');
const stats = response.data as Ref<API.Stats | undefined>;
</script>

<style scoped>
.custom-background {
  background: url('/background.webp') center no-repeat;
  background-size: cover;
}

.custom-shadow {
  text-shadow: 6px 6px 0 rgba(178, 55, 52, 0.8);
}
</style>
