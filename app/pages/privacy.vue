<script setup lang="ts">
const localePath = useLocalePath()

useSeoMeta({
  title: 'Privacy Policy - audio-converters',
  description: 'Privacy Policy for audio-converters. We value your privacy and process audio 100% locally.'
})
</script>

<template>
  <UContainer class="py-12 max-w-4xl">
    <UCard>
      <div class="space-y-8 p-4">
        <div class="border-b border-gray-100 pb-6">
          <div class="flex gap-4 mb-4">
            <NuxtLink :to="localePath('/')" class="text-sm text-gray-400 hover:text-gray-600 flex items-center gap-1 transition-colors">
              <UIcon name="i-heroicons-arrow-left" />
              Back to Home
            </NuxtLink>
            <NuxtLink :to="localePath('/blog')" class="text-sm text-gray-400 hover:text-gray-600 flex items-center gap-1 transition-colors">
              <UIcon name="i-heroicons-document-text" />
              Blog
            </NuxtLink>
          </div>
          <h1 class="text-3xl font-bold text-gray-900">Privacy Policy</h1>
          <p class="text-sm text-gray-400 mt-2">Last updated: March 12, 2026</p>
        </div>

        <section class="space-y-4">
          <h2 class="text-xl font-semibold text-gray-800">1. Information We Collect</h2>
          <p class="text-gray-600 leading-relaxed">
            We do not store any of the audio files you upload or record. All audio processing is handled purely in your browser locally using WebAssembly. No audio data ever leaves your device.
          </p>
        </section>

        <section class="space-y-4">
          <h2 class="text-xl font-semibold text-gray-800">2. How We Use Information</h2>
          <p class="text-gray-600 leading-relaxed">
            The processing occurs solely for the purpose of conversion and playback as requested by you. Since it happens locally, we have no access to your content.
          </p>
        </section>

        <section class="space-y-4">
          <h2 class="text-xl font-semibold text-gray-800">3. Data Security</h2>
          <p class="text-gray-600 leading-relaxed">
            Because all processing is client-side, your data is as secure as your own device. We do not transmit your audio files to any servers.
          </p>
        </section>

        <section class="space-y-4">
          <h2 class="text-xl font-semibold text-gray-800">4. Browser Storage</h2>
          <p class="text-gray-600 leading-relaxed">
            We may use local storage in your browser to save your preferences, such as your preferred sample rate. This data remains on your device and is not sent to our servers.
          </p>
        </section>

        <section class="space-y-4">
          <h2 class="text-xl font-semibold text-gray-800">5. Changes to This Policy</h2>
          <p class="text-gray-600 leading-relaxed">
            We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page.
          </p>
        </section>

        <section class="space-y-4 border-t border-gray-100 pt-8">
          <h2 class="text-xl font-semibold text-gray-800">Contact Us</h2>
          <p class="text-gray-600 leading-relaxed">
            If you have any questions about this Privacy Policy, please contact us via our contact page.
          </p>
        </section>
      </div>
    </UCard>
    
    <div class="mt-8 text-center">
      <p class="text-sm text-gray-400">
        &copy; 2026 WebAudio Master. All rights reserved.
      </p>
    </div>
  </UContainer>
</template>
