<script setup lang="ts">
import { reactiveOmit } from '@vueuse/core'
import { DialogDescription, type DialogDescriptionProps } from 'reka-ui'

const props = defineProps<DialogDescriptionProps & { class?: HTMLAttributes['class'] }>()

const delegatedProps = reactiveOmit(props, 'class')
</script>

<template>
  <DialogDescription data-slot="dialog-description" v-bind="delegatedProps" :class="cn('text-muted-foreground text-sm', props.class)">
    <slot />
  </DialogDescription>
</template>
