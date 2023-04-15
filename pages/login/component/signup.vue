<script setup lang="ts">
import { reactive, ref } from 'vue'
import { Lock, Message, Phone, User } from '@element-plus/icons-vue'
import type { FormInstance, FormRules } from 'element-plus'
import { ElMessage } from 'element-plus'
import { user } from '~/api/user'
import { setToken } from '~/utils/token'

const emit = defineEmits(['changeActiveName'])
const router = useRouter()
const formRef = ref<FormInstance>()
const state = reactive({
  validateCode: '获取验证码',
  disabled: false,
  loading: false,
})

const signupForm = reactive({
  username: '',
  password: '',
  code: '',
  confirmPassword: '',
})

const signupRules = reactive<FormRules>({
  username: [
    { required: true, message: '请输入您的手机号码', trigger: 'blur' },
    { min: 11, max: 11, message: '请输入正确的手机号', trigger: 'blur' },
  ],
  password: [
    { required: true, message: '请设置您的密码', trigger: 'blur' },
    { min: 6, max: 16, message: '请输入6~16位密码', trigger: 'blur' },
  ],
  code: [
    { required: true, message: '请输入验证码', trigger: 'blur' },
    { min: 6, max: 6, message: '请输正确的验证码', trigger: 'blur' },
  ],
  confirmPassword: [
    { required: true, message: '请确认密码', trigger: 'blur' },
    { min: 6, max: 16, message: '请输入6~16位密码', trigger: 'blur' },
  ],
})

/**
 * 返回登录
 */
function back() {
  emit('changeActiveName', '账户登录')
}

/**
 * 获取验证码
 */
function getValidateCode() {
  if (signupForm.username.length !== 11) {
    ElMessage({
      type: 'warning',
      message: '请填写正确的手机号',
    })
    return
  }
  state.disabled = true
  let num = 60
  const timer = setInterval(() => {
    num--
    state.validateCode = `${num}s`
    if (num === 0) {
      state.disabled = false
      state.validateCode = '重新获取验证码'
      clearInterval(timer)
    }
  }, 1000)
  const params = {
    mobile: '',
  }
  params.mobile = signupForm.username
  user.sendCode(params).then((res) => {
    ElMessage.success(res.message)
  })
}

async function signup(formEl: FormInstance | undefined) {
  if (!formEl)
    return
  await formEl.validate((valid) => {
    if (valid) {
      if (signupForm.password !== signupForm.confirmPassword) {
        ElMessage({
          type: 'warning',
          message: '确认密码不一致',
        })
        return
      }
      state.loading = true
      user.signup(signupForm).then((res) => {
        if (res.code === 1) {
          setToken(res.content)
          ElMessage.success((res.message))
          setTimeout(() => {
            getUser()
          }, 100)
        }
      })
    }
  })
}

/**
 * 获取信息
 */
function getUser() {
  user.getUser().then((res) => {
    if (res.code === 1) {
      state.loading = false
      localStorage.setItem('user', JSON.stringify(res.content))
      router.push('/')
    }
  })
}

useHead({ title: '注册-EasyAPI发票管理控制台' })
</script>

<template>
  <div>
    <el-form ref="formRef" :model="signupForm" class="signupForm-signup" :rules="signupRules">
      <el-form-item prop="username">
        <div class="form-item">
          <el-icon><Phone /></el-icon>
          <el-input v-model="signupForm.username" maxlength="11" placeholder="手机号码" />
        </div>
      </el-form-item>
      <el-form-item prop="code">
        <div class="form-item">
          <el-icon><Message /></el-icon>
          <el-input v-model="signupForm.code" maxlength="6" placeholder="验证码" />
          <el-button :disabled="state.disabled" link type="primary" class="btn-code" @click="getValidateCode">
            {{ state.validateCode }}
          </el-button>
        </div>
      </el-form-item>
      <el-form-item prop="nickname">
        <div class="form-item">
          <el-icon><User /></el-icon>
          <el-input v-model="signupForm.nickname" maxlength="20" placeholder="姓名" />
        </div>
      </el-form-item>
      <el-form-item prop="password">
        <div class="form-item">
          <el-icon><Lock /></el-icon>
          <el-input v-model="signupForm.password" type="password" placeholder="密码" />
        </div>
      </el-form-item>
      <el-form-item prop="confirmPassword">
        <div class="form-item">
          <el-icon><Lock /></el-icon>
          <el-input v-model="signupForm.confirmPassword" type="password" placeholder="确认密码" />
        </div>
      </el-form-item>
      <el-button type="primary" class="btn" @click="signup(formRef)">
        注册
      </el-button>
      <div class="tips">
        已有账号，
        <el-button link type="primary" @click="back">
          返回登陆
        </el-button>
      </div>
    </el-form>
  </div>
</template>

<style lang="css">
.signupForm-signup {
  padding: 0 50px;
  margin-top: 0;
}

.signupForm-signup .btn {
  margin-top: 10px;
  width: 316px;
}

.signupForm-signup .form-item {
  position: relative;
}
.signupForm-signup .form-item i {
  font-size: 18px;
  position: relative;
  bottom: -25px;
  z-index: 1000;
}

.signupForm-signup .form-item .btn-code {
  position: absolute;
  right: 5px;
  top: 24px;
}

.signupForm-signup .el-form-item__content {
  line-height: 0;
}

.signupForm-signup .form-item .el-input__wrapper {
  width: 300px;
  padding: 1px;
}

.signupForm-signup .form-item .el-input__inner {
  padding-left: 30px;
  border-color: #dcdfe6;
}

.signupForm-signup .form-item .el-input__inner:focus {
  border-color: #dcdfe6;
}

.signupForm-signup .tips {
  width: 100%;
  margin-top: 10px;
  text-align: center;
  font-size: 14px;
}
</style>
