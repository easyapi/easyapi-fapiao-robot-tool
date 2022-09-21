import { defineNuxtPlugin } from '#app'

import ElementPlus from 'element-plus/dist/index.full.min.js'
export default defineNuxtPlugin(nuxtApp => {
  nuxtApp.vueApp.use(ElementPlus)
})
