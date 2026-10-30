<template>
    <Button v-if="stats" class="absolute top-full group border overflow-hidden border-foreground/20 transition-colors shadow-inner backdrop-blur-lg border-t-transparent py-1 px-3 rounded-b-md text-foreground text-sm left-1/2 w-max -translate-x-1/2 animate-in fade-in duration-300" :class="copied ? 'bg-green-600/70 hover:bg-green-600/50' : 'bg-black/30 hover:bg-black/50'" @click="copy()">
        <Icon name="selfhst:minecraft" size="18" class="mr-1 mb-0.5 group-hover:scale-200 group-hover:-translate-x-3 transition-transform" />
        {{ label }}
    </Button>
</template>

<script setup>
import { useClipboard } from '@vueuse/core'
import { SERVER_IP } from '~/tools/seo'

const { t } = useI18n()
const { stats, playersOnline } = useServerStats({ poll: 15_000 })

const { copy, copied } = useClipboard({ source: SERVER_IP, copiedDuring: 2000 })

const label = computed(() => {
  if (copied.value) return t('buttons.ipCopied')
  return playersOnline.value > 0 ? t('buttons.joinConnectedPlayers', { count: playersOnline.value }) : t('buttons.joinServer')
})
</script>
