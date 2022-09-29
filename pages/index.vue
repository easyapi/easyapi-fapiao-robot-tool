<template>
  <div class="page flex invoicing">
    <div class="form-info bg-white">
      <el-form :model="formData" ref="ruleFormRef" :rules="formRules" label-width="150px">
        <el-row>
          <el-col :span="8">
            <el-form-item label="商户流水号：" prop="outOrderNo">
              <el-input v-model="formData.outOrderNo" />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="发票类别：" prop="category">
              <el-select v-model="formData.category" placeholder="请选择发票类别" filterable size="default">
                <el-option v-for="item in categoryList" :key="item.value" :label="item.label" :value="item.value" />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="购买方名称：" prop="purchaserName">
              <el-input v-model="formData.purchaserName" />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="纳税人识别号：" prop="purchaserTaxpayerNumber">
              <el-input v-model="formData.purchaserTaxpayerNumber" />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="购买方地址：" prop="purchaserAddress">
              <el-input v-model="formData.purchaserAddress" />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="购买方电话：" prop="purchaserPhone">
              <el-input v-model="formData.purchaserPhone" />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="购买方开户行：" prop="purchaserBank">
              <el-input v-model="formData.purchaserBank" />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="购买方开户行账号：" prop="purchaserBankAccount">
              <el-input v-model="formData.purchaserBankAccount" />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="销售方名称：" prop="sellerName">
              <el-input v-model="formData.sellerName" />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="销售方纳税人识别号：" prop="sellerTaxpayerNumber">
              <el-input v-model="formData.sellerTaxpayerNumber" />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="销售方地址：" prop="sellerAddress">
              <el-input v-model="formData.sellerAddress" />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="销售方电话：" prop="sellerPhone">
              <el-input v-model="formData.sellerPhone" />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="销售方银行：" prop="sellerBank">
              <el-input v-model="formData.sellerBank" />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="销售方银行账号：" prop="sellerBankAccount">
              <el-input v-model="formData.sellerBankAccount" />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="收款人名称：" prop="receiverName">
              <el-input v-model="formData.receiverName" />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="复核名称：" prop="checkerName">
              <el-input v-model="formData.checkerName" />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="收票人手机号码：" prop="drawerName">
              <el-input v-model="formData.drawerName" />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="收款人名称：" prop="mobile">
              <el-input v-model="formData.mobile" />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="电子发票接收邮箱：" prop="email">
              <el-input v-model="formData.email" />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="备注：" prop="remark">
              <el-input v-model="formData.remark" />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="回调客户地址URL：" prop="callbackUrl">
              <el-input v-model="formData.callbackUrl" />
              <a href="https://hooks.upyun.com/" target="_blank">获取测试用回调地址</a>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <el-table :data="formData.items">
        <el-table-column label="税收分类编码">
          <template #default="scope">
            <el-input v-model="scope.row.no" placeholder="税收分类编码" />
            <a href="https://fapiao.easyapi.com/taxcode.html" target="_blank">查找税收分类编码</a>
          </template>
        </el-table-column>
        <el-table-column label="商品名称">
          <template #default="scope">
            <el-input v-model="scope.row.name" placeholder="强输入商品名称" />
            <div class="tips">例如：*信息技术服务*技术服务费，其中技术服务费是商品名称</div>
          </template>
        </el-table-column>
        <el-table-column label="型号">
          <el-table-column label="单位">
            <template #default="scope">
              <el-input v-model="scope.row.model" placeholder="型号，例如红色" />
              <el-input v-model="scope.row.unit" placeholder="单位，例如次" />
            </template>
          </el-table-column>
        </el-table-column>
        <el-table-column label="数量">
          <el-table-column label="单价">
            <el-table-column label="金额">
              <template #default="scope">
                <el-input v-model.number="scope.row.number" placeholder="数量" @input="changeNumber(scope.$index)" />
                <el-input v-model.number="scope.row.price" placeholder="单价" @input="changePrice(scope.$index)" />
                <el-input v-model.number="scope.row.sum" placeholder="金额" @input="changeSum(scope.$index)" />
              </template>
            </el-table-column>
          </el-table-column>
        </el-table-column>
        <el-table-column label="含税折扣金额">
          <template #default="scope">
            <el-input v-model="scope.row.discount" placeholder="表示是否有折扣（默认为0）" />
          </template>
        </el-table-column>
        <el-table-column label="税率">
          <template #default="scope">
            <el-input v-model="scope.row.taxRate" placeholder="例如0.06" />
          </template>
        </el-table-column>
        <el-table-column label="优惠政策">
          <template #default="scope">
            <el-select v-model="scope.row.preferentialPolicyFlag" placeholder="选择优惠政策">
              <el-option v-for="item in preferentialPolicyFlagList" :key="item.value" :label="item.label" :value="item.value" />
            </el-select>
            <el-select v-if="scope.row.preferentialPolicyFlag === 1" v-model="scope.row.zeroRateFlag" placeholder="选择优惠政策">
              <el-option v-for="item in zeroRateFlagList" :key="item.value" :label="item.label" :value="item.value" />
            </el-select>
            <el-select v-if="scope.row.preferentialPolicyFlag === 1" v-model="scope.row.preferentialPolicyName" placeholder="增值税特殊管理">
              <el-option v-for="item in specials" :key="item.value" :label="item.label" :value="item.value" />
            </el-select>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="100">
          <template #default="scope">
            <el-button type="text" @click="addItem">添加</el-button>
            <el-button type="danger" v-if="scope.$index != 0" link @click="deleteItem(scope.$index)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-button class="invoicing-btn" type="primary" @click="onSubmit(ruleFormRef)">发送</el-button>
    </div>
    <div class="result-info bg-white">
      <div class="title">WebSocket地址：</div>
      <el-input v-model="formData.webSocket" />
      <div class="title">Subscribe订阅主题：</div>
      <el-input v-model="formData.topic" />
      <div class="title">下发内容：</div>
      <el-input type="textarea" v-model="formData.message" :autosize="{ minRows: 9, maxRows: 8 }" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import { ElMessage } from 'element-plus'
import type { FormInstance, FormRules } from 'element-plus'
import { test } from '../api/test'

const ruleFormRef = ref<FormInstance>()

const formData = reactive({
  category: '增值税电子普通发票',
  outOrderNo: 'TOOL' + new Date().getTime(),
  purchaserName: '深圳市腾讯计算机系统有限公司',
  purchaserTaxpayerNumber: '91440300708461136T',
  purchaserAddress: '',
  purchaserPhone: '',
  purchaserBank: '',
  purchaserBankAccount: '',
  sellerName: '无锡帮趣数据服务有限公司',
  sellerTaxpayerNumber: '91320211MA1WML8X6T',
  sellerAddress: '地址电话：无锡市滨湖区吟白路1号超级计算无锡中心6楼',
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
  webSocket: '',
  topic: '',
  message: '',
  items: [
    {
      no: '',
      name: '',
      model: '',
      unit: '',
      number: null,
      price: null,
      sum: null,
      discount: 0,
      taxRate: null,
      preferentialPolicyFlag: '',
      zeroRateFlag: '',
      preferentialPolicyName: ''
    }
  ]
})

const categoryList = [
  { value: '增值税电子普通发票', label: '增值税电子普通发票' },
  { value: '增值税普通发票', label: '增值税普通发票' },
  { value: '增值税电子专用发票', label: '增值税电子专用发票' },
  { value: '增值税专用发票', label: '增值税专用发票' }
]

const preferentialPolicyFlagList = [
  { value: '', label: '不使用优惠政策' },
  { value: 1, label: '使用优惠政策' }
]

const zeroRateFlagList = [
  { value: '', label: '非零税率' },
  { value: '0', label: '出口零税' },
  { value: '1', label: '免税' },
  { value: '2', label: '不征税' },
  { value: '3', label: '普通零税率' }
]
const specials = [
  { value: '100%先征后退', label: '100%先征后退' },
  { value: '50%先征后退', label: '50%先征后退' },
  { value: '不征税', label: '不征税' },
  { value: '先征后退', label: '先征后退' },
  { value: '免税', label: '免税' },
  { value: '即征即退100%', label: '即征即退100%' },
  { value: '即征即退30%', label: '即征即退30%' },
  { value: '即征即退50%', label: '即征即退50%' },
  { value: '即征即退70%', label: '即征即退70%' },
  { value: '按3%简易征收', label: '按3%简易征收' },
  { value: '按5%简易征收', label: '按5%简易征收' },
  { value: '按5%简易征收减按1.5%计征', label: '按5%简易征收减按1.5%计征' },
  { value: '按5%简易征收减按3%计征', label: '按5%简易征收减按3%计征' },
  { value: '稀土产品', label: '稀土产品' },
  { value: '简易征收', label: '简易征收' },
  { value: '超税负12%即征即退', label: '超税负12%即征即退' },
  { value: '超税负3%即征即退', label: '超税负3%即征即退' },
  { value: '超税负8%即征即退', label: '超税负8%即征即退' }
]

const formRules = reactive<FormRules>({
  outOrderNo: [{ required: true, message: '商户订单号不能为空', trigger: 'change' }],
  purchaserName: [{ required: true, message: '购买方名称不能为空', trigger: 'change' }],
  sellerName: [{ required: true, message: '销售方名称不能为空', trigger: 'change' }],
  sellerTaxpayerNumber: [{ required: true, message: '销售方纳税人识别号不能为空', trigger: 'change' }],
  email: [{ required: true, message: '电子发票接收邮箱不能为空', trigger: 'change' }],
  callbackUrl: [{ required: true, message: '回调客户地址URL不能为空', trigger: 'change' }]
})

/**
 * 修改商品明细数量
 */
function changeNumber(index) {
  if (!formData.items[index].number) {
    formData.items[index].sum = null
    return
  }
  if (formData.items[index].price) {
    //计算小计（保留2位小数）
    formData.items[index].sum = Number(formData.items[index].number) * Number(formData.items[index].price)
    return
  }
  if (formData.items[index].sum) {
    //并且数量有值，计算单价（保留8为小数）
    formData.items[index].price = Number(formData.items[index].sum) / Number(formData.items[index].number)
  }
}
/**
 * 修改商品明细单价
 */
function changePrice(index) {
  if (!formData.items[index].price) {
    formData.items[index].sum = null
    return
  }
  if (formData.items[index].number) {
    //计算小计（保留2位小数）
    formData.items[index].sum = Number(formData.items[index].number) * Number(formData.items[index].price)
    return
  }
  if (formData.items[index].sum) {
    //计算数量
    formData.items[index].number = Number(formData.items[index].sum) / Number(formData.items[index].price)
  }
}

/**
 * 修改商品明细小计
 */
function changeSum(index) {
  if (formData.items[index].sum) {
    formData.items[index].price = null
    return
  }
  if (formData.items[index].number) {
    //并且数量有值，计算单价（保留8为小数）
    formData.items[index].price = Number(formData.items[index].sum) / Number(formData.items[index].number)
    return
  }
  if (formData.items[index].price) {
    formData.items[index].number = 1
  }
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
    taxRate: null,
    preferentialPolicyFlag: '',
    zeroRateFlag: '',
    preferentialPolicyName: ''
  })
}

/**
 * 删除
 */
function deleteItem(index) {
  formData.items.splice(index, 1)
}

/**
 * 发送
 */
const onSubmit = async (formEl: FormInstance | undefined) => {
  if (formData.category.indexOf('专用')) {
  }
  if (!formEl) return
  await formEl.validate((valid, fields) => {
    if (valid) {
      formData.items.forEach((item, index) => {
        if (
          item.no == '' &&
          item.name === '' &&
          item.model === '' &&
          item.unit === '' &&
          item.number === '' &&
          item.price === '' &&
          item.sum === '' &&
          item.taxRate === '' &&
          item.preferentialPolicyFlag === '' &&
          item.zeroRateFlag === '' &&
          item.preferentialPolicyName === ''
        ) {
          formData.items.splice(index, 1)
        }
      })
      test.makeInvoice(formData).then(res => {
        if (res.code === 1) {
          formData.message = res.content.message
          formData.topic = res.content.topic
          formData.webSocket = res.content.webSocket
          ElMessage({
            type: 'success',
            message: res.message
          })
        }
      })
    }
  })
}

useHead: ({
  title: '开具发票 - EasyAPI开票机器人'
})
</script>

<style>
.invoicing .form-info {
  width: 74%;
  padding: 20px;
  overflow: auto;
}

.invoicing .form-info .tips {
  font-size: 12px;
  color: #a2a2a2;
}

.invoicing .result-info {
  padding: 20px;
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

.invoicing .invoicing-btn {
  margin-top: 15px;
}
a {
  font-size: 12px;
  color: #409eff;
  cursor: pointer;
}
</style>
