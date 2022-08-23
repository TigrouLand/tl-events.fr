<template>
  <div class="max-w-7xl mx-auto sm:px-6 lg:px-8 py-10">
    <div class="pt-2 relative mx-auto text-white space-y-4 px-5 lg:px-0 mb-7">
      <input
        v-model="search"
        class="border border-gray-400 bg-gray-600 h-10 px-5 pr-16 rounded-lg text-sm focus:outline-none w-full"
        placeholder="Rechercher par scénario ..."
        @keyup="searchModifiers"
      >
    </div>
    <ul class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 mx-5 lg:mx-0">
      <ModifierCard v-for="modifier in displayedModifiers" :key="modifier._id" :modifier="modifier" />
    </ul>
  </div>
</template>

<script>
import Levenshtein from 'levenshtein';
export default defineComponent({
  async setup () {
    const { data: modifiers } = await useFetch('https://api.tl-events.fr/modifiers');
    return { modifiers };
  },
  data () {
    return {
      displayedModifiers: [],
      search: null
    };
  },
  mounted () {
    this.displayedModifiers = this.modifiers;
  },
  methods: {
    searchModifiers () {
      if (!this.search) {
        this.displayedModifiers = this.modifiers;
        return;
      }
      const search = this.search.toLowerCase();
      this.displayedModifiers = this.modifiers.filter(modifier => modifier.name.toLowerCase().startsWith(search) || new Levenshtein(modifier.name.toLowerCase(), search).distance < 5);
    }
  }
});
</script>
