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
      回调内容：
    </div>
    <el-input v-model="formData.content" type="textarea" :rows="5" placeholder="回调内容" />
  </div>
</template>
