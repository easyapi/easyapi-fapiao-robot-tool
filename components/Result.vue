<script setup lang="ts">
const props = defineProps({
  formData: {
    type: Object,
    default: () => {},
  },
})
</script>

<template>
  <div class="w-full bg-white form-style rounded">
    <div class="title">
      WebSocket地址：
    </div>
    <el-input v-model="formData.webSocket" placeholder="WebSocket地址" />
    <div class="title">
      Subscribe订阅主题：
    </div>
    <el-input v-model="formData.topic" placeholder="Subscribe订阅主题" />
    <div class="title">
      下发内容：
    </div>
    <el-input v-model="formData.message" type="textarea" placeholder="下发内容" />
  </div>
</template>
