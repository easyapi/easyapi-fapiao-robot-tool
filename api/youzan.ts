import http from '~/api/request'

export const youzan = {
  /**
   * 有赞订单一键开票
   */
  batchMakeYouZan(params): Promise<ApiResponse> {
    return http.post(`${http.baseUrl}/youzan-order/batch-make`, params)
  },
  /**
   * 获取有赞订单列表
   * @param str
   * @returns
   */
  getYouZanOrder(params): Promise<ApiResponse> {
    return http.get(`${http.baseUrl}/youzan-orders`, params)
  },
  /**
   * 获取单条有赞订单详情
   */
  getYouZanDetail(params): Promise<ApiResponse> {
    return http.get(`${http.baseUrl}/youzan-invoice/find`, params)
  }
}
