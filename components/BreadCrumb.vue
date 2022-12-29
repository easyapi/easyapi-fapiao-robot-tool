<script lang="ts" setup>
import { ref } from 'vue'
import { ArrowRight } from '@element-plus/icons-vue'

const route = useRouter()
const name = ref('')

watch(
  () => route.currentRoute.value.path,
  (newPath) => {
    switch (newPath) {
      case '/':
        name.value = '首页'
        break
      case '/make':
        name.value = '开具发票'
        break
      case '/red':
        name.value = '发票红冲'
        break
      case '/cancel':
        name.value = '发票作废'
        break
      case '/query':
        name.value = '发票同步查询'
        break
      case '/print':
        name.value = '发票打印'
        break
      case '/retry':
        name.value = '发票重试'
        break
      case '/amount':
        name.value = '发票库存查询'
        break
      case '/email':
        name.value = '重发邮件'
        break
      case '/state':
        name.value = '税盘状态'
        break
      case '/robot':
        name.value = '发票机器人状态'
        break
    }
  },
)

onMounted(() => {
  const newPath = route.currentRoute.value.path
  switch (newPath) {
    case '/':
      name.value = '首页'
      break
    case '/make':
      name.value = '开具发票'
      break
    case '/red':
      name.value = '发票红冲'
      break
    case '/cancel':
      name.value = '发票作废'
      break
    case '/query':
      name.value = '发票同步查询'
      break
    case '/print':
      name.value = '发票打印'
      break
    case '/retry':
      name.value = '发票重试'
      break
    case '/amount':
      name.value = '发票库存查询'
      break
    case '/email':
      name.value = '重发邮件'
      break
    case '/state':
      name.value = '税盘状态'
      break
    case '/robot':
      name.value = '发票机器人状态'
      break
  }
})
</script>

<template>
  <div class="breadcrumb bg-white p-3 rounded">
    <el-breadcrumb :separator-icon="ArrowRight">
      <el-breadcrumb-item>接口调试</el-breadcrumb-item>
      <el-breadcrumb-item>{{ name }}</el-breadcrumb-item>
    </el-breadcrumb>
  </div>
</template>

<style>
.breadcrumb {
  margin: 20px 20px 20px 20px;
  width: calc(100vw - 250px);
}
</style>
