<script setup lang="ts">
import { onMounted, reactive, ref } from 'vue'
import { Lock, User } from '@element-plus/icons-vue'
import type { FormInstance, FormRules } from 'element-plus'
import Signup from './component/signup.vue'
import ForgetPassword from './component/forget-password.vue'
import { user } from '@/api/user'
import { useUser } from '@/stores/user'
import { setToken } from '~/utils/token'

const route = useRoute()
const router = useRouter()
const userStore = useUser()
const formRef = ref<FormInstance>()

const state = reactive({
  from: '' as any,
  activeName: '账户登录',
  loading: false,
})

const form = reactive({
  username: '',
  password: '',
  rememberMe: true,
})

const rules = reactive<FormRules>({
  username: [
    { required: true, message: '请输入手机号', trigger: 'blur' },
    { min: 11, max: 11, message: '请输入正确的手机号', trigger: 'blur' },
  ],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' },
    { min: 6, max: 16, message: '请输入正确的密码', trigger: 'blur' },
  ],
})

function changeActiveName(data: any) {
  state.activeName = data
}

async function handleLogin (formEl: FormInstance | undefined) {
  if (!formEl)
    return
  await formEl.validate((valid) => {
    if (valid) {
      state.loading = true
      user.login(form).then ((res) => {
        if (res.code === 1) {
          const { id_token } = res as any
          setToken(id_token)
          setTimeout(() => {
            userStore.getUser(route.path)
          }, 200)
        }
        state.loading = false
      })
    }
  })
}

onMounted(() => {
  if (route.query.from) {
    state.from = route.query.from
  }
})
</script>

<template>
  <div class="login-container">
    <div class="absolute top-8 right-8 text-base text-gray-500 z-50">
      <a
        href="https://bangqu.easyapi.com/project/28359/document/31224/api/266109/text" target="_blank"
        class="hover:text-blue-500"
      >建议反馈</a>
      <a
        href="https://bangqu.easyapi.com/project/28359/document/31224/api/266109/text" target="_blank"
        class="mx-4 hover:text-blue-500"
      >操作手册</a>
      <a href="https://fapiao.easyapi.com/download.html" target="_blank" class="hover:text-blue-500">安装包下载</a>
    </div>
    <div class="login-center">
      <div class="login-img" />
      <div class="login-right">
        <el-tabs v-model="state.activeName">
          <div :class="state.activeName === '立即注册' ? 'form-enrollTitle' : 'form-title'">
            {{ state.activeName }}
          </div>
          <el-form
            v-if="state.activeName === '账户登录'" ref="formRef" :model="form" class="login-form"
            :rules="rules"
          >
            <el-form-item prop="username">
              <div class="form-item">
                <el-icon>
                  <User />
                </el-icon>
                <el-input v-model="form.username" maxlength="11" placeholder="账号" />
              </div>
            </el-form-item>
            <el-form-item prop="password">
              <div class="form-item">
                <el-icon>
                  <Lock />
                </el-icon>
                <el-input v-model="form.password" type="password" placeholder="密码" />
              </div>
            </el-form-item>
            <el-button :loading="state.loading" type="primary" class="btn" @click="handleLogin(formRef)">
              登录
            </el-button>
            <div class="form-btn">
              <el-button link type="primary" @click="state.activeName = '立即注册'">
                立即注册
              </el-button>
              <el-button link type="primary" @click="state.activeName = '忘记密码'">
                忘记密码
              </el-button>
            </div>
          </el-form>
          <Signup v-if="state.activeName === '立即注册'" @changeActiveName="changeActiveName" />
          <ForgetPassword
            v-if="state.activeName === '忘记密码'" @changeActiveName="changeActiveName"
          />
        </el-tabs>
      </div>
    </div>
    <div class="absolute bottom-4 text-center text-xs">
      <div>沪ICP备19007521号</div>
      <div>Copyright © 2015～2023 帮趣团队</div>
    </div>
  </div>
</template>

<style>
.login-form .el-form-item__content {
  line-height: 0;
}

.login-right .el-tabs__nav {
  width: 100%;
  line-height: 57px;
}

.login-right .el-tabs__item {
  width: 33%;
  text-align: center;
  font-size: 16px;
}

.login-form .el-input__wrapper {
  width: 300px;
  padding: 1px;
}

.login-form .el-input__inner {
  padding-left: 30px;
  border-color: #dcdfe6;
}

.login-form .el-input__inner:focus {
  border-color: #dcdfe6;
}

.login_link {
  margin-top: 10px;
}

.login_bottom {
  margin-top: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.easyapi_logo {
  display: inline-block;
  width: 30px;
  height: 30px;
}

.easy_login {
  display: inline-block;
  width: 180px;
  height: 40px;
  line-height: 40px;
  font-size: 16px;
  color: #323233;
  text-align: center;
}

.login-container {
  width: 100vw;
  height: 100vh;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  position: fixed;
  z-index: 9999 !important;
  background: url('https://qiniu.easyapi.com/login_bg.png') no-repeat;
  background-color: #ffffff !important;
  background-size: 100% 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.login-center {
  width: 820px;
  height: 513px;
  display: flex;
  box-shadow: 0 10px 34px 0 rgba(0, 0, 0, 0.2);
  background-color: #fff;
}

.login-img {
  width: 410px;
  height: 100%;
  background: url('https://qiniu.easyapi.com/robot_login_left.png') no-repeat;
  background-size: 100% 100%;
}

.login-right {
  width: 432px;
  height: 100%;
}

.login-form {
  padding: 0 50px;
  margin-top: 20px;
}

.btn {
  margin-top: 20px;
  width: 100%;
}

.form-item i {
  font-size: 18px;
  position: relative;
  bottom: -25px;
  left: 6px;
  z-index: 1000;
}

.form-title {
  width: 100%;
  margin-top: 80px;
  text-align: center;
}

.form-enrollTitle {
  width: 100%;
  margin-top: 20px;
  text-align: center;
}

.form-btn {
  width: 100%;
  margin-top: 10px;
  text-align: center;
}
</style>
