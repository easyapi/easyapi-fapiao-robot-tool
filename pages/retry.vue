<script setup lang="ts">import { useHead } from '@unhead/vue';
import { onMounted, reactive, ref } from 'vue'
import { ElMessage } from 'element-plus'
import type { FormInstance, FormRules } from 'element-plus'
import { useRoute } from 'vue-router'

import { test } from '@/api/test'
import { getCacheData, setCacheData } from '@/utils/cacheData'
import Result from '@/components/Result.vue'
import Callback from '@/components/Callback.vue'
import { invoiceCategoryList } from '~/utils/invoice-category'
import { invoiceColorList } from '~/utils/invoice-color'
import { getToken } from '~/utils/token'

const route = process.client ? useRoute() : {}

const ruleFormRef = ref<FormInstance>()

const formData = reactive({
  taxNumber: '91320211MA1WML8X6T',
  is51FaPiao: false,
  outOrderNo: '',
  purchaserName: '',
  price: '',
  category: '',
  color: '',
  orderDate: '',
  makeCallbackUrl: 'https://fapiao-api.easyapi.com/callback/retry/make',
  callbackUrl: '',
  secretKey: '',
})

const result = reactive({
  message: '',
  topic: '',
  webSocket: '',
})

function disabledDate(time: Date) {
  return time.getTime() > Date.now()
}

const callback = reactive({})

const formRules = reactive<FormRules>({
  outOrderNo: [
    { required: true, message: '商户订单号不能为空', trigger: 'change' },
  ],
  makeCallbackUrl: [
    { required: true, message: '开票回调URL不能为空', trigger: 'change' },
  ],
  callbackUrl: [
    { required: true, message: '回调URL不能为空', trigger: 'change' },
  ],
  secretKey: [{ required: true, message: '密钥不能为空', trigger: 'change' }],
  purchaserName: [
    { required: true, message: '购方名称不能为空', trigger: 'change' },
  ],
  price: [{ required: true, message: '开票不能为空', trigger: 'change' }],
  category: [
    {
      required: true,
      message: '请选择发票类型',
      trigger: 'change',
    },
  ],
  color: [
    {
      required: true,
      message: '请选择发票颜色',
      trigger: 'change',
    },
  ],
  orderDate: [
    {
      required: true,
      message: '请选择订单时间',
      trigger: 'change',
    },
  ],
})

const disable = !!getToken()

/**
 * 发送
 */
async function onSubmit(formEl: FormInstance | undefined) {
  if (!formEl)
    return
  await formEl.validate((valid) => {
    if (valid) {
      const data = JSON.parse(JSON.stringify(formData))
      if (!data.is51FaPiao) {
        delete data.purchaserName
        delete data.price
        delete data.category
        delete data.color
        delete data.orderDate
      }
      test.retryInvoice(data).then((res) => {
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

useHead({
  title: '重试开票 - EasyAPI发票机器人',
})
</script>

<template>
  <div class="page flex form-page">
    <div class="form-info bg-white rounded">
      <el-scrollbar height="100%">
        <div class="form-info_padding">
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
            <el-form-item label="是否51发票：">
              <el-checkbox v-model="formData.is51FaPiao" @change="saveChange" />
            </el-form-item>
            <el-form-item v-if="formData.is51FaPiao" label="商户订单号：">
              <el-input
                v-model="formData.outOrderNo"
                placeholder="商户订单号"
                @input="saveChange"
              />
            </el-form-item>
            <el-form-item
              v-if="!formData.is51FaPiao"
              label="商户订单号："
              prop="outOrderNo"
            >
              <el-input
                v-model="formData.outOrderNo"
                placeholder="商户订单号"
                @input="saveChange"
              />
            </el-form-item>
            <el-form-item
              v-if="formData.is51FaPiao"
              label="购方名称："
              prop="purchaserName"
            >
              <el-input
                v-model="formData.purchaserName"
                placeholder="购方名称"
                @input="saveChange"
              />
            </el-form-item>
            <el-form-item
              v-if="formData.is51FaPiao"
              label="开票金额："
              prop="price"
            >
              <el-input
                v-model="formData.price"
                placeholder="开票金额"
                @input="saveChange"
              />
            </el-form-item>
            <el-form-item
              v-if="formData.is51FaPiao"
              label="发票类型："
              prop="category"
            >
              <client-only>
                <el-select
                  v-model="formData.category"
                  placeholder="请选择发票类型"
                  filterable
                  size="default"
                  @change="saveChange"
                >
                  <el-option
                    v-for="item in invoiceCategoryList"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  />
                </el-select>
              </client-only>
            </el-form-item>
            <el-form-item
              v-if="formData.is51FaPiao"
              label="发票颜色："
              prop="color"
            >
              <client-only>
                <el-select
                  v-model="formData.color"
                  placeholder="请选择发票颜色"
                  filterable
                  size="default"
                  @change="saveChange"
                >
                  <el-option
                    v-for="item in invoiceColorList"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  />
                </el-select>
              </client-only>
            </el-form-item>
            <el-form-item
              v-if="formData.is51FaPiao"
              label="订单时间："
              prop="orderDate"
            >
              <el-date-picker
                v-model="formData.orderDate"
                type="date"
                placeholder="请选择订单时间"
                value-format="YYYY-MM-DD"
                :disabled-date="disabledDate"
                @change="saveChange"
              />
            </el-form-item>
            <el-form-item label="开票回调URL：" prop="makeCallbackUrl">
              <el-input
                v-model="formData.makeCallbackUrl"
                placeholder="重新发起开票回调URL"
                @input="saveChange"
              />
              <div class="tips">
                当重试的订单号不存在的时候，会回调该接口，服务端会重新推送开票信息
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
              <a
                href="https://bangqu.easyapi.com/project/28385/document/31743/api/265137/text"
                target="_blank"
              >如何获取机器人密钥</a>
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
      </el-scrollbar>
    </div>
    <view class="result-info">
      <Result :form-data="result" />
      <Callback :form-data="callback" />
    </view>
  </div>
</template>

<style scoped>
.form-info {
  padding: 0 !important;
}

.form-info_padding {
  padding: 20px;
}
</style>
