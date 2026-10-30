<script setup lang="ts">
import { reactiveOmit } from '@vueuse/core'
import { DialogContent, type DialogContentEmits, type DialogContentProps, useForwardPropsEmits } from 'reka-ui'
import DialogOverlay from './DialogOverlay.vue'
import DialogPortal from './DialogPortal.vue'

defineOptions({
  inheritAttrs: false
})

const props = defineProps<DialogContentProps & { class?: HTMLAttributes['class'] }>()
const emits = defineEmits<DialogContentEmits>()

const delegatedProps = reactiveOmit(props, 'class')
const forwarded = useForwardPropsEmits(delegatedProps, emits)
</script>

<template>
  <DialogPortal>
    <DialogOverlay />
    <DialogContent
      data-slot="dialog-content"
      v-bind="{ ...$attrs, ...forwarded }"
      :class="
        cn(
          'bg-card text-card-foreground data-open:animate-in data-closed:animate-out data-closed:fade-out-0 data-open:fade-in-0 data-closed:zoom-out-95 data-open:zoom-in-95 fixed left-1/2 top-1/2 z-50 grid max-h-[calc(100dvh-2rem)] w-full max-w-lg -translate-x-1/2 -translate-y-1/2 gap-4 overflow-y-auto rounded-xl border p-6 shadow-2xl duration-200',
          props.class
        )
      ">
      <slot />
    </DialogContent>
  </DialogPortal>
</template>
