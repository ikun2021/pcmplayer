<script setup lang="ts">
import { BLOG_POSTS, getPostBySlug } from '~/utils/blog-data'

const localePath = useLocalePath()
const route = useRoute()
const slug = route.params.slug as string

const post = getPostBySlug(slug) || {
  title: 'Blog Post Not Found',
  date: '--',
  author: '--',
  category: 'System',
  image: '',
  body: '<p>Sorry, the content you are looking for does not exist yet.</p>'
}

// Find neighbors for navigation
const currentIndex = BLOG_POSTS.findIndex(p => p.slug === slug)
const nextPost = currentIndex > 0 ? BLOG_POSTS[currentIndex - 1] : null
const prevPost = currentIndex < BLOG_POSTS.length - 1 ? BLOG_POSTS[currentIndex + 1] : null

useSeoMeta({
  title: `${post.title} - audio-converters Blog`,
  description: post.title
})
</script>

<template>
  <UContainer class="py-12 max-w-4xl">
    <div class="mb-12 flex items-center justify-between">
      <NuxtLink :to="localePath('/blog')" class="group flex items-center gap-2 text-sm font-medium text-gray-500 hover:text-blue-600 transition-colors">
        <UIcon name="i-heroicons-arrow-left" class="transition-transform group-hover:-translate-x-1" />
        Back to Engineering Blog
      </NuxtLink>
      
      <div class="hidden sm:flex items-center gap-2 text-xs text-gray-400 font-medium uppercase tracking-widest">
        <span>Blog</span>
        <UIcon name="i-heroicons-chevron-right" />
        <span class="text-gray-900 truncate max-w-[200px]">{{ post.title }}</span>
      </div>
    </div>

    <article class="prose prose-slate max-w-none">
      <header class="mb-16">
        <div class="flex items-center gap-3 mb-6">
          <UBadge color="info" variant="soft" size="md" class="rounded-full px-4">{{ post.category }}</UBadge>
          <span class="text-sm font-medium text-gray-400">{{ post.date }}</span>
        </div>
        
        <h1 class="text-5xl font-extrabold text-gray-900 mb-8 tracking-tight leading-[1.1]">{{ post.title }}</h1>
        
        <div class="flex items-center gap-4 py-6 border-y border-gray-100 mb-12">
          <UAvatar :alt="post.author" size="sm" />
          <div class="flex flex-col">
            <span class="text-sm font-bold text-gray-900">{{ post.author }}</span>
            <span class="text-xs text-gray-500">Audio Engineering Specialist</span>
          </div>
        </div>

        <div v-if="post.image" class="relative group aspect-video overflow-hidden rounded-3xl ring-1 ring-gray-100 shadow-2xl mb-16">
          <img :src="post.image" :alt="post.title" class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
          <div class="absolute inset-0 bg-linear-to-t from-gray-900/20 to-transparent"></div>
        </div>
      </header>

      <div class="text-gray-700 prose-lg prose-blue leading-relaxed max-w-3xl mx-auto" v-html="post.body"></div>

      <!-- Decorative Section -->
      <div class="my-20 flex flex-col items-center gap-6 py-12 bg-gray-50 rounded-4xl -mx-4 sm:-mx-8">
        <img src="/images/blog/wave.png" alt="Decorative Wave" class="w-32 h-auto opacity-20 grayscale" />
        <p class="text-gray-400 text-sm font-medium italic">Thanks for reading our technical deep-dive!</p>
      </div>

      <!-- Article Navigation -->
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-20 pt-12 border-t border-gray-100">
        <NuxtLink v-if="prevPost" :to="localePath(`/blog/${prevPost.slug}`)" class="group p-6 rounded-3xl bg-gray-50 hover:bg-white hover:ring-1 hover:ring-blue-100 transition-all">
          <span class="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2 block">Previous Article</span>
          <span class="text-lg font-bold text-gray-900 group-hover:text-blue-600 line-clamp-2">{{ prevPost.title }}</span>
        </NuxtLink>
        <div v-else></div>

        <NuxtLink v-if="nextPost" :to="localePath(`/blog/${nextPost.slug}`)" class="group p-6 rounded-3xl bg-gray-50 hover:bg-white hover:ring-1 hover:ring-blue-100 transition-all text-right">
          <span class="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2 block">Next Article</span>
          <span class="text-lg font-bold text-gray-900 group-hover:text-blue-600 line-clamp-2">{{ nextPost.title }}</span>
        </NuxtLink>
      </div>
    </article>

    <div class="mt-20 pt-12 border-t border-gray-100 flex flex-col sm:flex-row justify-between items-center gap-8">
      <div class="flex items-center gap-4">
        <span class="text-sm font-bold text-gray-500">Share this insight:</span>
        <div class="flex gap-2">
          <UButton color="neutral" variant="subtle" icon="i-simple-icons-x" size="md" class="rounded-full" />
          <UButton color="neutral" variant="subtle" icon="i-simple-icons-linkedin" size="md" class="rounded-full" />
          <UButton color="neutral" variant="subtle" icon="i-heroicons-envelope" size="md" class="rounded-full" />
        </div>
      </div>
      
      <NuxtLink :to="localePath('/blog')" class="text-sm font-bold text-blue-600 hover:underline">
        View All 20+ Articles
      </NuxtLink>
    </div>
  </UContainer>
</template>

<style scoped>
:deep(h2) {
  font-size: 2rem;
  line-height: 2.25rem;
  font-weight: 800;
  color: #111827;
  margin-top: 4rem;
  margin-bottom: 1.5rem;
  letter-spacing: -0.01em;
}
:deep(p) {
  font-size: 1.125rem;
  line-height: 1.8;
  color: #374151;
  margin-bottom: 1.75rem;
}
:deep(strong) {
  color: #111827;
  font-weight: 700;
}
:deep(ul), :deep(ol) {
  margin-bottom: 2rem;
}
:deep(li) {
  margin-bottom: 0.75rem;
}
</style>

