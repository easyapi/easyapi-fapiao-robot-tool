<template>
  <header>
    <div class="flex px-1 md:px-6 justify-between items-center">
      <div class="flex items-center">
        <div class="font-black inline text-xl cursor-pointer" @click="gotoHome">
          <img src="/logo-black.png" class="logo-img w-8 h-8" alt="" srcset="" />
        </div>
        <span class="ml-2 text-xl">发票开票机器人接口测试工具</span>
        <div class="menu ml-4 items-center md:inline custom-font-16 pl-4">
          <li class="inline-block cursor-pointer select-none">
            <NuxtLink to="/">管理首页</NuxtLink>
          </li>
          <li v-for="(item, index) in dataList" :key="index" class="inline-block cursor-pointer select-none">
            <NuxtLink
              :class="
                (router.currentRoute.value.path.indexOf('setting') !== -1 && index === 1) ||
                (router.currentRoute.value.path.indexOf('order') !== -1 && index === 0)
                  ? 'router-link-exact-active'
                  : ''
              "
              :to="{ path: item.link }">
              {{ item.name }}
            </NuxtLink>
          </li>
        </div>
      </div>
      <div class="flex items-center">
        <div class="login-group flex mx-2 lg:mx-4 custom-font-14 items-center leading-8">
          <p @click="login()" v-show="!loginStatus" class="cursor-pointer select-none mx-1 px-3 md:px-5 text-white bg-blue-500 rounded-md">登录</p>
          <p @click="logout()" v-show="loginStatus" class="cursor-pointer select-none mx-1 px-3 md:px-5 text-white bg-blue-500 rounded-md">退出</p>
        </div>
      </div>
    </div>
    <Login />
  </header>
</template>

<script setup lang="ts">
import { focusNode } from 'element-plus/lib/utils'
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

function login() {
  store.$patch({
    showLogin: !store.showLogin
  })
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

.menu > li:hover,
.router-link-active,
.router-link-exact-active {
  color: #fff;
  font-weight: 900;
  background-color: #42a1ff;
}

.router-link-active {
  @apply inline-block px-2 py-4;
}

li {
  @apply inline-block mx-2;
}

a {
  @apply inline-block py-4 px-2;
}

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
