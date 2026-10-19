<script setup lang="ts">
interface SkeletonProps {
  class?: HTMLAttributes['class']
}

const props = defineProps<SkeletonProps>()
</script>

<template>
  <div data-slot="skeleton" :class="cn('bg-muted rounded-md animate-pulse', props.class)" />
</template>
