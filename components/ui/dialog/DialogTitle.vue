<script setup lang="ts">
import { reactiveOmit } from '@vueuse/core'
import { DialogTitle, type DialogTitleProps } from 'reka-ui'

const props = defineProps<DialogTitleProps & { class?: HTMLAttributes['class'] }>()

const delegatedProps = reactiveOmit(props, 'class')
</script>

<template>
  <DialogTitle data-slot="dialog-title" v-bind="delegatedProps" :class="cn('text-lg leading-none font-semibold', props.class)">
    <slot />
  </DialogTitle>
</template>
