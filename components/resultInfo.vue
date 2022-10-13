<template>
  <div class="w-full">
    <div class="title">WebSocket地址：</div>
    <el-input v-model="formData.webSocket" placeholder="WebSocket地址" />
    <div class="title">Subscribe订阅主题：</div>
    <el-input v-model="formData.topic" placeholder="Subscribe订阅主题" />
    <div class="title">下发内容：</div>
    <el-input type="textarea" v-model="formData.message" :autosize="{ minRows: 9, maxRows: 8 }" placeholder="下发内容" />
  </div>
</template>

<script>
export default {
  props: {
    formData: Object,
    default: {}
  }
}
</script>

<style scoped>
.result-info {
  padding: 20px;
  width: 50%;
  margin-left: 20px;
  display: flex;
  flex-direction: column;
}
.title {
  font-size: 12px;
  color: #606266;
  font-weight: 500;
  margin: 8px 0;
}
</style>
