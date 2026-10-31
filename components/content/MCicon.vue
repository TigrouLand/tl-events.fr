<template>
  <span v-if="id" class="mcicon my-0! relative -top-[0.12em] inline-block align-middle">
    <img
      draggable="false"
      :src="url"
      :width="Number(size)"
      :height="Number(size)"
      :alt="alt"
      loading="lazy"
      decoding="async"
      class="block my-0! select-none"
    />
    <span
      v-if="foil"
      class="mcicon-foil"
      :style="{ '--mcicon-foil': `url(${url})`, '--mcicon-size': `${Number(size)}px` }"
      aria-hidden="true"
    />
  </span>
  <slot />
</template>

<script setup lang="ts">
import { type IconType, iconUrl, wantsFoil } from '~/tools/mc-icons'

const props = defineProps({
  type: { type: String as PropType<IconType>, default: 'block' },
  id: { type: String, required: true },
  enchanted: { type: [String, Boolean], default: false },
  glint: { type: [String, Boolean], default: false },
  size: { type: [String, Number], default: 24 },
  alt: { type: String, default: '' }
})

const url = computed(() => iconUrl(props.type, props.id))
const foil = computed(() => wantsFoil(props.enchanted, props.glint))
</script>
