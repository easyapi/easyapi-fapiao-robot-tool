<script setup lang="ts">
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
            <div class="text-xl font-semibold mb-2">助手下载</div>
            <img
              class="inline-block mb-2"
              src="../assets/svg/logo.svg"
              alt=""
            />
            <div class="mb-2 text-sm font-medium">
              <span>下载地址：</span>
              <a href="http://www.baidu.com" target="_blank"
                >http://www.baidu.com</a
              >
            </div>
            <div class="mb-2 text-sm font-medium">
              <span>版本号：</span><span>1.1.0</span>
            </div>
            <div class="text-sm font-medium">
              <span>更新时间：</span><span>2022.09.27</span>
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
  margin-right: 0px;
}
</style>
