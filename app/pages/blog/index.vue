<script setup lang="ts">
import { BLOG_POSTS } from '~/utils/blog-data'

const localePath = useLocalePath()
const page = ref(1)
const pageSize = 6
const total = BLOG_POSTS.length

const paginatedPosts = computed(() => {
  const start = (page.value - 1) * pageSize
  return BLOG_POSTS.slice(start, start + pageSize)
})

useSeoMeta({
  title: 'Engineering Blog - audio-converters',
  description: 'Learn about audio engineering, digital signal processing, and more on our blog.'
})
</script>

<template>
  <UContainer class="py-12 max-w-6xl">
    <div class="mb-16 text-center">
      <NuxtLink :to="localePath('/')" class="inline-flex items-center gap-1 text-sm text-gray-400 hover:text-blue-600 transition-colors mb-6">
        <UIcon name="i-heroicons-arrow-left" />
        Back to Home
      </NuxtLink>
      <h1 class="text-5xl font-extrabold text-gray-900 mb-6 tracking-tight">Engineering Blog</h1>
      <p class="text-xl text-gray-500 max-w-2xl mx-auto leading-relaxed">
        Deep dives into audio technology, digital processing, and web development.
      </p>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
      <UCard v-for="post in paginatedPosts" :key="post.slug" class="group flex flex-col h-full hover:shadow-2xl transition-all duration-500 border-none bg-white ring-1 ring-gray-100 overflow-hidden rounded-3xl">
        <template #header>
          <div v-if="post.image" class="aspect-[16/10] -mx-4 -mt-4 mb-4 overflow-hidden bg-gray-50 flex items-center justify-center p-8 border-b border-gray-50 relative">
            <div class="absolute inset-0 bg-linear-to-br from-blue-50/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <img :src="post.image" :alt="post.title" class="max-h-full max-w-full object-contain filter grayscale opacity-60 group-hover:opacity-100 group-hover:grayscale-0 transition-all duration-700 scale-95 group-hover:scale-105" />
          </div>
          
          <div class="flex items-center gap-3 mb-3">
            <UBadge color="info" variant="soft" size="sm" class="rounded-full px-3">{{ post.category }}</UBadge>
            <span class="text-xs font-medium text-gray-400 uppercase tracking-wider">{{ post.date }}</span>
          </div>
          <h2 class="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors line-clamp-2 leading-snug">
            {{ post.title }}
          </h2>
        </template>
        
        <p class="text-gray-600 text-sm leading-relaxed mb-4 grow">
          {{ post.description }}
        </p>

        <template #footer>
          <NuxtLink :to="localePath(`/blog/${post.slug}`)" class="text-sm font-bold text-blue-600 flex items-center gap-2 group/btn transition-all">
            Read Article
            <UIcon name="i-heroicons-arrow-right" class="transition-transform group-hover/btn:translate-x-1" />
          </NuxtLink>
        </template>
      </UCard>
    </div>

    <div class="mt-20 flex flex-col items-center gap-8">
      <UPagination
        v-model:page="page"
        :total="total"
        :items-per-page="pageSize"
        size="lg"
        variant="ghost"
        color="neutral"
        :prev-button="{ color: 'neutral', variant: 'outline', icon: 'i-heroicons-chevron-left' }"
        :next-button="{ color: 'neutral', variant: 'outline', icon: 'i-heroicons-chevron-right', trailing: true }"
      />
      
      <div class="text-center pt-12 border-t border-gray-100 w-full">
         <p class="text-gray-400 text-sm font-medium">Showing {{ (page - 1) * pageSize + 1 }} - {{ Math.min(page * pageSize, total) }} of {{ total }} articles</p>
      </div>
    </div>
  </UContainer>
</template>

