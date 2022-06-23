<template>
  <li class="col-span-1 bg-gray-700 border border-gray-500 rounded shadow divide-y divide-gray-200">
    <div class="w-full flex items-center justify-between">
      <img class="h-24 p-2 m-4 w-auto" :src="require(`~/assets/${modifier.material.toLowerCase()}.png`)" :alt="modifier.material">
      <div class="flex-1 truncate py-6">
        <div class="flex items-center space-x-1">
          <h3 class="text-white font-medium truncate mr-2">
            {{ modifier.name }}
          </h3>
          <ActiveBadge v-if="showStatus" :active="modifier.enabled" />
        </div>
        <p class="mt-1 text-white text-sm" v-html="getDescription(modifier)" />
      </div>
    </div>
  </li>
</template>

<script>
import ActiveBadge from './ActiveBadge';

export default {
  name: 'ModifierCard',
  components: { ActiveBadge },
  props: ['modifier', 'showStatus'],
  methods: {
    getDescription(modifier) {
      const desc = modifier.web || modifier.description;
      let computed = desc.join('<br>');
      computed = computed.replace(/§./g, '');
      return computed.replace(/\(.+\)/g, '');
    }
  }
};
</script>

<style scoped>

</style>
