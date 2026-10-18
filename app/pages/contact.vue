<script setup lang="ts">
const localePath = useLocalePath()

useSeoMeta({
  title: 'Contact Us - audio-converters',
  description: 'Get in touch with the audio-converters team for support, feedback, or inquiries.'
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
          <h1 class="text-3xl font-bold text-gray-900">Contact Us</h1>
          <p class="text-sm text-gray-400 mt-2">Have questions or feedback? We'd love to hear from you.</p>
        </div>

        <div class="max-w-2xl">
          <section class="space-y-12">
            <div class="space-y-4">
              <h2 class="text-xl font-semibold text-gray-800 uppercase tracking-wider">Support</h2>
              <p class="text-gray-600 leading-relaxed text-lg">
                Check out our FAQ section on the homepage for quick answers to common questions about PCM playback and audio conversion.
              </p>
            </div>

            <div class="space-y-4">
              <h2 class="text-xl font-semibold text-gray-800 uppercase tracking-wider">Email Support</h2>
              <p class="text-gray-600 leading-relaxed text-lg">
                For business inquiries, technical support, or feedback, you can reach our engineering team directly at:
                <br />
                <a href="mailto:support@audio-converters.net" class="text-blue-600 hover:underline font-bold mt-2 inline-block">support@audio-converters.net</a>
              </p>
            </div>
          </section>
        </div>
      </div>
    </UCard>
    
    <div class="mt-8 text-center">
      <p class="text-sm text-gray-400">
        &copy; 2026 WebAudio Master. All rights reserved.
      </p>
    </div>
  </UContainer>
</template>
