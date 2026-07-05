<template>
  <div class="w-full h-full flex flex-col justify-center bg-gray-950 text-white p-16">
    <p class="text-6xl font-bold leading-tight">
      {{ title }}
    </p>
    <p v-if="description" class="mt-6 text-2xl text-gray-400">
      {{ description }}
    </p>
  </div>
</template>

<script setup lang="ts">
import type { DocsCollectionItem } from '@nuxt/content';

defineProps<DocsCollectionItem>();
</script>