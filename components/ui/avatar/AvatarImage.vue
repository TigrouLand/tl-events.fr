<script setup lang="ts">
import type { AvatarImageProps } from 'reka-ui'
import type { HTMLAttributes } from 'vue'
import { AvatarImage } from 'reka-ui'

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
