<script setup lang="ts">
import { onMounted, reactive, ref } from 'vue'
import { ElMessage } from 'element-plus'
import type { FormInstance, FormRules } from 'element-plus'
import { test } from '@/api/test'
import { getCacheData, setCacheData } from '@/utils/cacheData'
import Result from '@/components/Result.vue'
import Callback from '@/components/Callback.vue'

const token = useCookie('robotToken')
const route = useRoute()
const ruleFormRef = ref<FormInstance>()

const formData = reactive({
  taxNumber: '91320211MA1WML8X6T',
  allElectronicInvoiceNumber: '',
  makeDate: '',
  callbackUrl: '',
})

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
    { required: true, message: '回调地址不能为空', trigger: 'change' },
  ],
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
      test.queryInvoice(formData).then((res) => {
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

/**
 * 更新formData
 */
function updateFormData() {
  const data = getCacheData(route.name as string)
  Object.assign(formData, data)
}

onMounted(() => {
  updateFormData()
})

useHead({
  title: '同步查询 - EasyAPI发票机器人',
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
        <el-form-item label="全电发票号码：" prop="allElectronicInvoiceNumber">
          <el-input
            v-model="formData.allElectronicInvoiceNumber"
            placeholder="请输入全电发票代码"
            @input="saveChange"
          />
        </el-form-item>
        <el-form-item label="开票时间：" prop="makeDate">
          <el-date-picker
            v-model="formData.makeDate"
            type="date"
            placeholder="请选择开票时间"
            value-format="YYYY-MM-DD"
            @change="saveChange"
          />
        </el-form-item>
        <el-form-item label="回调地址：" prop="callbackUrl">
          <el-input
            v-model="formData.callbackUrl"
            placeholder="回调地址"
            @input="saveChange"
          />
          <a href="https://hooks.upyun.com/" target="_blank">获取测试用回调地址</a>
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
