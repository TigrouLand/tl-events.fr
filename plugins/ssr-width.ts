import { provideSSRWidth } from '@vueuse/core'

// provides a fixed SSR width to VueUse to avoid
// hydration mismatches on mobile-end devices
export default defineNuxtPlugin((nuxtApp) => {
  provideSSRWidth(1024, nuxtApp.vueApp)
})
