<template>
  <div>
    <div class="relative pb-4">
      <span v-if="!props.last" class="absolute left-6 top-5 -ml-px h-full w-0.5 bg-gray-400" />
      <div class="relative flex items-start items-center space-x-3">
        <div>
          <div class="relative px-1">
            <div class="flex h-10 w-10 items-center justify-center rounded-full bg-gray-700">
              <font-awesome-icon icon="fa-solid fa-comment" class="text-white" />
            </div>
          </div>
        </div>
        <div class="min-w-0 flex-1 py-0">
          <div class="text-sm leading-8 text-white">
            {{ props.log }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  log: {
    type: String,
    required: true,
  },
  last: {
    type: Boolean,
    required: false,
    default: false,
  },
});
</script>

<style scoped></style>
