<template>
  <div class="w-full bg-zinc-800">
    <div class="flex justify-between flex-col w-full background" :style="{height:'60rem'}">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div class="flex flex-col justify-center items-center py-10 space-y-4">
          <h1 class="text-white text-4xl lg:text-7xl font-bold drop-shadow text-shadow-red">
            [TL] Events - UHC
          </h1>
          <h2 class="text-white text-xl lg:text-4xl font-bold drop-shadow text-shadow-zinc max-w-2xl text-center">
            Rejoignez notre communauté et participez à nos événements
          </h2>
        </div>
      </div>
      <div>
        <div class="flex w-full justify-center -translate-y-8">
          <ArrowDownIcon class="h-16 w-auto animate-bounce text-white" />
        </div>
        <img class="w-full rotate-180 text-red-600 h-32 flex flex-shrink-0 flex-grow-0" src="~/assets/divider-zinc.svg">
      </div>
    </div>
    <div class="bg-zinc-800 py-10 px-5">
      <div class="flex flex-col sm:flex-row justify-center sm:space-x-10 space-y-10 sm:space-y-0">
        <div class="flex sm:justify-end justify-center w-full">
          <div class="max-w-xl px-4">
            <h1 class="text-white sm:text-end text-center text-3xl lg:text-4xl font-bold">
              Rejoignez le Discord
            </h1>
            <div class="text-white sm:text-end text-center text-lg lg:text-xl mt-4 space-y-2">
              <p>Notre Discord est le centre de notre communauté : vous y retrouverez toutes les annonces, toutes les mises à jour et informations utiles concernant nos événements.</p>
              <p>
                Si vous souhaitez participer à nos événements, passez sur notre Discord en cliquant sur le lien ci-contre : <a target="_blank" href="https://discord.gg/c5HsKq2fCt" class="text-zinc-400 inline-flex items-center">
                  https://discord.gg/c5HsKq2fCt
                  <ArrowTopRightOnSquareIcon class="h-5 w-5 ml-1.5" />
                </a>.
              </p>
              <p>Notre serveur Minecraft étant sous whitelist, n'hésitez pas à vous présenter et demander à rejoindre cette whitelist !</p>
            </div>
          </div>
        </div>
        <div class="flex w-full justify-start px-4">
          <div class="max-w-xl">
            <img class="w-full rounded-xl object-cover" src="~/assets/discord-invite.png" alt="">
          </div>
        </div>
      </div>
    </div>
    <div class="bg-red-800">
      <img class="w-full h-32 -scale-y-100 -rotate-180" src="~/assets/divider-zinc.svg">
    </div>

    <div class="bg-red-800 py-10 px-5">
      <div class="flex flex-col-reverse sm:flex-row justify-center sm:space-x-10">
        <div class="flex w-full justify-center sm:justify-end px-4 sm:mt-0 mt-10">
          <div class="max-w-xl">
            <img class="w-full rounded-xl object-cover" src="~/assets/address.png" alt="">
          </div>
        </div>
        <div class="w-full">
          <div class="max-w-xl">
            <h1 class="text-white text-center sm:text-start text-3xl lg:text-4xl font-bold">
              Ajoutez le serveur
            </h1>
            <div class="text-white text-center sm:text-start text-lg lg:text-xl mt-4 space-y-2">
              <p>Afin de pouvoir vous connecter rapidement lors de nos prochains événements, nous vous conseillons d'ajouter l'adresse à votre liste de serveurs.</p>
              <p>
                Démarrez votre jeu, accédez au menu Multijoueur puis cliquez sur Ajouter un serveur. Cliquez sur l'adresse ci-contre pour la copier :
                <button class="text-zinc-400 inline-flex items-center" @click="copy()">
                  tl-events.fr
                  <ClipboardIcon v-if="!copied" class="h-5 w-5 ml-1.5" />
                  <ClipboardDocumentCheckIcon v-else class="h-5 w-5 ml-1.5" />
                </button>.
              </p>
              <p>Notez qu'une whitelist est actuellement mise en place, n'hésitez pas à demander votre ajout à cette whitelist sur notre serveur Discord !</p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="bg-red-800">
      <img class="w-full h-32 rotate-180" src="~/assets/divider-zinc.svg">
    </div>

    <div class="bg-zinc-800 py-10 px-5">
      <div class="flex flex-col sm:flex-row justify-center sm:space-x-10 space-y-10 sm:space-y-0">
        <div class="flex sm:justify-end justify-center w-full">
          <div class="max-w-xl px-4">
            <h1 class="text-white sm:text-end text-center text-3xl lg:text-4xl font-bold">
              Jouez avec nous
            </h1>
            <div class="text-white sm:text-end text-center text-lg lg:text-xl mt-4 space-y-2">
              <p>Différents événements seront organisés à différentes dates. Il ne vous reste plus qu'à vous inscrire à un de nos événements et donner le meilleur de vous-même le moment venu !</p>
              <p>Notre communauté est bienveillante et les parties se déroulent dans une bonne entente. Vous n'avez pas besoin d'être un pro du PvP, seulement d'être respectueux et fair-play avec les autres joueurs.</p>
              <p>Alors, si vous souhaitez participer à un de nos événements, nous nous ferons un plaisir de vous accueillir parmi nous ! :)</p>
            </div>
          </div>
        </div>
        <div class="flex w-full justify-start px-4">
          <div class="max-w-xl">
            <img class="w-full rounded-xl object-cover" src="~/assets/fighting.png" alt="">
          </div>
        </div>
      </div>
    </div>
    <div class="bg-zinc-900">
      <img class="w-full h-32 -scale-y-100 -rotate-180" src="~/assets/divider-zinc.svg">
    </div>
  </div>
</template>

<script setup lang="ts">
import {
  ArrowDownIcon,
  ArrowTopRightOnSquareIcon,
  ClipboardDocumentCheckIcon,
  ClipboardIcon,
} from '@heroicons/vue/24/outline';

const copied = ref(false);

const copy = () => {
  navigator.clipboard.writeText('tl-events.fr');
  copied.value = true;
  setTimeout(() => {
    copied.value = false;
  }, 2000);
};
</script>

<style scoped>
.background {
  background: url("~/assets/background.png") center no-repeat;
}

.text-shadow-red {
  text-shadow: rgba(178, 55, 52, 0.8) 3px 3px 0;
}
.text-shadow-zinc {
  text-shadow: rgba(39, 39, 42, 0.8) 3px 3px 0;
}
</style>
