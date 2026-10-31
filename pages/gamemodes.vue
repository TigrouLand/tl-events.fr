<script setup lang="ts">
import type { Gamemode } from '~/tools/gamemodes'
import GamemodeCard from '~/components/design/gamemodes/card.vue'
import GamemodeDetail from '~/components/design/gamemodes/detail.vue'
import { GAMEMODES } from '~/tools/gamemodes'
import { APP_NAME } from '~/tools/seo'

const { t } = useI18n()

useHead({ title: t('gamemodes') })
useSeoMeta({
  ogTitle: `${APP_NAME} > ${t('gamemodes')}`,
  description: () => t('gamemodesPage.subtitle')
})

const SPANS = ['sm:row-span-2 sm:col-span-2', 'sm:col-span-2', '', '', 'sm:col-span-2', 'sm:col-span-2', 'sm:col-span-2', '', '']

const detail = ref<{ mode: Gamemode; index: number }>({ mode: GAMEMODES[0], index: 0 })
const detailOpen = ref(false)

const openDetail = (mode: Gamemode, index: number): void => {
  detail.value = { mode, index }
  detailOpen.value = true
}
</script>

<template>
  <div class="min-h-full pb-20 pt-6">
    <div class="mx-auto max-w-7xl px-4 pt-28 sm:px-6 lg:px-8">
      <header class="mb-6">
        <p class="text-muted-foreground flex items-center gap-x-4 text-[11px] font-bold uppercase tracking-[0.3em]">
          <Icon name="ion:game-controller" size="16" />
          {{ t('gamemodesPage.count', { count: GAMEMODES.length }) }}
        </p>
      </header>

      <ul class="auto-rows-[13rem] grid grid-cols-1 gap-4 sm:auto-rows-[14rem] sm:grid-cols-2 lg:auto-rows-[13.5rem] lg:grid-cols-4">
        <li v-for="(mode, index) in GAMEMODES" :key="mode.key" :class="SPANS[index]">
          <GamemodeCard
            :mode="mode"
            :index="index"
            :variant="index === 0 ? 'hero' : 'tile'"
            @open="openDetail(mode, index)" />
        </li>
      </ul>
    </div>

    <GamemodeDetail :mode="detail.mode" :index="detail.index" :open="detailOpen" @close="detailOpen = false" />
  </div>
</template>
