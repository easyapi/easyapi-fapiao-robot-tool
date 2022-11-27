<script setup lang="ts">
import { onMounted, ref } from 'vue'

const route = useRoute()
const router = useRouter()

const selectMenu = ref()

onMounted(() => {
  selectMenu.value = route.name === 'index' ? '' : String(route.name)
})

function selectMenuItem(row) {
  router.push(`/${row}`)
}
</script>

<template>
  <div class="menu bg-white">
    <div class="menu-title">
      接口调试
    </div>
    <el-menu active-text-color="#409EFF" class="el-menu-vertical-demo" :default-active="selectMenu" @select="selectMenuItem">
      <el-menu-item index="">
        <span>首页</span>
      </el-menu-item>
      <el-menu-item index="make">
        <span>开具发票</span>
      </el-menu-item>
      <el-menu-item index="red">
        <span>发票红冲</span>
      </el-menu-item>
      <el-menu-item index="cancel">
        <span>发票作废</span>
      </el-menu-item>
      <el-menu-item index="query">
        <span>发票同步查询</span>
      </el-menu-item>
      <el-menu-item index="print">
        <span>发票打印</span>
      </el-menu-item>
      <el-menu-item index="retry">
        <span>发票重试</span>
      </el-menu-item>
      <el-menu-item index="amount">
        <span>发票库存查询</span>
      </el-menu-item>
      <el-menu-item index="email">
        <span>重发邮件</span>
      </el-menu-item>
      <el-menu-item index="state">
        <span>税盘状态</span>
      </el-menu-item>
      <el-menu-item index="robot">
        <span>发票机器人状态</span>
      </el-menu-item>
    </el-menu>
  </div>
</template>

<style scoped>
.menu {
  height: calc(100% - 40px);
  margin: 20px 0 0 20px;
}

.menu-title {
  font-size: 14px;
  padding: 12px 0 12px 12px;
}

.el-menu {
  border-top: 1px solid #dcdfe6;
  border-right: 0;
}

.menu .el-menu-item {
  padding-left: 30px !important;
  width: 190px;
  height: 40px;
  font-size: 12px;
  line-height: 40px;
}
</style>
