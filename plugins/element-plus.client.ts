import ElementPlus, { ID_INJECTION_KEY } from 'element-plus'
import 'element-plus/dist/index.css'
import zhCn from 'element-plus/lib/locale/lang/zh-cn'

export default defineNuxtPlugin(({ nuxtApp }) => {
  nuxtApp.provide(ID_INJECTION_KEY, {
    prefix: 0,
    current: 0,
  })
  nuxtApp.use(ElementPlus, {
    locale: zhCn,
  })
})
