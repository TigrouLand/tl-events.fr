<template>
  <div class="max-w-7xl mx-auto sm:px-6 lg:px-8 py-10">
    <div class="pt-2 relative mx-auto text-white space-y-4 px-5 lg:px-0 mb-7">
      <input
        v-model="searchQuery"
        class="border border-gray-400 bg-gray-600 h-10 px-5 pr-16 rounded-lg text-sm focus:outline-none w-full"
        placeholder="Rechercher par scénario ..."
        @keyup="searchModifiers"
      >
    </div>
    <ul class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 mx-5 lg:mx-0">
      <ModifierCard v-for="modifier in displayedModifiers" :key="modifier.name" :modifier="modifier" />
    </ul>
  </div>
</template>

<script setup lang="ts">
import Levenshtein from 'levenshtein';
import { useFetch } from '#app';
import { ref } from 'vue';
import type { Ref } from 'vue';
import type { Modifier } from '~/typings/api';

useHead({
  title: '[TL] Events - Scénarios'
});
const response = await useFetch('https://api.tl-events.fr/v1/modifiers');
const modifiers = response.data as Ref<Modifier[]>;

const displayedModifiers: Ref<Modifier[]> = ref<Modifier[]>([]);
displayedModifiers.value = modifiers.value;

const searchQuery = ref('');

const searchModifiers = () => {
  if (!searchQuery.value) {
    displayedModifiers.value = modifiers.value;
    return;
  }
  displayedModifiers.value = modifiers.value.filter(modifier => modifier.name.toLowerCase().startsWith(searchQuery.value.toLowerCase()) ||
      new Levenshtein(modifier.name.toLowerCase(), searchQuery.value.toLowerCase()).distance < 5);
};
</script>
