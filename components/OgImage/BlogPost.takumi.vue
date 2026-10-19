<template>
  <div class='w-full h-full p-14 px-16 text-white bg-cover bg-center' :style="{ backgroundImage: `url(${image})` }">
    <img src="/logo.webp" :alt="APP_NAME" height="100" width="100" class='absolute top-12 right-12 rounded-xl' />
    <div class='flex flex-col absolute bottom-12 left-12 w-[calc(100%-84px)] p-10 bg-black/30 rounded-2xl' :style="{ backdropFilter: 'blur(16px)' }">
        <h1 class='text-7xl font-bold'>{{ title }}</h1>
        <p class='text-3xl text-[#d1d5db] mt-6'>{{ description }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { APP_NAME } from '~/tools/seo'

defineProps<{ title: string; description?: string; image?: string }>()
</script>
