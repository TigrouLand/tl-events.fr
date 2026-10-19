<template>
  <!-- the layout nav in games route is not mounted since we explicitly declare a non-floating one -->
  <nav
    v-if="route.name.includes('games') !== props.floating"
    :class="cn('custom-borders z-100 mx-auto flex max-w-5xl flex-wrap items-center justify-between rounded-4xl p-2 shadow-2xl', { 'fixed! left-0 right-0 top-8': floating, 'relative mt-4': !floating })"
  >
        <!-- own blur layer so descendants can have working backdrop blur filters -->
        <div class="absolute inset-0 -z-10 rounded-4xl bg-black/30 backdrop-blur-lg" />

        <NuxtImg src="/logo.webp" alt="Logo" draggable="false" class="h-12 rounded-full select-none" />

        <ul
          id="mobile-menu"
          :class="cn('order-3 w-full flex-col gap-1 sm:order-none sm:w-auto sm:flex-row sm:items-center sm:space-x-4 md:ml-6', dropdown ? 'flex' : 'hidden sm:flex')"
        >
          <NuxtLink v-for="navLink in navLinks" :key="navLink.label" :to="navLink.to" class="nav-link">
            <Icon :name="navLink.icon" size="20" /> <span class="ml-2 hidden max-sm:inline lg:inline">{{ $t(navLink.label) }}</span>
          </NuxtLink>
        </ul>

        <div
          id="mobile-social"
          :class="cn('order-4 w-full items-center justify-center gap-4 pb-1 sm:order-none sm:w-auto sm:justify-start sm:gap-0 sm:space-x-4 sm:pb-0', dropdown ? 'flex' : 'hidden sm:flex')"
        >
          <NuxtLink v-for="socialLink in socialLinks" :key="socialLink.label" :href="socialLink.to" target="_blank" rel="noopener noreferrer">
            <Icon :name="socialLink.icon" size="20" class="text-white" />
          </NuxtLink>
          <LangSelector />
        </div>

        <!-- the pill hangs below the bar, where an opened panel would render -->
        <PlayersCount :class="{ 'max-sm:hidden': dropdown }" />

        <div class="order-2 flex items-center sm:order-none sm:hidden">
            <button type="button" class="inline-flex items-center justify-center rounded-md bg-gray-100 p-2 text-primary hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-red-700 focus:ring-offset-2" aria-controls="mobile-menu mobile-social" :aria-expanded="dropdown" @click="dropdown = !dropdown">
                <span class="sr-only">Open main menu</span>
                <svg class="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
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
import { useRoute } from 'vue-router'
import { navLinks, socialLinks } from '~/tools/seo'
import PlayersCount from './PlayersCount.vue'

const route = useRoute()

const props = defineProps({
  floating: { type: Boolean, default: true }
})

const dropdown = ref(false)

// the panel overlays the page while the bar is fixed: it must not survive a navigation
watch(
  () => route.fullPath,
  () => {
    dropdown.value = false
  }
)
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
