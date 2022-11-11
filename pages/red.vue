<template>
  <div class="page flex form-page">
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
        <el-form-item label="红冲原因：" prop="reason">
          <el-input v-model="formData.reason" placeholder="红冲原因" @input="saveChange" />
        </el-form-item>
        <el-form-item label="红字信息表编码：" prop="redSerialNo">
          <el-input v-model="formData.redSerialNo" placeholder="红字信息表编码" @input="saveChange" />
          <div class="tips">红字信息表编码：专票红冲时需申请红字信息表，此字段专票红冲时必填 3202201506013858</div>
        </el-form-item>
        <el-form-item label="回调地址：" prop="callbackUrl">
          <el-input v-model="formData.callbackUrl" placeholder="回调地址" @input="saveChange" />
          <a href="https://hooks.upyun.com/" target="_blank">获取测试用回调地址</a>
        </el-form-item>
        <el-form-item>
          <el-tooltip effect="dark" content="请先行登录" placement="top" :disabled="disable">
            <div>
              <el-button type="primary" :disabled="!disable" @click="onSubmit">发送</el-button>
            </div>
          </el-tooltip>
        </el-form-item>
      </el-form>
    </div>
    <div class="result-info">
      <result :formData="result" />
      <callback :formData="callback" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref, onMounted } from 'vue'
import { ElMessage } from 'element-plus'
import type { FormInstance, FormRules } from 'element-plus'
import { test } from '@/api/test'
import { setCacheData, getCacheData } from '@/utils/cacheData'

import Result from '@/components/Result.vue'
import Callback from '@/components/Callback.vue'

const token = useCookie('robotToken')
const route = useRoute()

const formData = reactive({
  taxNumber: '91320211MA1WML8X6T',
  outOrderNo: '',
  code: '',
  number: '',
  reason: '',
  redSerialNo: '',
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
  reason: [{ required: true, message: '红冲原因不能为空', trigger: 'change' }],
  callbackUrl: [{ required: true, message: '回调地址不能为空', trigger: 'change' }]
})

const disable = !!token.value

/**
 * 更新formData
 */
function updateFormData() {
  let data = getCacheData(route.name)
  formData.taxNumber = data.taxNumber
  formData.callbackUrl = data.callbackUrl
}

/**
 * 发送
 */
const onSubmit = async (formEl: FormInstance | undefined) => {
  if (!formEl) return
  await formEl.validate((valid, fields) => {
    if (valid) {
      test.redInvoice(formData).then(res => {
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

onMounted(() => {})

useHead({
  title: '发票红冲 - EasyAPI发票机器人'
})
</script>
