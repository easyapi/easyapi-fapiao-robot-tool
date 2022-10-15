<template>
  <div class="w-full bg-white form-style">
    <div class="title">回调内容：</div>
    <el-input type="textarea" :rows="5" v-model="formData.message" placeholder="回调内容" />
  </div>
</template>

<script>
export default {
  props: {
    formData: Object,
    default: () => ({})
  }
}
</script>
