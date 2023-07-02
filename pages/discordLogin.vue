<template>
  <div class="flex h-full w-full bg-zinc-800 items-center justify-center">
    <div class="flex-row justify-center w-max-xs w-full">
      <h1 class="flex justify-center text-2xl text-zinc-200">
        Connexion en cours
      </h1>
      <h1 class="flex justify-center text-lg text-zinc-200">
        Vous allez être redirigé vers la page de connexion.
      </h1>
      <div class="flex justify-center mt-5">
        <img class="h-16 w-auto" src="~/assets/loading.svg" alt="">
      </div>
    </div>
  </div>
</template>

<script async>
import { useUserStore } from '~/stores/user';

definePageMeta({
  layout: 'standalone'
});

setTimeout(() => {
  login();
}, 1000);

const login = async () => {
  const url = await useUserStore().getLoginUrl();
  if (!url) {
    return;
  }
  window.location = url;
};
</script>

<style scoped>

</style>
