<template>
  <div class="page flex invoicing">
    <div class="form-info bg-white">点击左侧开始测试</div>
  </div>
</template>

<script setup lang="ts">
useHead({
  title: '首页 - EasyAPI发票机器人',
  meta: [{ name: 'description', content: 'EasyAPI发票机器人测试工具' }]
})
</script>

<style scoped>
.invoicing .form-info {
  width: 100%;
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
