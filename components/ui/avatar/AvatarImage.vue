<script setup lang="ts">
import { AvatarImage, type AvatarImageProps } from 'reka-ui'

const props = defineProps<AvatarImageProps & { class?: HTMLAttributes['class'] }>()
</script>

<template>
  <AvatarImage
    data-slot="avatar-image"
    v-bind="props"
    :class="cn('rounded-full aspect-square size-full object-cover', props.class)">
    <slot />
  </AvatarImage>
</template>
