<template>
    <div v-if="pending && !data" class="mc-status__loading">
      Loading
    </div>

    <div v-else-if="error">
      ❌ Could not reach the server: {{ error.message }}
    </div>

    {{ t('buttons.joinServer', { count: onlinePlayers }) }}
</template>

<script setup>
import { onMounted, onBeforeUnmount } from 'vue'
import { SERVER_IP } from '~/tools/seo'

const { t } = useI18n()

const { data, pending, error, refresh } = useFetch(
  `https://api.mcsrvstat.us/3/${SERVER_IP}`,
  { server: false, lazy: true }
)

// const isOnline = computed(() => data.value?.online ?? false)
const onlinePlayers = computed(() => data.value?.players?.online ?? 0)

let intervalId = null

onMounted(() => {
  // updates players' count every 5 seconds by refetching
  intervalId = setInterval(refresh, 5000)
})

onBeforeUnmount(() => {
  clearInterval(intervalId)
})
</script>