<template>
  <div class="page flex form-page">
    <div class="form-info bg-white">
      <el-form :model="formData" ref="ruleFormRef" :rules="formRules" label-width="110px">
        <el-form-item label="企业税号：" prop="taxNumber">
          <el-input v-model="formData.taxNumber" placeholder="企业税号" @input="saveChange" />
        </el-form-item>
        <el-form-item label="回调地址：" prop="callbackUrl">
          <el-input v-model="formData.callbackUrl" placeholder="回调地址" @input="saveChange" />
          <a href="https://hooks.upyun.com/" target="_blank">获取测试用回调地址</a>
        </el-form-item>
        <el-form-item>
          <el-tooltip effect="dark" content="请先行登录" placement="top" :disabled="disable">
            <div>
              <el-button type="primary" :disabled="!disable" @click="onSubmit(ruleFormRef)">发送</el-button>
            </div>
          </el-tooltip>
        </el-form-item>
      </el-form>
    </div>
    <div class="result-info">
      <Result :formData="result" />
      <Callback :formData="callback" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref, onMounted } from 'vue'
import type { FormInstance, FormRules } from 'element-plus'
import { ElMessage } from 'element-plus'
import { test } from '@/api/test'
import { setCacheData, getCacheData } from '@/utils/cacheData'
import http from '~/api/request'
import Result from '@/components/Result.vue'
import Callback from '@/components/Callback.vue'
import SockJS from 'sockjs-client/dist/sockjs.min.js'
import Stomp from 'stompjs'
const token = useCookie('robotToken')

const route = useRoute()

const ruleFormRef = ref<FormInstance>()

const socketUrl = ref('')

let stompClient: any

const formData = reactive({
  taxNumber: '91320211MA1WML8X6T',
  callbackUrl: ''
})

const result = reactive({
  message: '',
  topic: '',
  webSocket: ''
})

const callback = reactive({
  content: ''
})

const formRules = reactive<FormRules>({
  taxNumber: [{ required: true, message: '企业税号不能为空', trigger: 'change' }]
})

const disable = !!token.value

/**
 * 发送
 */
const onSubmit = async (formEl: FormInstance | undefined) => {
  if (!formEl) return
  await formEl.validate((valid, fields) => {
    if (valid) {
      test.robotShop(formData).then(res => {
        if (res.code === 1) {
          result.message = res.content.message
          result.topic = res.content.topic
          result.webSocket = res.content.webSocket
          ElMessage({
            type: 'success',
            message: res.message
          })
          webSocket()
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

/**
 * 订阅消息
 */
function webSocket() {
  socketUrl.value = `${http.baseUrl}/easyapi-socket`
  let socket = new SockJS(socketUrl.value)
  stompClient = Stomp.over(socket)
  stompClient.debug = null
  stompClient.connect({}, subscribe)
}

function subscribe() {
  stompClient.subscribe(`/topic/${formData.taxNumber}/tool/callback`, message => {
    console.log(message, 789)
  })
}

onMounted(() => {
  updateFormData()
})

useHead({
  title: '发票机器人状态 - EasyAPI开票机器人'
})
</script>