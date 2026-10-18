<script setup lang="ts">
const localePath = useLocalePath()

useSeoMeta({
  title: 'Terms of Service - audio-converters',
  description: 'Terms of Service for audio-converters. Please read these terms carefully before using our services.'
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
          <h1 class="text-3xl font-bold text-gray-900">Terms of Service</h1>
          <p class="text-sm text-gray-400 mt-2">Last updated: March 12, 2026</p>
        </div>

        <section class="space-y-4">
          <h2 class="text-xl font-semibold text-gray-800">1. Acceptance of Terms</h2>
          <p class="text-gray-600 leading-relaxed">
            By accessing and using WebAudio Master, you agree to be bound by these Terms of Service. If you do not agree to all of these terms, do not use our services.
          </p>
        </section>

        <section class="space-y-4">
          <h2 class="text-xl font-semibold text-gray-800">2. Description of Service</h2>
          <p class="text-gray-600 leading-relaxed">
            WebAudio Master provides in-browser audio conversion and recording tools. Our service uses WebAssembly (FFmpeg-WASM) to process audio files locally on your device.
          </p>
        </section>

        <section class="space-y-4">
          <h2 class="text-xl font-semibold text-gray-800">3. User Obligations</h2>
          <p class="text-gray-600 leading-relaxed">
            You are responsible for all audio content you process using our tools. You must ensure that you have the right to process and convert the audio files you use. You agree not to use our service for any illegal purposes or to infringe upon the intellectual property rights of others.
          </p>
        </section>

        <section class="space-y-4">
          <h2 class="text-xl font-semibold text-gray-800">4. Processing and Privacy</h2>
          <p class="text-gray-600 leading-relaxed">
            As stated in our Privacy Policy, we prioritize your data privacy. Most processing occurs locally. For services requiring server-side processing, files are handled temporarily and deleted immediately after use.
          </p>
        </section>

        <section class="space-y-4">
          <h2 class="text-xl font-semibold text-gray-800">5. Disclaimer of Warranties</h2>
          <p class="text-gray-600 leading-relaxed">
            WebAudio Master is provided "as is" without warranty of any kind. We do not guarantee that the service will be uninterrupted or error-free.
          </p>
        </section>

        <section class="space-y-4 border-t border-gray-100 pt-8">
          <h2 class="text-xl font-semibold text-gray-800">6. Limitation of Liability</h2>
          <p class="text-gray-600 leading-relaxed">
            In no event shall WebAudio Master be liable for any damages arising out of the use or inability to use our services.
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
