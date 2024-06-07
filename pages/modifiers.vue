<template>
  <div class="container">
    <SearchInput v-model="searchQuery" placeholder="Rechercher par scénario ..." @keyup="searchModifiers" />

    <ul class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:mx-0 lg:grid-cols-3">
      <ModifierCard v-for="modifier in displayedModifiers" :key="modifier.name" :modifier="modifier" />
    </ul>
  </div>
</template>

<script setup lang="ts">
import type { API } from '~/tools/types';
import { findQuery } from '~/tools/utils';

useHead({
  title: '[TL] Events - Scénarios',
});

const response = await useFetch('https://api.tl-events.fr/v1/modifiers');
const modifiers = response.data as Ref<API.Modifier[]>;

const searchQuery = ref('');
const displayedModifiers: Ref<API.Modifier[]> = ref(modifiers.value);
const searchModifiers = (): void => {
  displayedModifiers.value = findQuery(modifiers, searchQuery);
};
</script>
