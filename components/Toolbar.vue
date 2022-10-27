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
            href="https://robot.easyapi.com/login?from=https://robot.easyapi.com/tool/"
            v-if="!loginStatus"
            class="cursor-pointer select-none mx-1 px-3 md:px-5 text-white bg-blue-500 rounded-md">
            登录
          </a>
          <el-popover trigger="click" v-else>
            <p class="chose-style" @click="logout()">退出登录</p>
            <template #reference>
              <div class="flex cursor-pointer">
                <img v-show="loginStatus" class="w-8 h-8 mr-2" src="/img/header.png" />
                <!-- <span>{{ robotUser.username }}</span> -->
              </div>
            </template>
          </el-popover>
        </div>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { userStore } from '@/stores/user'

const token = useCookie('robotToken')
const robotUser = useCookie('robotUser')
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

function gotoHome() {
  router.push('')
}

function logout() {
  store.$patch({
    showLogin: false
  })
  token.value = null
  router.push('')
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

.chose-style {
  height: 30px;
  line-height: 30px;
  width: 100%;
  text-align: center;
  cursor: pointer;
}

.chose-style:hover {
  @apply bg-gray-100;
}
</style>

<style>
.el-popover.el-popper {
  padding: 5px 10px !important;
}
</style>
