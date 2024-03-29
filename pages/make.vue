<script setup lang="ts">
import { useHead } from "@unhead/vue";
import type { FormInstance, FormRules } from 'element-plus'
import { ElMessage } from 'element-plus'
import type { integer } from 'vscode-languageserver-types'
import { onMounted, reactive, ref } from 'vue'
import { useRoute } from 'vue-router'
import { getCacheData, setCacheData } from '@/utils/cacheData'
import Result from '@/components/Result.vue'
import Callback from '@/components/Callback.vue'
import { test } from '@/api/test'
import { invoiceCategoryList } from '~/utils/invoice-category'
import { preferentialPolicyFlagList, preferentialPolicyNameList, zeroRateFlagList } from '~/utils/invoice-item'
import { getToken } from '~/utils/token'

const route = process.client ? useRoute() : {}

const ruleFormRef = ref<FormInstance>()

const disable = !!getToken()

const formData = reactive({
  category: '增值税电子普通发票',
  outOrderNo: '',
  purchaserName: '深圳市腾讯计算机系统有限公司',
  purchaserTaxpayerNumber: '91440300708461136T',
  purchaserAddress: '',
  purchaserPhone: '',
  purchaserBank: '',
  purchaserBankAccount: '',
  sellerName: '无锡帮趣数据服务有限公司',
  sellerTaxpayerNumber: '91320211MA1WML8X6T',
  sellerAddress: '无锡市滨湖区吟白路1号超级计算无锡中心6楼',
  sellerPhone: '0510-85180020',
  sellerBank: '建设银行无锡滨湖支行',
  sellerBankAccount: '32050161483600001096',
  receiverName: '',
  checkerName: '',
  drawerName: '',
  mobile: '',
  email: '',
  remark: '',
  callbackUrl: '',
  secretKey: '',
  webSocket: '',
  topic: '',
  message: '',
  items: [
    {
      no: '',
      name: '',
      model: '',
      unit: '',
      number: null as any,
      price: null as any,
      sum: null as any,
      discount: 0,
      taxRate: 0.03,
      preferentialPolicyFlag: '',
      zeroRateFlag: '',
      preferentialPolicyName: '',
    },
  ],
})

const result = reactive({
  message: '',
  topic: '',
  webSocket: '',
})

const callback = reactive({
  content: '',
})

const formRules = reactive<FormRules>({
  outOrderNo: [
    { required: true, message: '商户订单号不能为空', trigger: 'change' },
  ],
  purchaserName: [
    { required: true, message: '购方名称不能为空', trigger: 'change' },
  ],
  sellerName: [
    { required: true, message: '销方名称不能为空', trigger: 'change' },
  ],
  sellerTaxpayerNumber: [
    { required: true, message: '销方纳税人识别号不能为空', trigger: 'change' },
  ],
  email: [
    { required: true, message: '电子发票接收邮箱不能为空', trigger: 'change' },
    {
      pattern: /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/,
      message: '请输入有效的邮箱',
      trigger: 'change',
    },
  ],
  callbackUrl: [
    { required: true, message: '回调URL不能为空', trigger: 'change' },
  ],
  secretKey: [{ required: true, message: '密钥不能为空', trigger: 'change' }],
})

/**
 * 修改商品明细数量
 */
function changeNumber(index: integer) {
  if (!formData.items[index].number) {
    formData.items[index].sum = null
    return
  }
  if (formData.items[index].price) {
    // 计算小计（保留2位小数）
    formData.items[index].sum
      = Number(formData.items[index].number) * Number(formData.items[index].price)
    return
  }
  if (formData.items[index].sum) {
    // 并且数量有值，计算单价（保留8为小数）
    formData.items[index].price
      = Number(formData.items[index].sum) / Number(formData.items[index].number)
  }
  setCacheData(route.name as string, formData)
}

/**
 * 修改商品明细单价
 */
function changePrice(index: integer) {
  if (!formData.items[index].price) {
    formData.items[index].sum = null
    return
  }
  if (formData.items[index].number) {
    // 计算小计（保留2位小数）
    formData.items[index].sum
      = Number(formData.items[index].number) * Number(formData.items[index].price)
    return
  }
  if (formData.items[index].sum) {
    // 计算数量
    formData.items[index].number
      = Number(formData.items[index].sum) / Number(formData.items[index].price)
  }
  setCacheData(route.name as string, formData)
}

/**
 * 修改商品明细小计
 */
function changeSum(index: integer) {
  if (formData.items[index].sum) {
    formData.items[index].price = null
    return
  }
  if (formData.items[index].number) {
    // 并且数量有值，计算单价（保留8为小数）
    formData.items[index].price
      = Number(formData.items[index].sum) / Number(formData.items[index].number)
    return
  }
  if (formData.items[index].price)
    formData.items[index].number = 1

  setCacheData(route.name as string, formData)
}

/**
 *添加
 */
function addItem() {
  formData.items.push({
    no: '',
    name: '',
    model: '',
    unit: '',
    number: null,
    price: null,
    sum: null,
    discount: 0,
    taxRate: 0.03,
    preferentialPolicyFlag: '',
    zeroRateFlag: '',
    preferentialPolicyName: '',
  })
}

/**
 * 删除
 */
function deleteItem(index: integer) {
  formData.items.splice(index, 1)
}

/**
 * 缓存记录数据
 */
function saveChange(type: string, idx: any) {
  if (type === '优惠政策') {
    if (formData.items[idx].preferentialPolicyFlag === '') {
      formData.items[idx].zeroRateFlag = ''
      formData.items[idx].preferentialPolicyName = ''
    }
  }
  setCacheData(route.name as string, formData)
}

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
  if (formData.category.indexOf('专用')) {
    // todo
  }
  if (!formEl)
    return

  await formEl.validate((valid) => {
    if (valid) {
      formData.items.forEach((item, index) => {
        if (
          item.no === ''
          && item.name === ''
          && item.model === ''
          && item.unit === ''
          && item.number === ''
          && item.price === ''
          && item.sum === ''
          && item.preferentialPolicyFlag === ''
          && item.zeroRateFlag === ''
          && item.preferentialPolicyName === ''
        )
          formData.items.splice(index, 1)
      })
      test.makeInvoice(formData).then((res) => {
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

onMounted(() => {
  updateFormData()
  formData.outOrderNo = `TOOL${new Date().getTime()}`
})

useHead({
  title: '开具发票',
})
</script>

<template>
  <div class="page flex invoicing">
    <div class="form-info bg-white rounded">
      <el-scrollbar height="100%">
        <div class="form-info_padding">
          <el-form
            ref="ruleFormRef"
            :model="formData"
            :rules="formRules"
            label-width="150px"
          >
            <el-row>
              <el-col :span="8">
                <el-form-item label="商户流水号：" prop="outOrderNo">
                  <el-input v-model="formData.outOrderNo" @input="saveChange" />
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="发票类别：" prop="category">
                  <client-only>
                    <el-select
                      v-model="formData.category"
                      placeholder="请选择发票类别"
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
              </el-col>
              <el-col :span="8">
                <el-form-item label="购方名称：" prop="purchaserName">
                  <el-input
                    v-model="formData.purchaserName"
                    @input="saveChange"
                  />
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item
                  label="纳税人识别号："
                  prop="purchaserTaxpayerNumber"
                >
                  <el-input
                    v-model="formData.purchaserTaxpayerNumber"
                    maxlength="18"
                    @input="saveChange"
                  />
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="购方地址：" prop="purchaserAddress">
                  <el-input
                    v-model="formData.purchaserAddress"
                    @input="saveChange"
                  />
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="购方电话：" prop="purchaserPhone">
                  <el-input
                    v-model="formData.purchaserPhone"
                    @input="saveChange"
                  />
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="购方开户行：" prop="purchaserBank">
                  <el-input
                    v-model="formData.purchaserBank"
                    @input="saveChange"
                  />
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item
                  label="购方开户行账号："
                  prop="purchaserBankAccount"
                >
                  <el-input
                    v-model="formData.purchaserBankAccount"
                    @input="saveChange"
                  />
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="销方名称：" prop="sellerName">
                  <el-input v-model="formData.sellerName" @input="saveChange" />
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item
                  label="销方纳税人识别号："
                  prop="sellerTaxpayerNumber"
                >
                  <el-input
                    v-model="formData.sellerTaxpayerNumber"
                    maxlength="18"
                    @input="saveChange"
                  />
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="销方地址：" prop="sellerAddress">
                  <el-input
                    v-model="formData.sellerAddress"
                    @input="saveChange"
                  />
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="销方电话：" prop="sellerPhone">
                  <el-input
                    v-model="formData.sellerPhone"
                    @input="saveChange"
                  />
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="销方银行：" prop="sellerBank">
                  <el-input v-model="formData.sellerBank" @input="saveChange" />
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="销方银行账号：" prop="sellerBankAccount">
                  <el-input
                    v-model="formData.sellerBankAccount"
                    @input="saveChange"
                  />
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="收款人名称：" prop="receiverName">
                  <el-input
                    v-model="formData.receiverName"
                    @input="saveChange"
                  />
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="复核名称：" prop="checkerName">
                  <el-input
                    v-model="formData.checkerName"
                    @input="saveChange"
                  />
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="收款人名称：" prop="drawerName">
                  <el-input
                    v-model="formData.drawerName"
                    @input="saveChange"
                  />
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="邮箱：" prop="email">
                  <el-input
                    v-model="formData.email"
                    placeholder="用来接收电子发票发送邮件（免费）"
                    @input="saveChange"
                  />
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="手机号码：" prop="mobile">
                  <el-input v-model="formData.mobile" placeholder="用来接收发票手机短消息（单独付费）" @input="saveChange" />
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="备注：" prop="remark">
                  <el-input v-model="formData.remark" @input="saveChange" />
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="机器人密钥：" prop="secretKey">
                  <el-input
                    v-model="formData.secretKey"
                    placeholder="请输入机器人密钥"
                    maxlength="8"
                    @input="saveChange"
                  />
                  <a href="https://bangqu.easyapi.com/project/28385/document/31743/api/265137/text" target="_blank">如何获取机器人密钥</a>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="回调URL：" prop="callbackUrl">
                  <el-input
                    v-model="formData.callbackUrl"
                    placeholder="回传开票结果"
                    @input="saveChange"
                  />
                  <a href="https://hooks.upyun.com/" target="_blank">获取测试用回调URL</a>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
          <el-table :data="formData.items">
            <el-table-column label="税收分类编码">
              <template #default="scope">
                <el-input
                  v-model="scope.row.no"
                  placeholder="税收分类编码"
                  @input="saveChange"
                />
                <a
                  href="https://fapiao.easyapi.com/taxcode.html"
                  target="_blank"
                >查找税收分类编码</a>
              </template>
            </el-table-column>
            <el-table-column label="商品名称">
              <template #default="scope">
                <el-input
                  v-model="scope.row.name"
                  placeholder="请输入商品名称"
                  @input="saveChange"
                />
                <div class="tips">
                  例如：*信息技术服务*技术服务费，其中技术服务费是商品名称
                </div>
              </template>
            </el-table-column>
            <el-table-column label="型号" width="3">
              <el-table-column label="单位">
                <template #default="scope">
                  <el-input
                    v-model="scope.row.model"
                    placeholder="型号，例如红色"
                    @input="saveChange"
                  />
                  <el-input
                    v-model="scope.row.unit"
                    placeholder="单位，例如次"
                    @input="saveChange"
                  />
                </template>
              </el-table-column>
            </el-table-column>
            <el-table-column label="数量">
              <el-table-column label="单价">
                <el-table-column label="金额">
                  <template #default="scope">
                    <el-input
                      v-model.number="scope.row.number"
                      placeholder="数量"
                      @input="changeNumber(scope.$index)"
                    />
                    <el-input
                      v-model.number="scope.row.price"
                      placeholder="单价"
                      @input="changePrice(scope.$index)"
                    />
                    <el-input
                      v-model.number="scope.row.sum"
                      placeholder="金额"
                      @input="changeSum(scope.$index)"
                    />
                  </template>
                </el-table-column>
              </el-table-column>
            </el-table-column>
            <el-table-column label="含税折扣金额">
              <template #default="scope">
                <el-input
                  v-model="scope.row.discount"
                  placeholder="表示是否有折扣（默认为0）"
                  @input="saveChange"
                />
              </template>
            </el-table-column>
            <el-table-column label="税率">
              <template #default="scope">
                <el-input
                  v-model="scope.row.taxRate"
                  placeholder="例如0.06"
                  @input="saveChange"
                />
              </template>
            </el-table-column>
            <el-table-column label="优惠政策">
              <template #default="scope">
                <el-select
                  v-model="scope.row.preferentialPolicyFlag"
                  placeholder="选择优惠政策"
                  @change="saveChange('优惠政策', scope.$index)"
                >
                  <el-option
                    v-for="item in preferentialPolicyFlagList"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  />
                </el-select>
                <el-select
                  v-if="scope.row.preferentialPolicyFlag === 1"
                  v-model="scope.row.zeroRateFlag"
                  placeholder="选择优惠政策"
                  @change="saveChange"
                >
                  <el-option
                    v-for="item in zeroRateFlagList"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  />
                </el-select>
                <el-select
                  v-if="scope.row.preferentialPolicyFlag === 1"
                  v-model="scope.row.preferentialPolicyName"
                  placeholder="增值税特殊管理"
                  @change="saveChange"
                >
                  <el-option
                    v-for="item in preferentialPolicyNameList"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  />
                </el-select>
              </template>
            </el-table-column>
            <el-table-column label="操作" width="100">
              <template #default="scope">
                <el-button text type="primary" @click="addItem">
                  添加
                </el-button>
                <el-button
                  v-if="scope.$index !== 0"
                  type="danger"
                  link
                  @click="deleteItem(scope.$index)"
                >
                  删除
                </el-button>
              </template>
            </el-table-column>
          </el-table>
          <client-only>
            <el-tooltip
              class="box-item"
              effect="dark"
              content="请先行登录"
              placement="top"
              :disabled="disable"
            >
              <div class="outer-frame">
                <el-button type="primary" @click="onSubmit(ruleFormRef)">
                  发送
                </el-button>
              </div>
            </el-tooltip>
          </client-only>
        </div>
      </el-scrollbar>
    </div>
    <div class="result-info">
      <Result :form-data="result" />
      <Callback :form-data="callback" />
    </div>
  </div>
</template>

<style scoped>
.invoicing .form-info {
  width: 74%;
  overflow: auto;
}

.form-info_padding {
  padding: 20px;
}

.invoicing .form-info .tips {
  font-size: 12px;
  color: #a2a2a2;
}

.invoicing .result-info {
  width: 25%;
  display: flex;
  flex-direction: column;
  margin-left: 20px;
}

.invoicing .title {
  font-size: 12px;
  color: #606266;
  font-weight: 500;
  margin: 8px 0;
}

.invoicing .el-table .el-input {
  margin: 5px 0;
}
</style>
