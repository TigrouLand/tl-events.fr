<template>
  <img
    :class="(props.type === 'flat' ? 'h-24 w-auto' : 'h-10 w-10 rounded-full') + ` ${props.class}`"
    :src="`https://avatars.tl-events.fr/${props.type === 'flat' ? 'busts' : 'helms'}/` + props.player + '.png'"
    :alt="'Skin de ' + props.player"
    draggable="false" />
</template>

<script setup lang="ts">
const props = defineProps({
  player: {
    type: String,
    required: true,
  },
  class: {
    type: String,
    default: '',
  },
  type: {
    type: String as PropType<'flat' | 'rounded'>,
    default: 'flat',
  },
});
</script>

<style scoped>
img {
  image-rendering: pixelated;
  user-select: none;
}
</style>
