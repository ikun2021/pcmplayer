<script setup lang="ts">
const { t } = useI18n()
const localePath = useLocalePath()

useSeoMeta({
  title: () => t('landingPcmPlayerTitle'),
  description: () => t('landingPcmPlayerDescription'),
  ogTitle: () => t('landingPcmPlayerTitle'),
  ogDescription: () => t('landingPcmPlayerDescription')
})
</script>

<template>
  <UContainer class="py-12 max-w-4xl">
    <div class="mb-10">
      <NuxtLink :to="localePath('/')" class="inline-flex items-center gap-1 text-sm text-gray-400 hover:text-blue-600 transition-colors mb-6">
        <UIcon name="i-heroicons-arrow-left" />
        {{ t('blogBackHome') }}
      </NuxtLink>
      <h1 class="text-4xl md:text-5xl font-extrabold text-gray-900 tracking-tight mb-4">
        {{ t('landingPcmPlayerH1') }}
      </h1>
      <p class="text-lg text-gray-500 leading-relaxed max-w-3xl">
        {{ t('landingPcmPlayerLead') }}
      </p>
      <div class="mt-8 flex flex-wrap gap-3">
        <UButton :to="localePath('/#audio-toolkit')" color="primary" size="lg" class="rounded-xl" icon="i-heroicons-play-circle">
          {{ t('landingPcmPlayerCta') }}
        </UButton>
        <UButton :to="localePath('/pcm-to-wav')" color="neutral" variant="outline" size="lg" class="rounded-xl">
          {{ t('footerPcmToWav') }}
        </UButton>
      </div>
    </div>

    <div class="grid md:grid-cols-3 gap-6 mb-12">
      <UCard class="rounded-2xl">
        <h2 class="text-lg font-bold text-gray-900 mb-2">{{ t('landingPcmPlayerPoint1Title') }}</h2>
        <p class="text-sm text-gray-600 leading-relaxed">{{ t('landingPcmPlayerPoint1Body') }}</p>
      </UCard>
      <UCard class="rounded-2xl">
        <h2 class="text-lg font-bold text-gray-900 mb-2">{{ t('landingPcmPlayerPoint2Title') }}</h2>
        <p class="text-sm text-gray-600 leading-relaxed">{{ t('landingPcmPlayerPoint2Body') }}</p>
      </UCard>
      <UCard class="rounded-2xl">
        <h2 class="text-lg font-bold text-gray-900 mb-2">{{ t('landingPcmPlayerPoint3Title') }}</h2>
        <p class="text-sm text-gray-600 leading-relaxed">{{ t('landingPcmPlayerPoint3Body') }}</p>
      </UCard>
    </div>

    <div class="rounded-3xl bg-slate-50 border border-slate-100 p-8 text-center">
      <p class="text-gray-600 mb-6">
        {{ t('landingPcmPlayerLead') }}
      </p>
      <UButton :to="localePath('/#audio-toolkit')" color="primary" size="lg" class="rounded-xl">
        {{ t('landingPcmPlayerCta') }}
      </UButton>
    </div>
  </UContainer>
</template>
