<template>
  <div v-show="store.showLogin" class="modal-show flex items-center w-full h-full fixed top-0 left-0 z-40 bg-gray-500 opacity-100 justify-center">
    <div v-show="!isRegister" class="modal-content bg-white w-80 pt-12 p-4 relative rounded-md">
      <span class="cursor-pointer right-0 top-0 absolute m-2 w-5 h-5 iconfont icon-close" @click="close()" />
      <img class="left-0 top-0 w-20 absolute m-2" src="/logo-black.png" alt="" />
      <p class="text-2xl font-semibold my-2">登陆</p>
      <input
        v-model="loginParams.username"
        type="text"
        placeholder="用户名"
        class="bg-gray-100 border-0 border-transparent focus:outline-none custom-font-14 text-gray-600 p-2 my-2 w-full" />
      <input
        v-model="loginParams.password"
        type="password"
        placeholder="密码"
        class="bg-gray-100 border-0 border-transparent focus:outline-none custom-font-14 text-gray-600 p-2 my-2 w-full" />

      <button class="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 my-2" @click="login()">登陆</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ElMessage } from 'element-plus'
import { api } from '../api/api'
import { nanoid } from 'nanoid'
import { userStore } from '~/stores/user'
const store = userStore()

const isRegister = ref(false)
const captchaUrl = ref('')
const captchaUrlPic = ref('')
const loginParams = ref({
  username: '',
  password: ''
})
const registerParams = {
  email: '',
  name: '',
  password: ''
}
const captcha = ref('')
const captchaEmail = ref('')
const captchaKey = ref('')
const repassword = ref('')

let uuid = nanoid(10)
captchaKey.value = uuid
const { $toast } = useNuxtApp()
const token = useCookie('robotToken', {
  maxAge: 60 * 60 * 24 * 14
})

function close() {
  store.$patch({
    showLogin: !store.showLogin
  })
}

function refreshCaptcha() {
  captchaUrlPic.value = captchaUrl.value + captchaKey.value + '&t=' + new Date().getTime()
}

function toLogin() {
  isRegister.value = false
  refreshCaptcha()
  clearData()
}
function toRegister() {
  isRegister.value = true
  refreshCaptcha()
  clearData()
}
function clearData() {
  loginParams.value.username = ''
  loginParams.value.password = ''
  registerParams.email = ''
  registerParams.name = ''
  registerParams.password = ''
  captcha.value = ''
  captchaEmail.value = ''
}
function login() {
}
</script>

<style scoped>
.modal-show {
  background: rgba(0, 0, 0, 0.35);
  -webkit-backdrop-filter: saturate(180%) blur(25px);
  backdrop-filter: saturate(180%) blur(25px);
}
</style>
