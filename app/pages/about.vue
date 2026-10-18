<script setup lang="ts">
const localePath = useLocalePath()

useSeoMeta({
  title: 'About audio-converters - Online PCM Player & Audio Converter',
  description: 'Learn about audio-converters, a privacy-first online PCM player and audio converter for raw PCM, WAV, MP3, and Opus. Play headerless PCM files and convert formats entirely in your browser.'
})
</script>

<template>
  <UContainer class="py-12 max-w-4xl">
    <UCard>
      <div class="space-y-8 p-4">
        <div class="flex gap-4 mb-2">
          <NuxtLink :to="localePath('/')" class="text-sm text-gray-400 hover:text-gray-600 flex items-center gap-1 transition-colors">
            <UIcon name="i-heroicons-arrow-left" />
            Back to Home
          </NuxtLink>
        </div>
        <div class="border-b border-gray-100 pb-6 text-center">
          <h1 class="text-4xl font-bold text-gray-900">About Our Online PCM Player & Audio Converter</h1>
          <p class="text-lg text-gray-500 mt-4 leading-relaxed">
            audio-converters helps engineers and creators play raw PCM, convert audio formats, and process recordings privately in the browser.
          </p>
        </div>

        <section class="space-y-4">
          <h2 class="text-2xl font-semibold text-gray-800">Our Mission</h2>
          <p class="text-gray-600 leading-relaxed text-lg">
            audio-converters was founded to simplify digital audio workflows. Whether you need an online PCM player for headerless .pcm/.raw dumps or an audio converter for WAV, MP3, and Opus, everything runs locally in your browser with no server uploads.
          </p>
        </section>

        <section class="grid grid-cols-1 md:grid-cols-2 gap-8 py-8 border-y border-gray-50">
          <div class="space-y-2">
            <h3 class="text-xl font-bold text-gray-800 flex items-center gap-2">
              <UIcon name="i-heroicons-bolt-solid" class="text-yellow-500" />
              High Performance
            </h3>
            <p class="text-gray-500">
              Leveraging WebAudio and modern encoding backends to deliver lightning-fast responses.
            </p>
          </div>
          <div class="space-y-2">
            <h3 class="text-xl font-bold text-gray-800 flex items-center gap-2">
              <UIcon name="i-heroicons-shield-check-solid" class="text-green-500" />
              Privacy First
            </h3>
            <p class="text-gray-500">
              Your files stay on your device whenever possible. We never store your audio data.
            </p>
          </div>
          <div class="space-y-2">
            <h3 class="text-xl font-bold text-gray-800 flex items-center gap-2">
              <UIcon name="i-heroicons-code-bracket-solid" class="text-blue-500" />
              Format Versatility
            </h3>
            <p class="text-gray-500">
              Comprehensive support for PCM, RAW, WAV, MP3, and OPUS across all standard sample rates.
            </p>
          </div>
          <div class="space-y-2">
            <h3 class="text-xl font-bold text-gray-800 flex items-center gap-2">
              <UIcon name="i-heroicons-device-phone-mobile-solid" class="text-purple-500" />
              Modern Design
            </h3>
            <p class="text-gray-500">
              A clean, responsive interface designed for productivity on any device.
            </p>
          </div>
        </section>

        <section class="space-y-4 pt-4">
          <h2 class="text-2xl font-semibold text-gray-800">Technology Stack</h2>
          <p class="text-gray-600 leading-relaxed">
            We use cutting-edge technology including Nuxt 4, Vue.js 3, and WebAudio API to ensure a seamless and robust experience. Our conversion engine is powered by optimized Go backends for maximum reliability.
          </p>
        </section>

        <div class="pt-8 flex flex-wrap items-center justify-center gap-3">
          <UButton :to="localePath('/pcm-player')" color="primary" shadow="md" size="lg" icon="i-heroicons-play-circle">
            Open Online PCM Player
          </UButton>
          <UButton :to="localePath('/pcm-to-wav')" color="neutral" variant="outline" size="lg">
            PCM to WAV Converter
          </UButton>
        </div>
      </div>
    </UCard>
  </UContainer>
</template>
