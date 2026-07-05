<template>
  <Select
    :model-value="currentValue !== null ? String(currentValue) : undefined"
    @update:model-value="handleSelect">
    <SelectTrigger>
      <Icon name="heroicons:funnel" class="size-4 shrink-0" />
      <SelectValue :placeholder="label" />
    </SelectTrigger>
    <SelectContent>
      <SelectItem
        v-for="option in options"
        :key="String(option.value)"
        :value="String(option.value)">
        <Icon v-if="option.icon" :name="option.icon" class="size-4" />
        {{ option.label }}
      </SelectItem>
      <SelectSeparator v-if="currentValue !== null" />
      <SelectItem v-if="currentValue !== null" value="__clear__">
        {{ $t('filters.clear') }}
      </SelectItem>
    </SelectContent>
  </Select>
</template>

<script setup lang="ts" generic="T extends PropertyKey">
import { Select, SelectContent, SelectItem, SelectSeparator, SelectTrigger, SelectValue } from '~/components/ui/select'

interface FilterOption<T> {
  value: T
  label: string
  icon?: string
}

const { label, options, currentValue } = defineProps<{
  label: string
  options: FilterOption<T>[]
  currentValue: T | null
}>()

const emit = defineEmits<{
  select: [value: T]
  clear: []
}>()

const handleSelect = (value: string): void => {
  if (value === '__clear__') {
    emit('clear')
    return
  }
  const option = options.find(o => String(o.value) === value)
  if (option) emit('select', option.value)
}
</script>
