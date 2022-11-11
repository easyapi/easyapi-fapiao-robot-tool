import { defineNuxtConfig } from 'nuxt/config'

// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  buildModules: ['@pinia/nuxt'],
  modules: ['@nuxtjs/tailwindcss'],

  css: ['element-plus/dist/index.css', '~/assets/css/page.css'],
  build: {},
  vite: {
    build: {
      chunkSizeWarningLimit: 4096
    }
  }
})
