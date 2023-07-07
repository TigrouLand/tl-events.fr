<template>
  <div class="flex flex-col h-screen w-full">
    <UpcomingGame />
    <Disclosure v-slot="{ open }" as="nav" class="bg-red-500">
      <div class="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <div class="relative flex h-16 items-center justify-between">
          <div class="absolute inset-y-0 left-0 flex items-center sm:hidden">
            <DisclosureButton class="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
              <Bars3Icon v-if="!open" class="block h-6 w-6" aria-hidden="true" />
              <XMarkIcon v-else class="block h-6 w-6" aria-hidden="true" />
            </DisclosureButton>
          </div>
          <div class="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
            <img class="h-16 w-auto" src="~/assets/logo.png" alt="">
            <div class="hidden sm:ml-6 sm:block sm:flex sm:items-center">
              <div class="flex space-x-4 items-center">
                <NuxtLink v-for="item in navigation" :key="item.name" :to="item.href" :class="[item.current ? 'bg-red-700 text-white' : 'text-gray-300 hover:bg-red-700 hover:text-white', 'rounded-md px-3 py-2 text-sm font-medium']" :aria-current="item.current ? 'page' : undefined">
                  {{ item.name }}
                </NuxtLink>
              </div>
            </div>
          </div>
          <div v-if="user" class="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
            <Menu as="div" class="relative ml-3">
              <div>
                <MenuButton class="flex rounded-full h-8 bg-red-700 text-sm text-gray-100 items-center sm:pl-3 focus:outline-none focus:ring-2 focus:ring-red-600 focus:ring-offset-2 focus:ring-offset-red-800">
                  <div class="hidden sm:block">
                    {{ displayName }}
                  </div>
                  <img class="ml-2 h-8 w-8 rounded-full" :src="displayAvatar" alt="">
                </MenuButton>
              </div>
            </Menu>
          </div>
          <button v-else class="text-gray-300 hover:bg-red-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium flex" @click="login()">
            Se connecter <ArrowRightOnRectangleIcon class="h-5 w-auto ml-2" />
          </button>
        </div>
      </div>
      <DisclosurePanel class="sm:hidden">
        <div class="space-y-1 px-2 pb-3 pt-2">
          <NuxtLink
            v-for="item in navigation"
            :key="item.name"
            :to="item.href"
            class="my-1 mx-1"
          >
            <DisclosureButton
              as="div"
              :class="[item.current ? 'bg-red-700 text-white' : 'text-gray-300 hover:bg-red-700 hover:text-white', 'block rounded-md px-3 py-2 text-base font-medium']"
              :aria-current="item.current ? 'page' : undefined"
            >
              {{ item.name }}
            </DisclosureButton>
          </NuxtLink>
        </div>
      </DisclosurePanel>
    </Disclosure>
    <slot />
    <footer class="bg-zinc-900" aria-labelledby="footer-heading">
      <h2 id="footer-heading" class="sr-only">Footer</h2>
      <div class="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8">
        <div class="xl:grid xl:grid-cols-3 xl:gap-8">
          <div>
            <div class="h-10 text-gray-200 text-3xl">[TL] Events</div>
            <p class="text-gray-300 text-base">Des événements Minecraft UHC 1.8 en tout genre, spécifiquement développés pour la communauté !</p>
            <div class="flex">
              <a href="/" class="text-gray-400 hover:text-gray-500">
                <span class="sr-only">test</span>
              </a>
            </div>
          </div>
        </div>
        <div class="mt-12 border-t border-gray-500 pt-8">
          <p class="text-base text-gray-400 xl:text-center">[TL] Events {{ new Date().getFullYear() }} - Développé par Romain</p>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup>
import { Disclosure, DisclosureButton, DisclosurePanel, Menu, MenuButton } from '@headlessui/vue';
import { Bars3Icon, XMarkIcon, ArrowRightOnRectangleIcon } from '@heroicons/vue/24/outline';
import { storeToRefs } from 'pinia';
import { useUserStore } from '~/stores/user';
import UpcomingGame from '~/components/UpcomingGame.vue';

const userStore = useUserStore();
const { user, displayAvatar, displayName } = storeToRefs(userStore);

onMounted(() => {
  useUserStore().fetchUser();
});

const login = async () => {
  const url = await useUserStore().getLoginUrl();
  if (!url) {
    return;
  }
  window.location = url;
};

const navigation = [
  { name: 'Accueil', href: '/', current: true },
  { name: 'Jeux', href: '#', current: false },
  { name: 'Membres', href: '#', current: false },
  { name: 'Parties', href: '#', current: false }
];
</script>
