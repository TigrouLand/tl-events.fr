<script setup lang="ts">
import { reactiveOmit } from '@vueuse/core'
import { SelectGroup, type SelectGroupProps } from 'reka-ui'

const props = defineProps<SelectGroupProps & { class?: HTMLAttributes['class'] }>()

const delegatedProps = reactiveOmit(props, 'class')
</script>

<template>
  <SelectGroup data-slot="select-group" v-bind="delegatedProps" :class="cn('scroll-my-1 p-1', props.class)">
    <slot />
  </SelectGroup>
</template>
