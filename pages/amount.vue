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
  callbackUrl: '',
  secretKey: '',
})

const result = reactive({
  message: '',
  topic: '',
  webSocket: '',
})

const callback = reactive({})

const formRules = reactive<FormRules>({
  taxNumber: [{ required: true, message: '企业税号不能为空', trigger: 'change' }],
  callbackUrl: [{ required: true, message: '回调URL不能为空', trigger: 'change' }],
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
      test.amountShop(formData).then((res) => {
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
 * 更新formData
 */
function updateFormData() {
  const data = getCacheData(route.name as string)
  Object.assign(formData, data)
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

useHead({ title: '发票库存查询 - EasyAPI发票机器人' })
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
