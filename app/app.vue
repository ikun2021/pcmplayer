<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { useHead } from '#app'

const { locale } = useI18n()

const lang = computed(() => {
  switch (locale.value) {
    case 'zh': return 'zh-CN'
    case 'ja': return 'ja-JP'
    case 'ko': return 'ko-KR'
    default: return 'en'
  }
})

useHead({
  htmlAttrs: {
    lang
  },
  meta: [
    { name: 'google-adsense-account', content: 'ca-pub-2272817394393914' }
  ]
})
</script>

<template>
  <UApp>
    <NuxtPage />
  </UApp>
</template>
