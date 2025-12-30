<template>
  <div class="relative">
    <button
      :class="[
        'flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition-colors',
        currentValue ? 'bg-blue-600 text-white' : 'bg-gray-600 text-gray-300 hover:bg-gray-500',
      ]"
      @click="toggleDropdown">
      <span>{{ label }}</span>
      <Icon name="heroicons:chevron-down" class="h-4 w-4" />
    </button>

    <div v-if="isDropdownOpen" class="absolute right-0 z-10 mt-2 w-48 overflow-hidden rounded-lg bg-gray-700 shadow-lg">
      <button
        v-for="option in options"
        :key="option.value"
        :class="[
          'w-full px-4 py-2 text-left text-sm transition-colors',
          currentValue === option.value ? 'bg-blue-600 text-white' : 'text-gray-300 hover:bg-gray-600',
        ]"
        @click="selectOption(option.value)">
        {{ option.label }}
      </button>
      <button
        v-if="currentValue"
        class="w-full border-t border-gray-600 px-4 py-2 text-left text-sm text-gray-300 transition-colors hover:bg-gray-600"
        @click="clearSelection">
        Réinitialiser
      </button>
    </div>
  </div>
</template>

<script setup lang="ts" generic="T extends PropertyKey">
import { onMounted } from 'vue'

interface FilterOption<T> {
  value: T
  label: string
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

const isDropdownOpen = ref(false)

const selectOption = (value: T): void => {
  emit('select', value)
  isDropdownOpen.value = false
}

const clearSelection = (): void => {
  emit('clear')
  isDropdownOpen.value = false
}

const toggleDropdown = (): void => {
  isDropdownOpen.value = !isDropdownOpen.value
}

onMounted(() => {
  document.addEventListener('click', (e) => {
    const target = e.target as HTMLElement
    if (!target.closest('.relative')) {
      isDropdownOpen.value = false
    }
  })
})
</script>
