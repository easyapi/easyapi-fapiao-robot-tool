import { defineNuxtConfig } from 'nuxt/config'

// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  meta: {
    title: '接口测试工具 - EasyAPI开票机器人',
    meta: [
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'keywords', name: 'keywords', content: '接口测试工具, EasyAPI开票机器人' }
    ]
  },
  router: {
    base: '/'
  },
  modules: ['nuxt-element-plus-module'],
  buildModules: ['@pinia/nuxt'],

  css: ['~/assets/css/tailwind.css', 'element-plus/dist/index.css', '~/assets/css/page.css'],
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
