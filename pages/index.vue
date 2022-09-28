<template>
  <div class="page flex invoicing">
    <div class="form-info bg-white">
      <el-form :model="formData" ref="form" :rules="formRules" label-width="150px">
        <el-row>
          <el-col :span="8">
            <el-form-item label="商户流水号：" prop="outOrderNo">
              <el-input v-model="formData.outOrderNo" />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="发票类别：" prop="category">
              <el-select v-model="formData.category">
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
            <el-form-item label="发票右下角备注：" prop="remark">
              <el-input v-model="formData.remark" />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="回调客户地址URL：" prop="callbackUrl">
              <el-input v-model="formData.callbackUrl" />
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <el-table :data="formData.items">
        <el-table-column label="税收分类编码">
          <template #default="scope">
            <el-input v-model="scope.row.no" placeholder="税收分类编码" />
          </template>
        </el-table-column>
        <el-table-column label="商品名称">
          <template #default="scope">
            <el-input v-model="scope.row.name" placeholder="商品名称" />
          </template>
        </el-table-column>
        <el-table-column label="型号">
          <el-table-column label="单位">
            <template #default="scope">
              <el-input v-model="scope.row.model" placeholder="型号" />
              <el-input v-model="scope.row.unit" placeholder="单位" />
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
            <el-input v-model="scope.row.discount" placeholder="含税折扣金额" />
          </template>
        </el-table-column>
        <el-table-column label="税率">
          <template #default="scope">
            <el-input v-model="scope.row.taxRate" placeholder="税率" />
          </template>
        </el-table-column>
        <el-table-column label="税额">
          <template #default="scope">
            <el-input v-model="scope.row.tax" placeholder="税额" />
          </template>
        </el-table-column>
        <el-table-column label="优惠政策">
          <template #default="scope">
            <el-select v-model="scope.row.preferentialPolicyFlag" placeholder="选择优惠政策">
              <el-option v-for="item in preferentialPolicyFlagList" :key="item.value" :label="item.label" :value="item.value" />
            </el-select>
            <el-select v-if="scope.row.preferentialPolicyFlag == 1" v-model="scope.row.zeroRateFlag" placeholder="选择优惠政策">
              <el-option v-for="item in zeroRateFlagList" :key="item.value" :label="item.label" :value="item.value" />
            </el-select>
            <el-input v-if="scope.row.preferentialPolicyFlag == 1" v-model="scope.row.preferentialPolicyName" placeholder="增值税特殊管理" />
          </template>
        </el-table-column>
        <el-table-column label="操作" width="100">
          <template #default="scope">
            <el-button type="text" @click="addObj">添加</el-button>
            <el-button type="danger" v-if="scope.$index != 0" link @click="deleteObj(scope.$index)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-button class="invoicing-btn" type="primary" @click="onSubmit">发送</el-button>
    </div>
    <div class="orther-info bg-white">
      <div class="title">WebSocket地址：</div>
      <el-input v-model="formData.webSocket" />
      <div class="title">Subscribe订阅主题：</div>
      <el-input v-model="formData.topic" />
      <div class="title">下发内容：</div>
      <el-input type="textarea" v-model="formData.message" :autosize="{ minRows: 9, maxRows: 8 }" />
    </div>
  </div>
</template>

<script>
import { ElMessage } from 'element-plus'
import { test } from '../api/test'
export default {
  data() {
    return {
      menuList: [],
      formData: {
        items: [
          {
            no: '',
            name: '',
            model: '',
            unit: '',
            number: '',
            price: '',
            sum: '',
            discount: '',
            taxRate: '',
            tax: '',
            preferentialPolicyFlag: '',
            zeroRateFlag: '',
            preferentialPolicyName: ''
          }
        ]
      },
      categoryList: [
        { value: '增值税电子普通发票', label: '增值税电子普通发票' },
        { value: '增值税普通发票', label: '增值税普通发票' },
        { value: '增值税电子专用发票', label: '增值税电子专用发票' },
        { value: '增值税专用发票', label: '增值税专用发票' }
      ],
      preferentialPolicyFlagList: [
        { value: '', label: '不使用优惠政策' },
        { value: '1', label: '使用优惠政策' }
      ],
      zeroRateFlagList: [
        { value: '', label: '非零税率' },
        { value: '0', label: '出口零税' },
        { value: '1', label: '免税' },
        { value: '2', label: '不征税' },
        { value: '3', label: '普通零税率' }
      ],
      formRules: {
        outOrderNo: [{ required: true, message: '商户订单号不能为空', trigger: 'change' }],
        category: [{ required: true, message: '发票类别不能为空', trigger: 'change' }],
        purchaserName: [{ required: true, message: '购买方名称不能为空', trigger: 'change' }],
        purchaserTaxpayerNumber: [{ required: true, message: '纳税人识别号不能为空', trigger: 'change' }],
        purchaserAddress: [{ required: true, message: '购买方地址不能为空', trigger: 'change' }],
        purchaserPhone: [{ required: true, message: '购买方电话不能为空', trigger: 'change' }],
        purchaserBank: [{ required: true, message: '购买方开户行不能为空', trigger: 'change' }],
        purchaserBankAccount: [{ required: true, message: '购买方开户行账号不能为空', trigger: 'change' }],
        sellerName: [{ required: true, message: '销售方名称不能为空', trigger: 'change' }],
        sellerTaxpayerNumber: [{ required: true, message: '销售方纳税人识别号不能为空', trigger: 'change' }],
        sellerAddress: [{ required: true, message: '销售方地址不能为空', trigger: 'change' }],
        sellerPhone: [{ required: true, message: '销售方电话不能为空', trigger: 'change' }],
        sellerBank: [{ required: true, message: '销售方银行不能为空', trigger: 'change' }],
        sellerBankAccount: [{ required: true, message: '销售方银行账号不能为空', trigger: 'change' }],
        receiverName: [{ required: true, message: '收款人名称不能为空', trigger: 'change' }],
        checkerName: [{ required: true, message: '复核名称不能为空', trigger: 'change' }],
        drawerName: [{ required: true, message: '收票人手机号码不能为空', trigger: 'change' }],
        mobile: [{ required: true, message: '收款人名称不能为空', trigger: 'change' }],
        email: [{ required: true, message: '电子发票接收邮箱不能为空', trigger: 'change' }],
        remark: [{ required: true, message: '发票右下角备注不能为空', trigger: 'change' }],
        callbackUrl: [{ required: true, message: '回调客户地址URL不能为空', trigger: 'change' }]
      }
    }
  },
  head: {
    title: '开具发票 - EasyAPI开票机器人'
  },

  mounted() {},
  methods: {
    /**
     * 修改商品明细数量
     */
    changeNumber(index) {
      if (!this.formData.items[index].number) {
        this.formData.items[index].sum = null
        return
      }
      if (this.formData.items[index].price) {
        //计算小计（保留2位小数）
        this.formData.items[index].sum = Number(this.formData.items[index].number) * Number(this.formData.items[index].price)
        return
      }
      if (this.formData.items[index].sum) {
        //并且数量有值，计算单价（保留8为小数）
        this.formData.items[index].price = Number(this.formData.items[index].sum) / Number(this.formData.items[index].number)
      }
    },
    /**
     * 修改商品明细单价
     */
    changePrice(index) {
      if (!this.formData.items[index].price) {
        this.formData.items[index].sum = null
        return
      }
      if (this.formData.items[index].number) {
        //计算小计（保留2位小数）
        this.formData.items[index].sum = Number(this.formData.items[index].number) * Number(this.formData.items[index].price)
        return
      }
      if (this.formData.items[index].sum) {
        //计算数量
        this.formData.items[index].number = Number(this.formData.items[index].sum) / Number(this.formData.items[index].price)
      }
    },
    /**
     * 修改商品明细小计
     */
    changeSum(index) {
      if (!this.formData.items[index].sum) {
        this.formData.items[index].price = null
        return
      }
      if (this.formData.items[index].number) {
        //并且数量有值，计算单价（保留8为小数）
        this.formData.items[index].price = Number(this.formData.items[index].sum) / Number(this.formData.items[index].number)
        return
      }
      if (this.formData.items[index].price) {
        this.formData.items[index].number = 1
      }
    },
    /**
     *添加
     */
    addObj() {
      this.formData.items.push({
        no: '',
        name: '',
        model: '',
        unit: '',
        number: '',
        price: '',
        sum: '',
        discount: '',
        taxRate: '',
        tax: '',
        preferentialPolicyFlag: '',
        zeroRateFlag: '',
        preferentialPolicyName: ''
      })
    },
    /**
     * 删除
     */
    deleteObj(index) {
      this.formData.items.splice(index, 1)
    },
    /**
     * 发送
     */
    onSubmit() {
      this.$refs.form.validate(valid => {
        if (!valid) {
          return
        }
        this.formData.items.forEach((item, index) => {
          if (
            item.name == '' &&
            item.model == '' &&
            item.unit == '' &&
            item.number == '' &&
            item.price == '' &&
            item.sum == '' &&
            item.discount == '' &&
            item.taxRate == '' &&
            item.tax == '' &&
            item.preferentialPolicyFlag == '' &&
            item.zeroRateFlag == '' &&
            item.preferentialPolicyName == ''
          ) {
            this.formData.items.splice(index, 1)
          }
        })
        test.makeInvoice(this.formData).then(res => {
          if (res.code == 1) {
            this.formData.message = res.content.message
            this.formData.topic = res.content.topic
            this.formData.webSocket = res.content.webSocket
            ElMessage({
              type: 'success',
              message: res.message
            })
          }
        })
      })
    }
  }
}
</script>

<style>
.invoicing .form-info {
  width: 74%;
  padding: 20px;
  overflow: auto;
}

.invoicing .orther-info {
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
</style>
