<script setup lang="ts">
import { onMounted, reactive, ref, watch } from 'vue'
import { CircleCloseFilled, SuccessFilled } from '@element-plus/icons-vue'
import { userStore } from '@/stores/user'
import { connect, setTaxNumber } from '@/utils/webSocketUtil'

const token = useCookie('robotToken')
const robotUser = useCookie('robotUser')
const store = userStore()
const router = useRouter()
const loginStatus = ref(false)

const state = reactive({
  timer: null,
  isMakeInvoice: false,
})

if (typeof token.value !== 'undefined')
  loginStatus.value = true

watch(
  () => store.isLogin,
  (newStatus, oldStatus) => {
    loginStatus.value = newStatus
  },
  {
    deep: true,
  },
)

const dataList = ref([
  {
    link: '/order/list',
    name: '订单管理',
  },
  {
    link: '/setting/shop',
    name: '开票配置',
  },
])

function gotoHome() {
  router.push('')
}

function logout() {
  store.$patch({
    showLogin: false,
  })
  token.value = null
  router.push('')
  location.reload()
}

function getRobotState() {
  if (state.timer)
    clearInterval(state.timer)
  state.timer = setInterval(() => {
    const robotState = JSON.parse(localStorage.getItem('robotState'))
    if (robotState && robotState.make == 1)
      state.isMakeInvoice = true
    else
      state.isMakeInvoice = false

    localStorage.removeItem('robotState')
  }, 5000)
}

onMounted(() => {
  setTaxNumber('91320211MA1WML8X6T')
  connect()
  getRobotState()
})
</script>

<template>
  <header>
    <div class="flex px-1 md:px-6 justify-between items-center border-b">
      <div class="flex items-center py-4">
        <div class="font-black inline text-xl cursor-pointer" @click="gotoHome">
          <img src="/logo-black.png" class="logo-img w-8 h-8" alt="" srcset="">
        </div>
        <span class="ml-2 text-xl">EasyAPI发票机器人 接口测试工具</span>
      </div>
      <div class="flex items-center">
        <div class="login-group flex mx-2 lg:mx-4 custom-font-14 items-center leading-8">
          <div class="mr-6">
            <SuccessFilled v-if="state.isMakeInvoice" class="w-6 h-6 mr-2" color="#67C23A" />
            <CircleCloseFilled v-else class="w-6 h-6 mr-2" color="#F56C6C" />
            <span v-if="state.isMakeInvoice">可开发票</span>
            <span v-else>开票异常</span>
          </div>
          <a
            v-if="!loginStatus"
            href="https://robot.easyapi.com/login?from=https://robot-tool.easyapi.com"
            class="cursor-pointer select-none mx-1 px-3 md:px-5 text-white bg-blue-500 rounded-md"
          >
            登录
          </a>
          <el-popover v-else trigger="click">
            <p class="chose-style" @click="logout()">
              退出登录
            </p>
            <template #reference>
              <div class="flex cursor-pointer">
                <img v-show="loginStatus" class="w-8 h-8 mr-2" src="/img/header.png">
                <!-- <span>{{ robotUser.username }}</span> -->
              </div>
            </template>
          </el-popover>
        </div>
      </div>
    </div>
  </header>
</template>

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
