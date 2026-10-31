<script setup lang="ts">
import type { Gamemode } from '~/tools/gamemodes'
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogTitle } from '~/components/ui/dialog'
import { slotNumber } from '~/tools/gamemodes'
import GamemodeArt from './art.vue'

const props = defineProps({
  mode: { type: Object as PropType<Gamemode>, required: true },
  /** the slot's ordinal, carried over from the grid so the panel and its tile agree */
  index: { type: Number, required: true },
  open: { type: Boolean, default: false }
})

const emit = defineEmits<{ close: [] }>()

const { t } = useI18n()

const name = computed(() => t(`gamemodesPage.modes.${props.mode.key}.name`))
const rules = computed(() => t(`gamemodesPage.modes.${props.mode.key}.rules`))

const meta = computed(() => [
  { label: t('gamemodesPage.meta.slot'), value: slotNumber(props.index) },
  { label: t('gamemodesPage.meta.item'), value: props.mode.material },
  { label: t('gamemodesPage.meta.type'), value: props.mode.slug }
])

// reka-ui also emits update:open on open, which would immediately close what the click just opened
const onOpenChange = (value: boolean): void => {
  if (!value) emit('close')
}
</script>

<template>
  <Dialog :open="open" @update:open="onOpenChange">
    <DialogContent class="mc-bevel max-w-3xl gap-0 overflow-hidden rounded-none border-0 p-0">
      <header class="relative flex aspect-[16/10] w-full shrink-0 flex-col sm:aspect-[21/9]">
        <GamemodeArt :mode="mode" scrim large />

        <DialogClose
          class="focus-visible:border-white/80 absolute right-3 top-3 z-10 grid size-9 shrink-0 place-items-center border-2 border-white/25 bg-black/50 text-white outline-none transition-colors hover:border-white/70 hover:bg-black/70">
          <span class="sr-only">{{ t('gamemodesPage.close') }}</span>
          <Icon name="ion:close" size="20" />
        </DialogClose>

        <!-- mt-auto drops the title into the scrim's darkest band instead of the bright sky above it -->
        <div class="relative mt-auto flex items-center gap-3 p-5 sm:p-6">
          <span class="grid size-10 shrink-0 place-items-center text-lg font-bold text-black" :style="{ background: mode.accent }">
            {{ slotNumber(index) }}
          </span>
          <DialogTitle class="mc-hard text-white text-2xl font-bold uppercase tracking-wider sm:text-3xl">
            {{ name }}
          </DialogTitle>
        </div>
      </header>

      <div class="min-h-0 overflow-y-auto p-5 sm:p-7">
        <dl class="mb-6 grid grid-cols-3 divide-x-2 divide-border border-2 border-border">
          <div v-for="row in meta" :key="row.label" class="min-w-0 px-3 py-2">
            <dt class="text-muted-foreground text-[10px] font-bold uppercase tracking-widest">{{ row.label }}</dt>
            <dd class="mt-1 truncate text-sm font-bold">{{ row.value }}</dd>
          </div>
        </dl>

        <span class="mb-4 block h-1 w-16 shrink-0" :style="{ background: mode.accent }" />

        <DialogDescription class="text-foreground/80 text-base leading-relaxed sm:text-lg">
          {{ rules }}
        </DialogDescription>
      </div>
    </DialogContent>
  </Dialog>
</template>
