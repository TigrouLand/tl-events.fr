<template>
  <div>
    <div class="relative pb-4">
      <span v-if="!last" class="absolute top-5 left-6 -ml-px h-full w-0.5 bg-gray-400" />
      <div class="relative flex items-start space-x-3 items-center">
        <div>
          <div class="relative px-1">
            <div class="h-10 w-10 bg-gray-700 rounded-full flex items-center justify-center">
              <font-awesome-icon icon="fa-solid fa-comment" class="text-white" />
            </div>
          </div>
        </div>
        <div class="min-w-0 flex-1 py-0">
          <div class="text-sm leading-8 text-white">
            {{ log }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default defineComponent({
  name: 'GameLog',
  props: ['log', 'last']
});
</script>

<style scoped>

</style>
