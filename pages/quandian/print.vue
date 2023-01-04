<script setup lang="ts">
import { onMounted, reactive, ref } from 'vue'
import { ElMessage } from 'element-plus'
import type { FormInstance, FormRules } from 'element-plus'
import { Close, QuestionFilled } from '@element-plus/icons-vue'
import SockJS from 'sockjs-client/dist/sockjs.min.js'
import Stomp from 'stompjs'
import { test } from '@/api/test'
import { getCacheData, setCacheData } from '@/utils/cacheData'
import http from '~/api/request'
import Result from '@/components/Result.vue'
import Callback from '@/components/Callback.vue'

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
  href: '',
})

const formData = reactive({
  taxNumber: '91320211MA1WML8X6T',
  allElectronicInvoiceNumber: '',
  makeDate: '',
  secretKey: '',
  printCallbackUrl:
    'https://fapiao-robot-api.easyapi.com/callback/51fapiao/print',
  callbackUrl: '',
})

const disabledDate = (time: Date) => {
  return time.getTime() > Date.now()
}

const result = reactive({
  message: '',
  topic: '',
  webSocket: '',
})

const callback = reactive({})

const formRules = reactive<FormRules>({
  allElectronicInvoiceNumber: [
    { required: true, message: '全电发票号码不能为空', trigger: 'change' },
  ],
  makeDate: [
    { required: true, message: '开票时间不能为空', trigger: 'change' },
  ],
  callbackUrl: [
    { required: true, message: '回调URL不能为空', trigger: 'change' },
  ],
  secretKey: [{ required: true, message: '密钥不能为空', trigger: 'change' }],
})

const disable = !!token.value

/**
 * 发送
 */
const onSubmit = async (formEl: FormInstance | undefined) => {
  if (!formEl)
    return
  await formEl.validate((valid) => {
    if (valid) {
      test.printInvoice(formData).then((res) => {
        if (res.code === 1) {
          Object.assign(result, res.content)
          ElMessage({
            type: 'success',
            message: res.message,
          })
          // if (formData.printCallbackUrl) {
          //   fullscreenLoading.value = true;
          //   webSocket();
          // }
        }
      })
    }
  })
}

function webSocket() {
  socketUrl.value = `${http.baseUrl}/easyapi-socket`
  const socket = new SockJS(socketUrl.value)
  stompClient = Stomp.over(socket)
  stompClient.debug = null
  stompClient.connect({}, subscribe)
}

function subscribe() {
  stompClient.subscribe(
    `/topic/${formData.taxNumber}/nuonuo/print`,
    (message: any) => {
      const target = JSON.parse(message.body)
      invoiceDetail.category = target.category
      invoiceDetail.code = target.code
      invoiceDetail.number = target.number
      invoiceDetail.href = `webprint:"0,${target.printEncryptData}"`
      fullscreenLoading.value = false
      visible.value = true
    },
  )
  stompClient.subscribe(
    `/topic/${formData.taxNumber}/51fapiao/print`,
    (message: any) => {
      const target = JSON.parse(message.body)
      invoiceDetail.category = target.category
      invoiceDetail.code = target.code
      invoiceDetail.number = target.number
      invoiceDetail.href = target.printEncryptData
      fullscreenLoading.value = false
      visible.value = true
    },
  )
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
  const data = getCacheData(route.name as string)
  Object.assign(formData, data)
}

function gotoPath(url: string) {
  window.open(url, '_blank')
}

onMounted(() => {
  updateFormData()
})

useHead({
  title: '发票打印 - EasyAPI发票机器人',
})
</script>

<template>
  <div
    v-loading.fullscreen.lock="fullscreenLoading"
    class="page flex form-page"
  >
    <div class="form-info bg-white rounded">
      <el-form
        ref="ruleFormRef"
        :model="formData"
        :rules="formRules"
        label-width="auto"
      >
        <el-form-item label="企业税号：" prop="taxNumber">
          <el-input
            v-model="formData.taxNumber"
            placeholder="企业税号"
            maxlength="18"
            @input="saveChange"
          />
        </el-form-item>
        <el-form-item label="全电发票号码：" prop="allElectronicInvoiceNumber">
          <el-input
            v-model="formData.allElectronicInvoiceNumber"
            placeholder="全电发票号码长度为20位数字"
            maxlength="20"
            @input="saveChange"
          />
        </el-form-item>
        <el-form-item label="开票时间：" prop="makeDate">
          <client-only>
            <el-date-picker
              v-model="formData.makeDate"
              type="date"
              placeholder="请选择开票时间"
              value-format="YYYY-MM-DD"
              :disabled-date="disabledDate"
              @change="saveChange"
            />
          </client-only>
        </el-form-item>
        <!-- <el-form-item label="打印密钥回调：" prop="printCallbackUrl">
          <el-input
            v-model="formData.printCallbackUrl"
            placeholder=""
            @input="saveChange"
          />
          <p class="tips">仅诺诺发票打印需要回传打印密钥</p>
        </el-form-item> -->
        <el-form-item label="回调URL：" prop="callbackUrl">
          <el-input
            v-model="formData.callbackUrl"
            placeholder="回调URL"
            @input="saveChange"
          />
          <a href="https://hooks.upyun.com/" target="_blank">获取测试用回调URL</a>
        </el-form-item>
        <el-form-item label="机器人密钥：" prop="secretKey">
          <el-input
            v-model="formData.secretKey"
            placeholder="请输入机器人密钥"
            maxlength="8"
            @input="saveChange"
          />
          <a href="https://bangqu.easyapi.com/project/28385/document/31743/api/265137/text" target="_blank">如何获取机器人密钥</a>
        </el-form-item>
        <el-form-item>
          <client-only>
            <el-tooltip
              effect="dark"
              content="请先行登录"
              placement="top"
              :disabled="disable"
            >
              <el-button
                type="primary"
                :disabled="!disable"
                @click="onSubmit(ruleFormRef)"
              >
                发送
              </el-button>
            </el-tooltip>
          </client-only>
        </el-form-item>
      </el-form>
    </div>
    <div class="result-info">
      <Result :form-data="result" />
      <Callback :form-data="callback" />
    </div>
  </div>

  <el-dialog v-model="visible" :show-close="false" width="500" append-to-body>
    <template #header="{ close, titleId }">
      <div class="flex items-center justify-between border-b py-3 px-4">
        <div :id="titleId" class="text-sm font-semibold tracking-wide">
          温馨提示
        </div>
        <el-icon class="cursor-pointer" @click="close">
          <Close />
        </el-icon>
      </div>
    </template>
    <div class="px-4 font-normal tracking-wide">
      <p class="text-gray-400">
        请认真核对即将打印的纸质发票的（种类、代码、号码）信息是否与下方信息一致。如一致，请执行打印操作；如不一致，请予以更换。
      </p>
      <p class="leading-8 mt-2 tracking-wide">
        发票种类：{{ invoiceDetail.category }}
      </p>
      <p class="leading-8">
        发票代码：{{ invoiceDetail.code }}
      </p>
      <p class="leading-8 mb-2">
        发票号码：{{ invoiceDetail.number }}
      </p>
      <div class="text-gray-400">
        为确保您正常打印发票，请先下载安装
        <span
          class="cursor-pointer text-blue-400"
          @click="
            gotoPath(
              'https://www.nuonuo.com/nuonuo/web/mainbody/special/index.html?guid=3dedd2bf999b4de2a5d50e35ac7a2771',
            )
          "
        >
          打印助手
        </span>
        <span
          class="cursor-pointer text-blue-400"
          @click="
            gotoPath(
              'https://www.nuonuo.com/nuonuo/web/mainbody/special/index.html?guid=c0f3054219944a8fa56ad2fc534d3850',
            )
          "
        >
          使用说明
          <el-icon>
            <QuestionFilled />
          </el-icon>
        </span>
      </div>
    </div>
    <div class="mt-6 mb-4 text-center">
      <a
        :href="invoiceDetail.href"
        class="px-4 py-2 bg-blue-500 text-white rounded-sm"
      >发票打印</a>
    </div>
  </el-dialog>
</template>

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
