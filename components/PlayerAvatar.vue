<template>
  <ClientOnly>
    <Avatar
      :class="cn(props.class, { 'h-24 w-auto rounded-none after:hidden': type === 'flat' })">
      <AvatarImage
        :src="avatarUrl"
        :alt="`Skin de ${player}`"
        :class="cn('[image-rendering:pixelated]', { 'rounded-none aspect-auto object-contain': type === 'flat' })"
      />
      <AvatarFallback :class="cn({ 'rounded-none': type === 'flat' })">
        <Skeleton class="size-full" />
      </AvatarFallback>
    </Avatar>
    <template #fallback>
      <Skeleton :class="cn(type === 'flat' ? 'size-16 rounded-none' : 'size-8 rounded-full', props.class)" />
    </template>
  </ClientOnly>
</template>

<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { Avatar, AvatarFallback, AvatarImage } from '~/components/ui/avatar'
import { Skeleton } from '~/components/ui/skeleton'
import { AVATAR_URL } from '~/tools/seo'

const props = defineProps({
  player: { type: String, required: true },
  class: { type: String as PropType<HTMLAttributes['class']>, default: '' },
  type: { type: String as PropType<'flat' | 'rounded'>, default: 'flat' }
})

const avatarUrl = computed(() => `${AVATAR_URL}/${props.type === 'flat' ? 'busts' : 'helms'}/${props.player}.png`)
</script>
