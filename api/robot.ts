import http from '~/api/request'

const robot = {
  /**
   * 获取发票机器人最新版本
   */
  getRobotVersion(): Promise<ApiResponse> {
    return http.get(`${useRuntimeConfig().public.baseUrl}/robot/version`, {}, {})
  },

}

export default robot
