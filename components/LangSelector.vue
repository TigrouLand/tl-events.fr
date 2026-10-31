<template>
  <Select class="bg-none outline-none" :model-value="currentLocale" @update:model-value="(v) => setLocale(v as Lang)">
    <SelectTrigger :aria-label="t('buttons.language', { name: currentLocaleName })" :class="cn('border-none bg-transparent!', props.class)">
      <Icon :name="getFlagIcon(currentLocale)" />
    </SelectTrigger>
    <SelectContent class="z-100 bg-background/50 backdrop-blur-lg">
      <SelectItem
        class="rounded-none! focus:bg-white/10!"
        v-for="localeOption in locales"
        :key="localeOption.code"
        :value="localeOption.code">
        <Icon :name="getFlagIcon(localeOption.code)" />
        {{ localeOption.name }}
      </SelectItem>
    </SelectContent>
  </Select>
</template>

<script setup lang="ts">
import { Select, SelectContent, SelectItem, SelectTrigger } from '~/components/ui/select'
import { getFlagIcon, type Lang, SUPPORTED_LANGS } from '~/tools/i18n'

const props = defineProps({
  class: { type: String, default: '' }
})

const { locale, locales, setLocale, t } = useI18n()

const currentLocale = computed(() => locale.value)
const currentLocaleName = computed(() => SUPPORTED_LANGS[currentLocale.value as Lang])
</script>
