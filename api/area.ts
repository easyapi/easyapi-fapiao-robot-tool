import http from '~/api/request'

const area = {

  /**
   * 获取省市区地址
   */
  getAreaList(): Promise<ApiResponse> {
    return http.get('https://qiniu.easyapi.com/area.json', {}, {})
  },

  /**
   * 获取省市区地址
   */
  getChinaTaxAreaList(): Promise<ApiResponse> {
    return http.get('https://qiniu.easyapi.com/invoice/area.json')
  },
}

export default area