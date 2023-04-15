<script setup lang="ts">
import { reactive, ref } from 'vue'
import { Lock, Message, Phone } from '@element-plus/icons-vue'
import type { FormInstance, FormRules } from 'element-plus'
import { ElMessage } from 'element-plus'
import { user } from '~/api/user'

const emit = defineEmits(['changeActiveName'])
const formRef = ref<FormInstance>()
const state = reactive({
  validateCode: '获取验证码',
  disabled: false,
  loading: false,
})

const forgetForm = reactive({
  username: '',
  password: '',
  code: '',
  passwordAgain: '',
})

const forgetRules = reactive<FormRules>({
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
  passwordAgain: [
    { required: true, message: '请确认密码', trigger: 'blur' },
    { min: 6, max: 16, message: '请输入6~16位密码', trigger: 'blur' },
  ],
})

/**
 * 返回登陆
 */
function back() {
  emit('changeActiveName', '账户登录')
}

/**
 * 获取验证码
 */
function getValidateCode() {
  if (forgetForm.username.length !== 11) {
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
  params.mobile = forgetForm.username
  user.sendCode(params).then((res) => {
    ElMessage.success(res.message)
  })
}

async function submit(formEl: FormInstance | undefined) {
  if (!formEl)
    return
  await formEl.validate((valid) => {
    if (valid) {
      if (forgetForm.password !== forgetForm.passwordAgain) {
        ElMessage({
          type: 'warning',
          message: '确认密码不一致',
        })
        return
      }
      state.loading = true
      user
        .forgetPassword(forgetForm)
        .then((res) => {
          if (res.code === 1) {
            ElMessage.success(res.message)
            back()
          }
          state.loading = false
        })
    }
  })
}

useHead({ title: '忘记密码-EasyAPI发票管理控制台' })
</script>

<template>
  <div>
    <el-form
      ref="formRef"
      :model="forgetForm"
      class="forgetForm-ForgetPassword"
      :rules="forgetRules"
    >
      <el-form-item prop="username">
        <div class="form-item">
          <el-icon><Phone /></el-icon>
          <el-input v-model="forgetForm.username" maxlength="11" placeholder="手机号码" />
        </div>
      </el-form-item>
      <el-form-item prop="code">
        <div class="form-item">
          <el-icon><Message /></el-icon>
          <el-input v-model="forgetForm.code" maxlength="6" placeholder="验证码" />
          <el-button
            :disabled="state.disabled"
            link
            type="primary"
            class="btn-code"
            @click="getValidateCode"
          >
            {{ state.validateCode }}
          </el-button>
        </div>
      </el-form-item>
      <el-form-item prop="password">
        <div class="form-item">
          <el-icon><Lock /></el-icon>
          <el-input
            v-model="forgetForm.password"
            type="password"
            placeholder="密码"
          />
        </div>
      </el-form-item>
      <el-form-item prop="passwordAgain">
        <div class="form-item">
          <el-icon><Lock /></el-icon>
          <el-input
            v-model="forgetForm.passwordAgain"
            type="password"
            placeholder="确认密码"
          />
        </div>
      </el-form-item>
      <el-button :loading="state.loading" type="primary" class="btn" @click="submit(formRef)">
        提交
      </el-button>
      <div class="tips">
        <el-button link type="primary" @click="back">
          返回登陆
        </el-button>
      </div>
    </el-form>
  </div>
</template>

<style>
.forgetForm-ForgetPassword {
  padding: 0 50px;
}

.forgetForm-ForgetPassword .btn {
  margin-top: 10px;
  width: 316px;
}

.forgetForm-ForgetPassword .form-item {
  position: relative;
}
.forgetForm-ForgetPassword .form-item i {
  font-size: 18px;
  position: relative;
  bottom: -25px;
  z-index: 1000;
}

.forgetForm-ForgetPassword .form-item .btn-code {
  position: absolute;
  right: 5px;
  top: 24px;
}

.forgetForm-ForgetPassword .el-form-item__content {
  line-height: 0;
  padding: 0;
  margin: 0;
}

.forgetForm-ForgetPassword .form-item .el-input__wrapper {
  width: 300px;
  padding: 1px;
}

.forgetForm-ForgetPassword .el-input__inner {
  padding-left: 30px;
  border-color: #dcdfe6;
}

.forgetForm-ForgetPassword .el-input__inner:focus {
  border-color: #dcdfe6;
}
.forgetForm-ForgetPassword .tips {
  width: 100%;
  text-align: center;
  font-size: 14px;
  margin-top: 10px;
}
</style>
