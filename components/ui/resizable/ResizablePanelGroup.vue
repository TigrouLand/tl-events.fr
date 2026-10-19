<script setup lang="ts">
import { reactiveOmit } from '@vueuse/core'
import { SplitterGroup, type SplitterGroupEmits, type SplitterGroupProps, useForwardPropsEmits } from 'reka-ui'

const props = defineProps<SplitterGroupProps & { class?: HTMLAttributes['class'] }>()
const emits = defineEmits<SplitterGroupEmits>()

const delegatedProps = reactiveOmit(props, 'class')

const forwarded = useForwardPropsEmits(delegatedProps, emits)
</script>

<template>
  <SplitterGroup
    v-slot="slotProps"
    data-slot="resizable-panel-group"
    v-bind="forwarded"
    :class="cn('flex h-full w-full data-[panel-group-direction=vertical]:flex-col', props.class)">
    <slot v-bind="slotProps" />
  </SplitterGroup>
</template>
