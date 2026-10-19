<script setup lang="ts">
import type { BadgeVariants } from '.'
import { reactiveOmit } from '@vueuse/core'
import { Primitive, type PrimitiveProps } from 'reka-ui'
import { badgeVariants } from '.'

const props = defineProps<
  PrimitiveProps & {
    variant?: BadgeVariants['variant']
    class?: HTMLAttributes['class']
  }
>()

const delegatedProps = reactiveOmit(props, 'class')
</script>

<template>
  <Primitive
    data-slot="badge"
    :data-variant="variant"
    :class="cn(badgeVariants({ variant }), props.class)"
    v-bind="delegatedProps">
    <slot />
  </Primitive>
</template>
