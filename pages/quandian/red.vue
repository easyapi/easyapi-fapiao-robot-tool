<script setup lang="ts">
import type { FormInstance, FormRules } from 'element-plus'
import { ElMessage } from 'element-plus'
import { onMounted, reactive, ref } from 'vue'
import { useRoute } from 'vue-router'
import { test } from '@/api/test'
import Callback from '@/components/Callback.vue'

import Result from '@/components/Result.vue'
import { getCacheData, setCacheData } from '@/utils/cacheData'
import { getToken } from '~/utils/token'

const route = process.client ? useRoute() : {}

const ruleFormRef = ref<FormInstance>()

const formData = reactive({
  taxNumber: '91310113091845702A',
  allElectronicInvoiceNumber: '',
  makeDate: '',
  reason: '',
  redSerialNo: '',
  callbackUrl: '',
  secretKey: '',
})

function disabledDate(time: Date) {
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
    { required: true, message: '数电发票号码不能为空', trigger: 'change' },
  ],
  makeDate: [
    { required: true, message: '开票时间不能为空', trigger: 'change' },
  ],
  reason: [{ required: true, message: '红冲原因不能为空', trigger: 'change' }],
  callbackUrl: [
    { required: true, message: '回调URL不能为空', trigger: 'change' },
  ],
  secretKey: [{ required: true, message: '密钥不能为空', trigger: 'change' }],
})

const disable = !!getToken()

/**
 * 更新formData
 */
function updateFormData() {
  const data = getCacheData(route.name as string)
  Object.assign(formData, data)
}

/**
 * 发送
 */
async function onSubmit(formEl: FormInstance | undefined) {
  if (!formEl)
    return
  await formEl.validate((valid) => {
    if (valid) {
      test.redInvoice(formData).then((res) => {
        if (res.code === 1) {
          Object.assign(result, res.content)
          ElMessage({
            type: 'success',
            message: res.message,
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
  setCacheData(route.name as string, formData)
}

onMounted(() => {
  updateFormData()
})

useHead({
  title: '发票红冲',
})
</script>

<template>
  <div class="page flex form-page">
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
        <el-form-item label="数电发票号码：" prop="allElectronicInvoiceNumber">
          <el-input
            v-model="formData.allElectronicInvoiceNumber"
            placeholder="数电发票号码长度为20位数字"
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
        <el-form-item label="红冲原因：" prop="reason">
          <el-input
            v-model="formData.reason"
            placeholder="红冲原因"
            @input="saveChange"
          />
        </el-form-item>
        <el-form-item label="红字信息表编码：" prop="redSerialNo">
          <el-input
            v-model="formData.redSerialNo"
            placeholder="红字信息表编码"
            @input="saveChange"
          />
          <div class="tips">
            红字信息表编码：专票红冲时需申请红字信息表，此字段专票红冲时必填
            3202201506013858
          </div>
        </el-form-item>
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
</template>
