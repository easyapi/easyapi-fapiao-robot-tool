<template>
  <header>
    <div class="flex px-1 md:px-6 justify-between items-center border-b">
      <div class="flex items-center py-4">
        <div class="font-black inline text-xl cursor-pointer" @click="gotoHome">
          <img src="/logo-black.png" class="logo-img w-8 h-8" alt="" srcset="" />
        </div>
        <span class="ml-2 text-xl">EasyAPI开票机器人 接口测试工具</span>
      </div>
      <div class="flex items-center">
        <div class="login-group flex mx-2 lg:mx-4 custom-font-14 items-center leading-8">
          <a
            href="https://fapiao-robot.easyapi.com/login?from=https://fapiao-robot-tool.easyapi.com"
            target="_blank"
            v-show="!loginStatus"
            class="cursor-pointer select-none mx-1 px-3 md:px-5 text-white bg-blue-500 rounded-md">
            登录
          </a>
          <p @click="logout()" v-show="loginStatus" class="cursor-pointer select-none mx-1 px-3 md:px-5 text-white bg-blue-500 rounded-md">退出</p>
        </div>
      </div>
    </div>
    <Login />
  </header>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { userStore } from '~/stores/user'
import request from '~/api/request'

const token = useCookie('robotToken')
const store = userStore()
const router = useRouter()
const loginStatus = ref(false)

if (typeof token.value != 'undefined') {
  loginStatus.value = true
}

watch(
  () => store.isLogin,
  (newStatus, oldStatus) => {
    loginStatus.value = newStatus
  },
  {
    deep: true
  }
)

const dataList = ref([
  {
    link: '/order/list',
    name: '订单管理'
  },
  {
    link: '/setting/shop',
    name: '开票配置'
  }
])

function exportConfigure() {
  let path = request.baseUrl + '/api/export/profile/' + token.value
  window.open(path, '_blank')
}

function gotoHome() {
  router.push('/')
}

function logout() {
  store.$patch({
    showLogin: false
  })
  token.value = null
  navigateTo('/')
  location.reload()
}
</script>

<style scoped>
header {
  background: white;
}

.router-link-active {
  @apply inline-block px-2 py-4;
}

li {
  @apply inline-block mx-2;
}

/* a {
  @apply inline-block py-4 px-2;
} */

.router-link-exact-active {
  @apply inline-block px-2 py-4;
}

.icon-category {
  font-size: 24px;
}

.logo-img {
  border-radius: 8px;
}
</style>
