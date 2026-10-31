<script setup lang="ts">
import type { Gamemode } from '~/tools/gamemodes'
import { slotNumber } from '~/tools/gamemodes'
import GamemodeArt from './art.vue'

/**
 * One slot of the hotbar: a bevelled cell that holds the mode's art, its ordinal and its one-line
 * pitch, and opens the detail panel when pressed. Grid placement is left to the page, so the card
 * only promises to fill whatever cell it is handed.
 */
const props = defineProps({
  mode: { type: Object as PropType<Gamemode>, required: true },
  /** its position in the catalogue, printed the way the game's own hotbar numbers read */
  index: { type: Number, required: true },
  /** the hero spans two cells and carries the call to action; a tile takes one */
  variant: { type: String as PropType<'hero' | 'tile'>, default: 'tile' }
})

defineEmits<{ open: [] }>()

const { t } = useI18n()

const hero = computed(() => props.variant === 'hero')
const name = computed(() => t(`gamemodesPage.modes.${props.mode.key}.name`))
const blurb = computed(() => t(`gamemodesPage.modes.${props.mode.key}.short`))
</script>

<template>
  <button
    type="button"
    class="mc-tile mc-enter group relative flex h-full w-full flex-col overflow-hidden text-left outline-none"
    :style="{ '--mc-accent': mode.accent, '--mc-i': index }"
    @click="$emit('open')">
    <GamemodeArt :mode="mode" scrim :zoom="hero" :large="hero" :eager="hero" />

    <div :class="cn('relative mt-auto flex flex-col gap-2', hero ? 'p-6 sm:p-8' : 'p-4')">
      <span class="flex items-center gap-3">
        <span
          :class="cn('grid shrink-0 place-items-center font-bold text-black', hero ? 'size-9 text-base' : 'size-7 text-xs')"
          :style="{ background: mode.accent }">
          {{ slotNumber(index) }}
        </span>
        <span class="mc-hard text-white text-lg font-bold uppercase tracking-wide sm:text-xl">{{ name }}</span>
      </span>

      <p :class="cn('mc-hard text-white/75', hero ? 'max-sm:line-clamp-2 max-w-2xl text-sm sm:text-base' : 'line-clamp-2 text-xs sm:text-sm')">
        {{ blurb }}
      </p>

      <span
        v-if="hero"
        class="mt-3 inline-flex w-fit items-center gap-1.5 border-2 border-white/25 bg-black/35 px-3 py-1.5 text-xs font-bold uppercase tracking-widest text-white/90 transition-colors group-hover:border-white/70">
        {{ t('gamemodesPage.explore') }}
        <Icon name="ion:ios-arrow-round-forward" size="18" class="transition-transform group-hover:translate-x-1.5" />
      </span>
    </div>
  </button>
</template>
