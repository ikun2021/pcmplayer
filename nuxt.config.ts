// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },

  // Required for ffmpeg.wasm SharedArrayBuffer support
  vite: {
    server: {
      headers: {
        'Cross-Origin-Opener-Policy': 'same-origin',
        'Cross-Origin-Embedder-Policy': 'require-corp',
      },
    },
    optimizeDeps: {
      exclude: ['@ffmpeg/ffmpeg', '@ffmpeg/util'],
    },
  },

  nitro: {
    prerender: {
      routes: ['/sitemap.xml']
    },
    routeRules: {
      '/**': {
        headers: {
          'Cross-Origin-Opener-Policy': 'same-origin',
          'Cross-Origin-Embedder-Policy': 'require-corp',
        },
      },
    },
  },
  site: {
    url: 'https://audio-converters.net',
    name: 'audio-converters - Professional PCM Audio Tools',
    description: 'Professional online PCM player and audio converter powered by WebAssembly. Supporting PCM, MP3, WAV, and OPUS.'
  },
  app: {
    head: {
      htmlAttrs: {
        lang: 'en'
      },
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'google-adsense-account', content: 'ca-pub-2272817394393914' },
        { name: 'robots', content: 'index, follow' }
      ],
      link: [
        { rel: 'icon', type: 'image/svg+xml', href: '/logo.svg' },
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
        { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Geist:wght@100..900&display=swap' }
      ],
      script: [
        {
          src: 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-2272817394393914',
          async: true,
          crossorigin: 'anonymous'
        }
      ]
    }
  },
  modules: ['@nuxt/ui', '@nuxtjs/i18n'],
  i18n: {
    locales: [
      { code: 'en', name: 'English', language: 'en-US' },
      { code: 'zh', name: '中文', language: 'zh-CN' },
      { code: 'ja', name: '日本語', language: 'ja-JP' },
      { code: 'ko', name: '한국어', language: 'ko-KR' }
    ],
    defaultLocale: 'en',
    strategy: 'prefix_and_default',
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: 'i18n_redirected',
      redirectOn: 'root'
    }
  },
  ui: {
    fonts: false
  },
  css: ['~/assets/css/main.css']
})
