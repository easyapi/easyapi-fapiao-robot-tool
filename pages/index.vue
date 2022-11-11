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
</style>
