<template>
  <input
    :value="props.modelValue"
    :placeholder="props.placeholder"
    class="h-10 w-full rounded-lg border border-gray-400 bg-gray-600 pl-4 text-sm text-white focus:outline-none"
    @input="onInput"
    @keyup="onKeyUp" />
</template>

<script setup lang="ts">
const props = defineProps({
  placeholder: {
    type: String,
    required: true,
  },
  modelValue: {
    type: String,
    required: true,
  },
});

const emit = defineEmits(['update:modelValue', 'keyup']);

const onInput = (event: Event): void => {
  const input = event.target as HTMLInputElement;
  return emit('update:modelValue', input.value);
};

const onKeyUp = (event: KeyboardEvent): void => {
  return emit('keyup', event);
};
</script>
