<script setup lang="ts">
import { artUrl, type Gamemode } from '~/tools/gamemodes'

/**
 * The visual face of a mode: the server's screenshot laid over a crafted cover. The cover stays
 * underneath instead of being swapped for the photo, so a shot that is still streaming in — or
 * missing entirely — degrades to that poster rather than to a blank box or a broken-image icon.
 */
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

// the cover owns a dark base instead of inheriting --card: the caption is always white, and --card is
// near-white in light mode, which would have buried the name of every mode showing its poster
const field = computed(() => ({
  backgroundColor: '#0b1016',
  backgroundImage: `radial-gradient(120% 90% at 50% 4%, ${props.mode.accent}55, transparent 63%)`
}))

// most covers are daylight shots: their caption needs the whole tile darkened, not just its foot
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

      <!-- the item id the server's own config hangs the icon on, stamped where a catalogue would put it -->
      <span
        :class="
          cn('absolute inset-x-0 top-4 text-center font-bold uppercase tracking-[0.2em] text-white/45', large ? 'text-sm' : 'text-[10px]')
        ">
        {{ mode.material }}
      </span>

      <div class="absolute inset-0 grid place-items-center pb-12">
        <Icon
          :name="mode.glyph"
          :class="
            cn(
              'mc-cover-glyph transition-[scale] duration-500 ease-out group-hover:scale-110',
              large ? 'size-28 sm:size-36' : 'size-20 sm:size-24'
            )
          "
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
    :class="
      cn(
        'absolute inset-0 size-full object-cover transition-[scale] duration-500 ease-out',
        zoom ? 'sm:scale-[1.45] sm:group-hover:scale-[1.55]' : 'group-hover:scale-105'
      )
    "
    @error="failed = true" />

  <div v-if="showArt && scrim" :class="cn('absolute inset-0', scrimClass)" />
</template>

<style scoped>
/* the cover glyph carries the same second block of itself the display headings do; a blur would
   smear the pixel-art edges the icon is drawn with */
.mc-cover-glyph {
  filter: drop-shadow(4px 4px 0 rgb(0 0 0 / 45%));
}
</style>
