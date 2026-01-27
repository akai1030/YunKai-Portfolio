// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  css: ['~/assets/css/main.scss'],
  modules: ['@tresjs/nuxt'],
  ssr: true,
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          api: 'modern-compiler',
        },
      },
    },
  },
  build: {
    transpile: ['three', 'gsap'],
  },
  routeRules: {
    '/**': {
      headers: {
        'cache-control': 'no-store, no-cache, must-revalidate',
      },
    },
  },
  app: {
    head: {
      link: [
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
        { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;700&family=Space+Mono:ital,wght@0,400;0,700;1,400&display=swap' }
      ]
    }
  },
})
