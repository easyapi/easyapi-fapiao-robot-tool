import { defineNuxtConfig } from 'nuxt'

// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  router: {
    base: '/'
  },
  buildModules: ['@pinia/nuxt'],

  css: ['~/assets/css/tailwind.css', 'element-plus/dist/index.css'],
  build: {
    postcss: {
      postcssOptions: {
        plugins: {
          tailwindcss: {},
          autoprefixer: {}
        }
      }
    }
  },
  vite: {
    build: {
      chunkSizeWarningLimit: 4096
    }
  }
})
