import http from '~/api/request'

export const test = {
  /**
   * 发票红冲
   * @param params
   * @returns
   */
  redInvoice(params): Promise<ApiResponse> {
    return http.post(`${http.baseUrl}/invoice/red`, params)
  },
  /**
   * 开具发票
   * @param params
   * @returns
   */
  makeInvoice(params): Promise<ApiResponse> {
    return http.post(`${http.baseUrl}/invoice/make`, params)
  },
  /**
   * 作废发票
   * @param params
   * @returns
   */
  cancelInvoice(params): Promise<ApiResponse> {
    return http.post(`${http.baseUrl}/invoice/cancel`, params)
  },
  /**
   * 打印发票
   * @param params
   * @returns
   */
  printInvoice(params): Promise<ApiResponse> {
    return http.post(`${http.baseUrl}/invoice/print`, params)
  },
  /**
   * 查询同步
   * @param params
   * @returns
   */
  queryInvoice(params): Promise<ApiResponse> {
    return http.get(`${http.baseUrl}/invoice/query`, params)
  },
  /**
   * 重试开票
   * @param params
   * @returns
   */
  retryInvoice(params): Promise<ApiResponse> {
    return http.get(`${http.baseUrl}/invoice/retry`, params)
  },
  /**
   * 发票库存查询
   * @param params
   * @returns
   */
  amountShop(params): Promise<ApiResponse> {
    return http.get(`${http.baseUrl}/shop/amount`, params)
  },
  /**
   * 助手状态查询
   * @param params
   * @returns
   */
  stateShop(params): Promise<ApiResponse> {
    return http.get(`${http.baseUrl}/shop/state`, params)
  }
}
