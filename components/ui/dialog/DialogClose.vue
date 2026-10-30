<script setup lang="ts">
import { reactiveOmit } from '@vueuse/core'
import { DialogClose, type DialogCloseProps } from 'reka-ui'

const props = defineProps<DialogCloseProps & { class?: HTMLAttributes['class'] }>()

const delegatedProps = reactiveOmit(props, 'class')
</script>

<template>
  <DialogClose data-slot="dialog-close" v-bind="delegatedProps" :class="cn(props.class)">
    <slot />
  </DialogClose>
</template>
