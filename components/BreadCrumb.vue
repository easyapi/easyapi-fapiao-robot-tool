<script lang="ts" setup>
import { ref } from 'vue'
import { ArrowRight } from '@element-plus/icons-vue'
import { menuList } from '../utils/menu'

const route = useRouter()
const name = ref('')

watch(
  () => route.currentRoute.value.path,
  (newPath) => {
    getNameByPath(menuList, newPath)
  },
)

const getNameByPath = (list: any, path: String) => {
  list.forEach((item: any) => {
    if (item.path === path) {
      name.value = item.name
      return
    }
    if (item.children && item.children.length > 0)
      getNameByPath(item.children, path)
  })
}

onMounted(() => {
  getNameByPath(menuList, route.currentRoute.value.path)
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
