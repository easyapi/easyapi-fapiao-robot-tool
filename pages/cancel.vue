<template>
  <div class="page flex red">
    <div class="form-info bg-white">
      <el-form :model="formData" ref="form" :rules="formRules" label-width="110px">
        <el-form-item label="商户订单号：" prop="outOrderNo">
          <el-input v-model="formData.outOrderNo" placeholder="商户订单号" />
        </el-form-item>
        <el-form-item label="发票代码：" prop="code">
          <el-input v-model="formData.code" placeholder="发票代码" />
        </el-form-item>
        <el-form-item label="发票号码：" prop="number">
          <el-input v-model="formData.number" placeholder="发票号码" />
        </el-form-item>
        <el-form-item label="作废原因：" prop="reason">
          <el-input v-model="formData.reason" placeholder="作废原因" />
        </el-form-item>
        <el-form-item label="回调地址：" prop="callbackUrl">
          <el-input v-model="formData.callbackUrl" placeholder="回调地址" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">发送</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="orther-info bg-white">
      <div class="title">WebSocket地址：</div>
      <el-input v-model="formData.webSocket" placeholder="WebSocket地址" />
      <div class="title">Subscribe订阅主题：</div>
      <el-input v-model="formData.topic" placeholder="Subscribe订阅主题" />
      <div class="title">下发内容：</div>
      <el-input type="textarea" v-model="formData.message" :autosize="{ minRows: 9, maxRows: 8 }" placeholder="下发内容" />
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
      formData: {},
      formRules: {
        outOrderNo: [{ required: true, message: '商户订单号不能为空', trigger: 'change' }],
        code: [{ required: true, message: '发票代码不能为空', trigger: 'change' }],
        number: [{ required: true, message: '发票号码不能为空', trigger: 'change' }],
        reason: [{ required: true, message: '红冲原因不能为空', trigger: 'change' }],
        callbackUrl: [{ required: true, message: '回调地址不能为空', trigger: 'change' }]
      }
    }
  },
  head: {
    title: '发票作废 - EasyAPI开票机器人'
  },

  mounted() {},
  methods: {
    // 发送
    onSubmit() {
      this.$refs.form.validate(valid => {
        if (!valid) {
          return
        }
        test.cancelInvoice(this.formData).then(res => {
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
.red .form-info {
  width: 49%;
  padding: 20px;
}
.red .form-info .tips {
  font-size: 12px;
  color: #a2a2a2;
}
.red .orther-info {
  padding: 20px;
  width: 50%;
  margin-left: 20px;
  display: flex;
  flex-direction: column;
}
.red .title {
  font-size: 12px;
  color: #606266;
  font-weight: 500;
  margin: 8px 0;
}
</style>
