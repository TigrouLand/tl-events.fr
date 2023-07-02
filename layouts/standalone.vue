<template>
  <div class="flex flex-col h-screen w-full">
    <UpcomingGame />
    <Disclosure as="nav" class="bg-red-500">
      <div class="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <div class="relative flex h-16 items-center justify-center">
          <div class="flex flex-1 items-center justify-center">
            <img class="h-16 w-auto" src="~/assets/logo.png" alt="">
          </div>
        </div>
      </div>
    </Disclosure>
    <slot />
  </div>
</template>

<script setup>
import { Disclosure } from '@headlessui/vue';
import UpcomingGame from '~/components/UpcomingGame.vue';
</script>
