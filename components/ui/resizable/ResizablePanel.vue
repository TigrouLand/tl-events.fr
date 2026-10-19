<script setup lang="ts">
import type {} from 'reka-ui'
import { SplitterPanel, type SplitterPanelEmits, type SplitterPanelProps, useForwardExpose, useForwardPropsEmits } from 'reka-ui'

const props = defineProps<SplitterPanelProps>()
const emits = defineEmits<SplitterPanelEmits>()

const forwarded = useForwardPropsEmits(props, emits)
useForwardExpose()
</script>

<template>
  <SplitterPanel v-slot="slotProps" data-slot="resizable-panel" v-bind="forwarded">
    <slot v-bind="slotProps" />
  </SplitterPanel>
</template>
