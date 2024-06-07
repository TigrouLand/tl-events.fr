<template>
  <div class="container">
    <SearchInput v-model="searchQuery" placeholder="Rechercher par pseudonyme ..." @keyup="searchPlayers" />

    <ul class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:mx-0 lg:grid-cols-3">
      <PlayerCard v-for="member in displayedMembers" :key="member.uuid" :player="member" />
    </ul>
  </div>
</template>

<script setup lang="ts">
import type { API } from '~/tools/types';
import { findQuery } from '~/tools/utils';

const response = await useFetch('https://api.tl-events.fr/v1/members');
const members = response.data as Ref<API.Member[]>;

const searchQuery = ref('');
const displayedMembers: Ref<API.Member[]> = ref(members.value);
const searchPlayers = (): void => {
  displayedMembers.value = findQuery(members, searchQuery);
};
</script>
