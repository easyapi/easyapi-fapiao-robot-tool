<template>
  <div class="page flex red">
    <div class="form-info bg-white">
      <el-form :model="formData" ref="form" :rules="formRules" label-width="110px">
        <el-form-item label="企业税号：" prop="taxNumber">
          <el-input v-model="formData.taxNumber" placeholder="企业税号" @input="saveChange" />
        </el-form-item>
        <el-form-item label="回调地址：" prop="callbackUrl">
          <el-input v-model="formData.callbackUrl" placeholder="回调地址" @input="saveChange" />
          <a href="https://hooks.upyun.com/" target="_blank">获取测试用回调地址</a>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" :disabled="!disable" @click="onSubmit">发送</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="result-info bg-white">
      <ResultInfo :formData="result" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import type { FormInstance, FormRules } from 'element-plus'
import { ElMessage } from 'element-plus'
import { test } from '../api/test'
import { setCacheData, getCacheData } from '../utils/cacheData'
import ResultInfo from '../components/resultInfo.vue'
import Cookies from 'js-cookie'

const route = useRoute()

const ruleFormRef = ref<FormInstance>()

const formData = reactive({
  taxNumber: '91320211MA1WML8X6T',
  callbackUrl: ''
})

const result = reactive({
  message: '',
  topic: '',
  webSocket: ''
})

const formRules = reactive<FormRules>({
  taxNumber: [{ required: true, message: '企业税号不能为空', trigger: 'change' }]
})

const disable = Cookies.get('robotToken') ? true : false

/**
 * 发送
 */
const onSubmit = async (formEl: FormInstance | undefined) => {
  if (!formEl) return
  await formEl.validate((valid, fields) => {
    if (valid) {
      test.stateShop(formData).then(res => {
        if (res.code === 1) {
          result.message = res.content.message
          result.topic = res.content.topic
          result.webSocket = res.content.webSocket
          ElMessage({
            type: 'success',
            message: res.message
          })
        }
      })
    }
  })
}

/**
 * 缓存记录数据
 */
function saveChange() {
  setCacheData(route.name, formData)
}

/**
 * 更新formData
 */
function updateFormData() {
  let data = getCacheData(route.name)
  formData.taxNumber = data.taxNumber
  formData.callbackUrl = data.callbackUrl
}

onMounted(() => {
  updateFormData()
})

useHead: ({
  title: '助手状态 - EasyAPI开票机器人'
})
</script>

<style scoped>
.red .form-info {
  width: 49%;
  padding: 20px;
}

.red .form-info .tips {
  font-size: 12px;
  color: #a2a2a2;
}

.red .result-info {
  padding: 20px;
  width: 50%;
  margin-left: 20px;
  display: flex;
  flex-direction: column;
}

.red .title {
  font-size: 12px;
  color: #606266;
  font-weight: 500;
  margin: 8px 0;
}
a {
  font-size: 12px;
  color: #409eff;
  cursor: pointer;
}
</style>
