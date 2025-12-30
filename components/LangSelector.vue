<template>
  <div :class="['relative', props.class]">
    <button
      :class="['flex items-center px-3 py-1.5 rounded-lg border border-gray-400 bg-gray-600 text-sm text-white hover:bg-gray-500 transition-colors']"
      @click="isOpen = !isOpen">
      <Icon :name="getFlagIcon(currentLocale)" class="mr-2 h-4 w-4" />
      {{ currentLocaleName }}
      <Icon name="mdi:chevron-down" class="ml-2 h-4 w-4 transition-transform" :class="{ 'rotate-180': isOpen }" />
    </button>

    <div v-if="isOpen" class="absolute right-0 mt-1 w-32 rounded-lg border border-gray-400 bg-gray-600 shadow-lg">
      <button
        v-for="localeOption in locales"
        :key="localeOption.code"
        :class="[
          'w-full px-3 py-2 text-left text-sm hover:bg-gray-500 transition-colors flex items-center',
          currentLocale === localeOption.code ? 'text-white bg-gray-500' : 'text-gray-300'
        ]"
        @click="selectLocale(localeOption.code)">
        <Icon :name="getFlagIcon(localeOption.code)" class="mr-2 h-4 w-4" />
        {{ localeOption.name }}
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  class: { type: String, default: '' }
})

const { locale, locales, setLocale } = useI18n()
const isOpen = ref(false)

const currentLocale = computed(() => locale.value)
const currentLocaleName = computed(() => {
  const current = locales.value.find((l) => l.code === currentLocale.value)
  return current?.name || 'Français'
})

const selectLocale = (localeCode: string) => {
  setLocale(localeCode as 'fr' | 'en')
  isOpen.value = false
}

const getFlagIcon = (localeCode: string) => {
  switch (localeCode) {
    case 'fr':
      return 'twemoji:flag-france'
    case 'en':
      return 'twemoji:flag-united-kingdom'
    default:
      return 'twemoji:flag-united-states'
  }
}

// Close dropdown when clicking outside
onMounted(() => {
  const handleClickOutside = (event: MouseEvent) => {
    const target = event.target as HTMLElement
    if (!target.closest('.relative')) {
      isOpen.value = false
    }
  }
  document.addEventListener('click', handleClickOutside)
  onUnmounted(() => {
    document.removeEventListener('click', handleClickOutside)
  })
})
</script>

<style scoped>
.rotate-180 {
  transform: rotate(180deg);
}
</style>
