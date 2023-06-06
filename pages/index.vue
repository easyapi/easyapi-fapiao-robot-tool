<script>
import robot from '@/api/robot'

useHead({
  title: 'EasyAPI发票机器人测试工具',
  meta: [{ name: 'description', content: 'EasyAPI发票机器人测试工具' }],
})

export default defineComponent({
  setup() {
    const state = reactive({
      latestRobot: {},
    })

    /**
     * 获取机器人版本
     */
    const getRobotVersion = () => {
      robot.getRobotVersion().then((res) => {
        if (res.code === 1)
          state.latestRobot = JSON.parse(res.content)
      })
    }

    onMounted(() => {
      getRobotVersion()
    })

    return {
      ...toRefs(state),
      getRobotVersion,
    }
  },
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
              <span>版本号：</span><span>{{ latestRobot.version }}</span>
            </div>
            <div class="text-sm">
              <span>更新时间：</span><span>{{ latestRobot.time }}</span>
            </div>
            <div class="mb-2 text-sm">
              <span>下载地址：</span>
              <a target="blank" :href="latestRobot.url">{{ latestRobot.url }}</a>
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
