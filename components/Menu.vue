<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { menuList } from '../utils/menu'

const route = useRoute()
const router = useRouter()

const selectMenu = ref()

onMounted(() => {
  selectMenu.value = route.name === 'index' ? '/' : String(route.path)
})

function selectMenuItem(row: any) {
  router.push(row)
}
</script>

<template>
  <div class="menu bg-white rounded">
    <el-scrollbar height="100%">
      <div class="menu-title">接口调试</div>
      <el-menu
        active-text-color="#409EFF"
        class="el-menu-vertical-demo"
        :default-active="selectMenu"
        @select="selectMenuItem"
      >
        <div v-for="(item, index) in menuList" :key="index">
          <div
            v-if="item.children.length > 0"
            class="text-gray-400 text-xs menu-subtitle"
          >
            {{ item.name }}
          </div>
          <el-menu-item v-else :index="item.path">
            <span>{{ item.name }}</span>
          </el-menu-item>
          <div v-for="(citem, cindex) in item.children" :key="cindex">
            <el-menu-item :index="citem.path">
              <span>{{ citem.name }}</span>
            </el-menu-item>
          </div>
        </div>
      </el-menu>
    </el-scrollbar>
  </div>
</template>

<style scoped>
.menu {
  height: calc(100% - 40px);
  margin: 20px 0 0 20px;
  overflow-y: auto;
}

.menu-title {
  font-size: 14px;
  padding: 12px 0 12px 12px;
}

.el-menu {
  border-top: 1px solid #eeeeee;
  border-right: 0;
}

.menu .el-menu-item {
  padding-left: 30px !important;
  width: 190px;
  height: 40px;
  font-size: 14px;
  line-height: 40px;
}

.menu-subtitle {
  padding-left: 30px !important;
  line-height: 40px;
}
</style>
