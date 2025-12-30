<template>
  <div class="custom-background min-h-full w-full">
    <div class="container">
      <h1 class="custom-shadow pt-10 text-center text-4xl font-bold text-white lg:text-7xl">
        tl-events.fr
      </h1>

      <ul class="grid grid-cols-1 gap-5 p-5 sm:grid-cols-2 lg:grid-cols-3">
        <InfoCard
          :title="t('cards.members.title')"
          :stats="stats?.members"
          :description="t('cards.members.description')"
          icon="ion:person-sharp"
          to="/members" />
        <InfoCard
          :title="t('cards.modifiers.title')"
          :stats="stats?.modifiers"
          :description="t('cards.modifiers.description')"
          icon="ion:erlenmeyer-flask"
          to="/modifiers" />
        <InfoCard
          :title="t('cards.games.title')"
          :stats="stats?.games"
          :description="t('cards.games.description')"
          icon="ion:game-controller"
          to="/games" />
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { API } from '~/tools/types'
import { API_ENDPOINT } from '~/tools/api'

const { t } = useI18n()

useHead({
  title: t('home')
})

const response = await useFetch(API_ENDPOINT('stats'))
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
