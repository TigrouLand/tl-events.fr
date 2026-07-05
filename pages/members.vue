<template>
  <div class="container mt-26">
    <div class="mb-4 flex gap-2">
      <Input v-model="searchQuery" placeholder="Rechercher par pseudonyme ..." class="flex-1" @keyup="searchPlayers" />
      <Filters label="Filtrer" :options="filterOptions" :current-value="currentSort" @select="sortBy" @clear="clearSort" />
    </div>

    <ul class="grid grid-cols-1 gap-6 xs:grid-cols-2 sm:grid-cols-3 lg:grid-cols-4">
      <PlayerCard
        v-for="(member, index) in displayedMembers"
        :key="member.uuid"
        :player="member"
        :podium="currentSort && index < 3 ? ((index + 1) as 1 | 2 | 3) : undefined" />
    </ul>
  </div>
</template>

<script setup lang="ts">
import type { API } from '~/tools/api'
import { Input } from '~/components/ui/input'
import { fetchAPI } from '~/tools/api'
import { findQuery, PLAYER_STATS, type StatKey } from '~/tools/utils'

const { t } = useI18n()

useHead({ title: t('members') })

const response = await useFetch(fetchAPI('members'))
const members = response.data as Ref<API.Member[]>

const searchQuery = ref('')
const currentSort = ref<StatKey | null>(null)

const filterOptions = PLAYER_STATS.map(({ key, icon }) => ({
  value: key,
  label: t(`filters.${key}`),
  icon
}))

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
  const stat = PLAYER_STATS.find((s) => s.key === type)
  if (stat) {
    currentSort.value = stat.key
    searchPlayers()
  }
}

const clearSort = (): void => {
  currentSort.value = null
  searchPlayers()
}
</script>
