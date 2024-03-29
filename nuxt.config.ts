const lifecycle = process.env.npm_lifecycle_event

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: ['@nuxtjs/tailwindcss', '@element-plus/nuxt',
    ['@pinia/nuxt', {
      autoImports: [
      // automatically imports `defineStore`
        'defineStore', // import { defineStore } from 'pinia'
        // automatically imports `defineStore` as `definePiniaStore`
        ['defineStore', 'definePiniaStore'], // import { defineStore as definePiniaStore } from 'pinia'
      ],
    }]],
  build: {
    transpile: lifecycle === 'build' ? ['element-plus'] : [],
  },
  css: ['~/assets/css/page.css'],
  components: true,
  vite: {
    build: {
      chunkSizeWarningLimit: 4096,
      rollupOptions: {
        output: {},
      },
    },
  },
  runtimeConfig: {
    public: {
      baseUrl: process.env.NUXT_PUBLIC_BASE_URL,
      serviceUrl: process.env.NUXT_PUBLIC_SERVICE_URL,
      accountUrl: process.env.NUXT_PUBLIC_ACCOUNT_URL,
    },
  },
})
