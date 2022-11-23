<template>
  <div class="page flex form-page" v-loading.fullscreen.lock="fullscreenLoading">
    <div class="form-info bg-white">
      <el-form :model="formData" ref="ruleFormRef" :rules="formRules" label-width="110px">
        <el-form-item label="企业税号：" prop="taxNumber">
          <el-input v-model="formData.taxNumber" placeholder="企业税号" @input="saveChange" />
        </el-form-item>
        <el-form-item label="商户订单号：" prop="outOrderNo">
          <el-input v-model="formData.outOrderNo" placeholder="商户订单号" @input="saveChange" />
        </el-form-item>
        <el-form-item label="发票代码：" prop="code">
          <el-input v-model="formData.code" placeholder="12位数字是发票代码" @input="saveChange" />
        </el-form-item>
        <el-form-item label="发票号码：" prop="number">
          <el-input v-model="formData.number" placeholder="8位数字是发票代码" @input="saveChange" />
        </el-form-item>
        <el-form-item label="打印密钥回调：" prop="printCallbackUrl">
          <el-input v-model="formData.printCallbackUrl" placeholder="" @input="saveChange" />
          <p class="tips">仅诺诺发票打印需要回传打印密钥</p>
        </el-form-item>
        <el-form-item label="回调地址：" prop="callbackUrl">
          <el-input v-model="formData.callbackUrl" placeholder="回调地址" @input="saveChange" />
          <a href="https://hooks.upyun.com/" target="_blank">获取测试用回调地址</a>
        </el-form-item>
        <el-form-item>
          <client-only>
            <el-tooltip effect="dark" content="请先行登录" placement="top" :disabled="disable">
              <el-button type="primary" :disabled="!disable" @click="onSubmit(ruleFormRef)">发送</el-button>
            </el-tooltip>
          </client-only>
        </el-form-item>
      </el-form>
    </div>
    <div class="result-info">
      <result :formData="result" />
      <callback :formData="callback" />
    </div>
  </div>

  <el-dialog v-model="visible" :show-close="false" width="500" append-to-body>
    <template #header="{ close, titleId }">
      <div class="flex items-center justify-between border-b py-3 px-4">
        <div :id="titleId" class="text-sm font-semibold tracking-wide">温馨提示</div>
        <el-icon class="cursor-pointer" @click="close">
          <Close />
        </el-icon>
      </div>
    </template>
    <div class="px-4 font-normal tracking-wide">
      <p class="text-gray-400">请认真核对即将打印的纸质发票的（种类、代码、号码）信息是否与下方信息一致。如一致，请执行打印操作；如不一致，请予以更换。</p>
      <p class="leading-8 mt-2 tracking-wide">发票种类：{{ invoiceDetail.category }}</p>
      <p class="leading-8">发票代码：{{ invoiceDetail.code }}</p>
      <p class="leading-8 mb-2">发票号码：{{ invoiceDetail.number }}</p>
      <div class="text-gray-400">
        为确保您正常打印发票，请先下载安装
        <span
          class="cursor-pointer text-blue-400"
          @click="gotoPath('https://www.nuonuo.com/nuonuo/web/mainbody/special/index.html?guid=3dedd2bf999b4de2a5d50e35ac7a2771')">
          打印助手
        </span>
        <span
          class="cursor-pointer text-blue-400"
          @click="gotoPath('https://www.nuonuo.com/nuonuo/web/mainbody/special/index.html?guid=c0f3054219944a8fa56ad2fc534d3850')">
          使用说明
          <el-icon><QuestionFilled /></el-icon>
        </span>
      </div>
    </div>
    <div class="mt-6 mb-4 text-center">
      <a :href="invoiceDetail.href" class="px-4 py-2 bg-blue-500 text-white rounded-sm">发票打印</a>
    </div>
  </el-dialog>
</template>

<script setup lang="ts">
import { reactive, ref, onMounted } from 'vue'
import { ElMessage } from 'element-plus'
import type { FormInstance, FormRules } from 'element-plus'
import { Close, QuestionFilled } from '@element-plus/icons-vue'
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
const visible = ref(false)
const fullscreenLoading = ref(false)
const socketUrl = ref('')

let stompClient: any

const invoiceDetail = reactive({
  category: '',
  code: '',
  number: '',
  href: ''
})

const formData = reactive({
  taxNumber: '91320211MA1WML8X6T',
  outOrderNo: '',
  code: '',
  number: '',
  printCallbackUrl: 'https://fapiao-robot-api.easyapi.com/callback/nuonuo/print',
  callbackUrl: ''
})

const result = reactive({
  message: '',
  topic: '',
  webSocket: ''
})

const callback = reactive({})

const formRules = reactive<FormRules>({
  code: [{ required: true, message: '发票代码不能为空', trigger: 'change' }],
  number: [{ required: true, message: '发票号码不能为空', trigger: 'change' }],
  callbackUrl: [{ required: true, message: '回调地址不能为空', trigger: 'change' }]
})

const disable = !!token.value

/**
 * 发送
 */
const onSubmit = async (formEl: FormInstance | undefined) => {
  if (!formEl) return
  await formEl.validate((valid, fields) => {
    if (valid) {
      test.printInvoice(formData).then(res => {
        if (res.code === 1) {
          Object.assign(result, res.content)
          ElMessage({
            type: 'success',
            message: res.message
          })
          fullscreenLoading.value = true
          webSocket()
        }
      })
    }
  })
}

function webSocket() {
  socketUrl.value = `${http.baseUrl}/easyapi-socket`
  let socket = new SockJS(socketUrl.value)
  stompClient = Stomp.over(socket)
  stompClient.debug = null
  stompClient.connect({}, subscribe)
}

function subscribe() {
  stompClient.subscribe(`/topic/${formData.taxNumber}/nuonuo/print`, (message: object) => {
    let target = JSON.parse(message.body)
    invoiceDetail.category = target.category
    invoiceDetail.code = target.code
    invoiceDetail.number = target.number
    invoiceDetail.href = `webprint:"0,${target.printEncryptData}"`
    fullscreenLoading.value = false
    visible.value = true
  })
}

/**
 * 缓存记录数据
 */
function saveChange() {
  setCacheData(route.name as string, formData)
}

/**
 * 更新formData
 */
function updateFormData() {
  let data = getCacheData(route.name as string)
  formData.taxNumber = data.taxNumber
  formData.callbackUrl = data.callbackUrl
}

function gotoPath(url: string) {
  window.open(url, '_blank')
}

onMounted(() => {})

useHead({
  title: '发票红冲 - EasyAPI发票机器人'
})
</script>

<style>
.el-dialog__header {
  padding: 0;
  margin: 0;
}

.el-dialog__body {
  padding-left: 0;
  padding-right: 0;
  font-size: 13px;
}
</style>
