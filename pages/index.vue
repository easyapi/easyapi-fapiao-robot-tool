<script setup lang="ts">
import { useHead } from '@unhead/vue'

useHead({
  title: '首页 - EasyAPI发票机器人',
  meta: [{ name: 'description', content: 'EasyAPI发票机器人测试工具' }],
})
</script>

<template>
  <div class="page flex invoicing">
    <div class="form-info rounded">
      <el-scrollbar height="100%">
        <div class="w-full flex flex-wrap">
          <div class="card-item py-4 bg-white rounded text-center shadow">
            <div class="text-xl font-semibold mb-2">
              EasyAPI发票机器人助手下载
            </div>
            <img
              class="inline-block mb-2"
              src="https://qiniu.easyapi.com/fapiao/logo.svg"
              alt=""
            >
            <div class="mb-2 text-sm">
              <span>下载地址：</span>
              <a href="javascript:;">联系微信fanfanle获取</a>
            </div>
            <div class="mb-2 text-sm">
              <span>版本号：</span><span>1.0.2</span>
            </div>
            <div class="text-sm">
              <span>更新时间：</span><span>2023.03.25</span>
            </div>
          </div>
        </div>
      </el-scrollbar>
    </div>
  </div>
</template>

<style scoped>
.invoicing .form-info {
  width: 100%;
  overflow: auto;
}

.card-item {
  width: calc((100% - 40px) / 3);
  margin-right: 20px;
  margin-bottom: 20px;
}

.card-item:nth-child(3n) {
  margin-right: 0;
}
</style>
