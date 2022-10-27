<template>
  <div class="w-full bg-white form-style">
    <div class="title">回调内容：</div>
    <el-input type="textarea" :rows="5" v-model="formData.content" placeholder="回调内容" />
  </div>
</template>

<script setup lang="ts">
const formData = {
  content: ''
}
</script>
