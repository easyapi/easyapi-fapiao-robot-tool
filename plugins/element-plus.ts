import { defineNuxtPlugin } from '#app'

import ElementPlus from 'element-plus'
import { ID_INJECTION_KEY } from 'element-plus'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import zhCn from 'element-plus/es/locale/lang/zh-cn'

export default defineNuxtPlugin(nuxtApp => {
  if (process.client) {
    const app = nuxtApp.vueApp
    app
      .provide(ID_INJECTION_KEY, {
        prefix: Math.floor(Math.random() * 10000),
        current: 0
      })
      .use(ElementPlus, {
        size: 'small',
        locale: zhCn
      })

    for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
      if (key === 'Link') {
        continue
      }
      app.component(key, component)
    }
  }
})
