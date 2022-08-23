<template>
  <div class="max-w-7xl mx-auto sm:px-6 lg:px-8 py-10">
    <div class="pt-2 relative mx-auto text-white space-y-4 px-5 lg:px-0 mb-7">
      <input
        v-model="search"
        class="border border-gray-400 bg-gray-600 h-10 px-5 pr-16 rounded-lg text-sm focus:outline-none w-full"
        placeholder="Rechercher par pseudonyme ..."
        @keyup="searchPlayers"
      >
    </div>
    <ul class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 mx-5 lg:mx-0">
      <PlayerCard v-for="member in displayedMembers" :key="member._id" :player="member" />
    </ul>
  </div>
</template>

<script>
import Levenshtein from 'levenshtein';
export default defineComponent({
  async setup () {
    const { data: members } = await useFetch('https://api.tl-events.fr/members');
    return { members };
  },
  data () {
    return {
      displayedMembers: [],
      search: null
    };
  },
  mounted () {
    this.displayedMembers = this.members;
  },
  methods: {
    searchPlayers () {
      if (!this.search) {
        this.displayedMembers = this.members;
        return;
      }
      const search = this.search.toLowerCase();
      this.displayedMembers = this.members.filter(member => member.name.toLowerCase().startsWith(search) || new Levenshtein(member.name.toLowerCase(), search).distance < 5);
    }
  }
});
</script>
