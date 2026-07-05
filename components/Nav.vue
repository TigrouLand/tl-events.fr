<template>
  <nav v-if="route.name.includes('games') !== props.floating" :class="cn('custom-borders items-center flex p-2 mx-auto justify-between max-w-5xl z-100 bg-black/20 backdrop-blur-2xl rounded-4xl shadow-2xl', { 'fixed! left-0 right-0 top-8': floating, 'relative mt-4': !floating })" :style="{ height: dropdown ? '300px' : 'auto' }">
        <NuxtImg src="/logo.webp" alt="Logo" draggable="false" class="h-12 rounded-full select-none" />

        <ul class="absolute left-0 top-20 mr-auto flex flex-col sm:relative sm:top-[initial] sm:-my-px sm:ml-4 sm:flex-row sm:space-x-4 md:ml-6 md:space-x-4">
            <NuxtLink v-for="navLink in navLinks" :key="navLink.label" :to="navLink.to" class="nav-link">
                <Icon :name="navLink.icon" size="20" /> <span class="ml-2 max-[900px]:hidden">{{ $t(navLink.label) }}</span>
            </NuxtLink>
        </ul>

        <div class="absolute left-1/2 top-62.5 mx-auto flex -translate-x-1/2 items-center space-x-4 sm:relative sm:left-[initial] sm:top-[initial] sm:mx-0 sm:-translate-x-0">
            <NuxtLink v-for="socialLink in socialLinks" :key="socialLink.label" :href="socialLink.href" target="_blank" rel="noopener noreferrer">
                <Icon :name="socialLink.icon" size="20" class="text-white" />
            </NuxtLink>
            <Button class="cursor-pointer">
                <PlayersCount />
            </Button>
            <LangSelector />
        </div>

        <div class="flex items-center sm:hidden">
            <button
                type="button"
                class="inline-flex items-center justify-center rounded-md bg-gray-100 p-2 text-primary hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-red-700 focus:ring-offset-2"
                aria-controls="mobile-menu"
                aria-expanded="false"
                @click="dropdown = !dropdown">
                <span class="sr-only">Open main menu</span>
                <svg
                class="h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true">
                <template v-if="!dropdown">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
                </template>
                <template v-else>
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                </template>
                </svg>
            </button>
        </div>
    </nav>
</template>

<script setup>
import { navLinks, socialLinks } from '~/tools/seo'
import PlayersCount from './PlayersCount.vue'
import Button from './ui/button/Button.vue';
import { useRoute } from 'vue-router'

const route = useRoute()

const props = defineProps({
  floating: { type: Boolean, default: true }
})

const dropdown = ref(false)
</script>

<style scoped>
@reference "tailwindcss";

.custom-borders::before {
  @apply pointer-events-none absolute inset-0 rounded-4xl border border-transparent content-[''];

  background: linear-gradient(30deg, #ffffff00, #ffffff30, #00000000) border-box;
  -webkit-mask:
    linear-gradient(#fff 0 0) padding-box,
    linear-gradient(#fff 0 0);
  -webkit-mask-composite: destination-out;
  mask-composite: exclude;
}


.nav-link {
  @apply items-center h-fit border border-transparent p-2 px-3 sm:text-sm inline-flex font-medium text-white transition-colors rounded-full;
}

.nav-link[aria-current='page'] {
  @apply bg-white/15;
}

.nav-link:hover:not([aria-current='page']) {
    @apply border-white/30;
}
</style>
