<template>
  <div class="custom-background min-h-full w-full">
    <div class="container">
      <h1 class="custom-shadow uppercase pt-10 text-center text-4xl font-bold text-white lg:text-7xl">
          {{ APP_NAME }}
      </h1>

      <ul class="grid grid-cols-1 gap-5 p-5 sm:grid-cols-2 lg:grid-cols-3">
        <InfoCard
          :title="t('cards.members.title')"
          :stats="stats?.members"
          :description="t('cards.members.description')"
          icon="ion:person-sharp"
          to="/members"
        />
        <InfoCard
          :title="t('cards.games.title')"
          :stats="stats?.games"
          :description="t('cards.games.description')"
          icon="ion:game-controller"
          to="/games"
        />
        <InfoCard
          title="Modes de jeux"
          :stats="7"
          description="Voir les différents modes de jeux"
          icon="ion:game-controller"
          to="/gamemodes"
        />
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
import { fetchAPI, type API } from '~/tools/api'
import { APP_NAME } from '~/tools/seo'

const { t } = useI18n()

useHead({
  title: t('home')
})

const response = await useFetch(fetchAPI('stats'))
const stats = response.data as Ref<API.Stats | undefined>
</script>

<style scoped>
.custom-background {
  background: url("/background.webp") center no-repeat;
  background-size: cover;
}

.custom-shadow {
  text-shadow: 6px 6px 0 rgba(178, 55, 52, 0.8);
}
</style>

<style>
@reference "tailwindcss";

.container {
  @apply mx-auto max-w-7xl space-y-10 px-4 py-10 sm:px-6 lg:px-8;
}
</style>
