<template>
  <div class='w-full h-full grid place-items-center p-16 px-18 text-white bg-cover bg-center' :style="{ backgroundImage: `url(${image})` }">
    <div class='flex flex-col h-full w-full p-8 backdrop-blur-lg bg-black/30 rounded-2xl'>
      <h1 class='text-6xl font-bold'>{{ title }}</h1>
      <p class='text-3xl max-w-2xl text-[#d1d5db] mt-6'>{{ description }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{ title: string; description?: string; image?: string }>()
</script>
