<script setup lang="ts">
import { artUrl, type Gamemode } from '~/tools/gamemodes'

const props = defineProps({
  mode: { type: Object as PropType<Gamemode>, required: true },
  /** the caption rides on the art, so bright screenshots need the whole tile darkened, not just its foot */
  scrim: { type: Boolean, default: false },
  /** hero and detail-header sizing for the cover glyph */
  large: { type: Boolean, default: false },
  /** a cell taller than the 16:9 shot leaves sky above the subject; zooming buys the crop back */
  zoom: { type: Boolean, default: false },
  eager: { type: Boolean, default: false }
})

const { t } = useI18n()

const failed = ref(false)

const showArt = computed(() => !failed.value)
const name = computed(() => t(`gamemodesPage.modes.${props.mode.key}.name`))

const field = computed(() => ({
  backgroundColor: '#0b1016',
  backgroundImage: `radial-gradient(120% 90% at 50% 4%, ${props.mode.accent}55, transparent 63%)`
}))

const scrimClass = computed(() =>
  props.mode.bright
    ? 'bg-gradient-to-t from-black/90 via-black/55 to-black/20'
    : 'bg-gradient-to-t from-black/85 via-black/25 to-transparent'
)
</script>

<template>
  <div class="absolute inset-0 overflow-hidden" :style="field">
    <div class="mc-grid absolute inset-0" />

    <template v-if="!showArt">
      <div class="absolute inset-2 border-2 opacity-40" :style="{ borderColor: mode.accent }" />

      <span
        :class="cn('absolute inset-x-0 top-4 text-center font-bold uppercase tracking-[0.2em] text-white/45', large ? 'text-sm' : 'text-[10px]')">
        {{ mode.material }}
      </span>

      <div class="absolute inset-0 grid place-items-center pb-12">
        <Icon
          :name="mode.glyph"
          :class="cn('mc-cover-glyph transition-[scale] duration-500 ease-out group-hover:scale-110', large ? 'size-28 sm:size-36' : 'size-20 sm:size-24')"
          :style="{ color: mode.accent }" />
      </div>
    </template>
  </div>

  <img
    v-if="showArt"
    :src="artUrl(mode)"
    :alt="name"
    :loading="eager ? 'eager' : 'lazy'"
    :fetchpriority="eager ? 'high' : 'auto'"
    decoding="async"
    :style="{ objectPosition: mode.focus }"
    :class="cn('absolute inset-0 size-full object-cover transition-[scale] duration-500 ease-out', zoom ? 'sm:scale-[1.45] sm:group-hover:scale-[1.55]' : 'group-hover:scale-105')"
    @error="failed = true" />
  <div v-if="showArt && scrim" :class="cn('absolute inset-0', scrimClass)" />
</template>

<style scoped>
.mc-cover-glyph {
  filter: drop-shadow(4px 4px 0 rgb(0 0 0 / 45%));
}
</style>
