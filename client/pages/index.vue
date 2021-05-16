<template>
  <video
    loop=""
    muted=""
    autoplay=""
    playsinline=""
    preload="none"
    class="flex flex-col object-cover h-full w-full"
  >
    <source src="~/assets/showcase.mp4" type="video/mp4">
  </video>
</template>

<script lang="ts">
export default {
  head: {
    title: 'Accueil'
  }
};
</script>
