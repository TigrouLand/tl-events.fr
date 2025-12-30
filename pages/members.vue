<template>
  <div class="container">
    <div class="mb-4 flex gap-2">
      <SearchInput v-model="searchQuery" placeholder="Rechercher par pseudonyme ..." class="flex-1" @keyup="searchPlayers" />
      <Filters label="Filtrer" :options="filterOptions" :current-value="currentSort" @select="sortBy" @clear="clearSort" />
    </div>

    <ul class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:mx-0 lg:grid-cols-3">
      <PlayerCard v-for="member in displayedMembers" :key="member.uuid" :player="member" />
    </ul>
  </div>
</template>

<script setup lang="ts">
import type { API } from '~/tools/types'
import { API_ENDPOINT } from '~/tools/api'
import { findQuery } from '~/tools/utils'

useHead({
  title: 'Membres'
})

const response = await useFetch(API_ENDPOINT('members'))
const members = response.data as Ref<API.Member[]>

const searchQuery = ref('')
const currentSort = ref<'kills' | 'deaths' | 'wins' | null>(null)

type Filters = Array<{ value: NonNullable<typeof currentSort.value>; label: string }>
const filterOptions = ref<Filters>([
  { value: 'kills', label: 'Plus de kills' },
  { value: 'deaths', label: 'Plus de morts' },
  { value: 'wins', label: 'Plus de victoires' }
])

const displayedMembers: Ref<API.Member[]> = ref(members.value)

const searchPlayers = (): void => {
  let filtered = findQuery(members, searchQuery)

  if (currentSort.value) {
    const sortKey = currentSort.value
    filtered = [...filtered].sort((a, b) => b[sortKey] - a[sortKey])
  }

  displayedMembers.value = filtered
}

const sortBy = (type: PropertyKey): void => {
  if (type === 'kills' || type === 'deaths' || type === 'wins') {
    currentSort.value = type
    searchPlayers()
  }
}

const clearSort = (): void => {
  currentSort.value = null
  searchPlayers()
}
</script>
