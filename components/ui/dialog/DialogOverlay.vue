<script setup lang="ts">
import { reactiveOmit } from '@vueuse/core'
import { DialogOverlay, type DialogOverlayProps } from 'reka-ui'

const props = defineProps<DialogOverlayProps & { class?: HTMLAttributes['class'] }>()

const delegatedProps = reactiveOmit(props, 'class')
</script>

<template>
  <DialogOverlay
    data-slot="dialog-overlay"
    v-bind="delegatedProps"
    :class="
      cn(
        'data-open:animate-in data-closed:animate-out data-closed:fade-out-0 data-open:fade-in-0 bg-black/70 backdrop-blur-sm fixed inset-0 z-50 duration-200',
        props.class
      )
    ">
    <slot />
  </DialogOverlay>
</template>
