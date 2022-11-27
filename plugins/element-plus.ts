import { ID_INJECTION_KEY } from 'element-plus'
import 'element-plus/dist/index.css'

export default defineNuxtPlugin(({ vueApp }) => {
  vueApp.provide(ID_INJECTION_KEY, {
    prefix: 0,
    current: 0,
  })
})
