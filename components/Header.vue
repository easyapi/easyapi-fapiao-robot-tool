<script setup lang="ts">
import { onMounted, reactive, ref, watch } from 'vue'
import { CircleCloseFilled, SuccessFilled } from '@element-plus/icons-vue'
import { useUser } from '@/stores/user'
import { connect, setTaxNumber } from '@/utils/webSocketUtil'
import { getToken } from '@/utils/token'

const userStore = useUser()
const router = useRouter()
const authenticationToken = getToken()

const state = reactive({
  timer: null as any,
  isMakeInvoice: false,
  loginStatus: '' as any,
  userInfo: {
    nickname: '' as any,
    username: '' as any,
  },
})

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

/**
 * 登录
 */
function login() {
  router.push('/login')
}

/**
 * 退出
 */
function logout() {
  userStore.logout(router)
}

function getRobotState() {
  if (state.timer)
    clearInterval(state.timer)
  state.timer = setInterval(() => {
    const robotState = JSON.parse(localStorage.getItem('robotState') as any)
    state.isMakeInvoice = !!(robotState && robotState.make === 1)
    localStorage.removeItem('robotState')
  }, 5000)
}

/**
 * 监听登陆状态
 */
watch(
  () => userStore.isLogin,
  () => {
    state.loginStatus = userStore.isLogin
    state.userInfo = {
      nickname: userStore.nickname,
      username: userStore.username,
    }
  }, {
    deep: true,
  },
)

onMounted(() => {
  if (authenticationToken) {
    userStore.getUser()
    state.loginStatus = !!authenticationToken
    state.userInfo = {
      nickname: userStore.nickname,
      username: userStore.username,
    }
  }
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
        <span class="ml-2 text-xl font-bold text-gray-700">EasyAPI发票机器人 接口测试工具</span>
      </div>
      <div class="flex items-center">
        <div class="login-group flex mx-2 lg:mx-4 custom-font-14 items-center leading-8">
          <div class="mr-6">
            <SuccessFilled v-if="state.isMakeInvoice" class="w-6 h-6 mr-2" color="#67C23A" />
            <CircleCloseFilled v-else class="w-6 h-6 mr-2" color="#F56C6C" />
            <span v-if="state.isMakeInvoice">可开发票</span>
            <span v-else>开票异常</span>
          </div>
          <div class="flex items-center">
            <div class="login-group flex mx-2 lg:mx-4 custom-font-14 items-center leading-8">
              <el-popover
                v-if="state.loginStatus !== '' && state.loginStatus"
                trigger="hover"
                popper-class="login-popover"
                @hide="blur"
              >
                <p class="chose-style" @click="logout">
                  退出登录
                </p>

                <template #reference>
                  <div class="user-box" @click="change">
                    <img class="user-image" src="/img/photo.png">
                    <div class="user-info">
                      <div class="user-name">
                        {{ state.userInfo.nickname }}
                      </div>
                      <div class="user-mobile">
                        {{ state.userInfo.username }}
                      </div>
                    </div>
                    <span id="text" />
                  </div>
                </template>
              </el-popover>
              <div
                v-if="state.loginStatus !== '' && !state.loginStatus"
                class="cursor-pointer select-none"
                @click="login"
              >
                登录
              </div>
            </div>
          </div>
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

.select-none {
  background-color:#01a8b9;
  color: #ffffff;
  display: flex;
  align-items: center;
  padding: 5px 10px;
  border-radius: 5px;
  height: 30px;
  margin-right: 20px;
}

.user-box {
  cursor: pointer;
  display: flex;
  align-items: center;
  padding: 0 20px;
  height: 60px;
  .user-image {
    width: auto;
    height: 40px;
    margin-right: 10px;
  }
  .user-info {
    .user-name {
      font-size: 14px;
      height: 1.5em;
    }

    .user-mobile {
      font-size: 12px;
      color: #999999;
    }
  }
}
</style>

<style>
.el-popover.el-popper {
  padding: 5px 10px !important;
}
</style>
