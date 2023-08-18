import http from '~/api/request'

export const test = {
  /**
   * 发票红冲
   * @param data
   */
  redInvoice(data = {}): Promise<ApiResponse> {
    return http.post(`${useRuntimeConfig().public.baseUrl}/tool/invoice/red`, data, {})
  },

  /**
   * 开具发票
   * @param data
   */
  makeInvoice(data = {}): Promise<ApiResponse> {
    return http.post(`${useRuntimeConfig().public.baseUrl}/tool/invoice/make`, data, {})
  },

  /**
   * 批量开具发票
   * @param data
   */
  batchMakeInvoice(data = {}): Promise<ApiResponse> {
    return http.post(`${useRuntimeConfig().public.baseUrl}/tool/invoice/batch-make`, data, {})
  },

  /**
   * 作废发票
   * @param data
   */
  cancelInvoice(data = {}): Promise<ApiResponse> {
    return http.post(`${useRuntimeConfig().public.baseUrl}/tool/invoice/cancel`, data, {})
  },

  /**
   * 打印发票
   * @param data
   */
  printInvoice(data = {}): Promise<ApiResponse> {
    return http.post(`${useRuntimeConfig().public.baseUrl}/tool/invoice/print`, data, {})
  },

  /**
   * 查询同步
   * @param params
   * @returns
   */
  queryInvoice(params = {}): Promise<ApiResponse> {
    return http.get(`${useRuntimeConfig().public.baseUrl}/tool/invoice/query`, params, {})
  },

  /**
   * 重试开票
   * @param params
   * @returns
   */
  retryInvoice(data = {}): Promise<ApiResponse> {
    return http.post(`${useRuntimeConfig().public.baseUrl}/tool/invoice/retry`, data, {})
  },

  /**
   * 发票库存查询
   * @param params
   * @returns
   */
  amountShop(params = {}): Promise<ApiResponse> {
    return http.get(`${useRuntimeConfig().public.baseUrl}/tool/shop/amount`, params, {})
  },

  /**
   * 电子税务局发票授信额度
   * @param params
   * @returns
   */
  invoiceAmount(params = {}): Promise<ApiResponse> {
    return http.get(`${useRuntimeConfig().public.baseUrl}/tool/invoice/amount`, params, {})
  },

  /**
   * 重发邮件
   * @param data
   */
  sendEmail(data = {}): Promise<ApiResponse> {
    return http.post(`${useRuntimeConfig().public.baseUrl}/tool/invoice/email`, data, {})
  },

  /**
   * 税盘状态查询
   * @param params
   * @returns
   */
  stateShop(params = {}): Promise<ApiResponse> {
    return http.get(`${useRuntimeConfig().public.baseUrl}/tool/shop/state`, params, {})
  },

  /**
   * 发票机器人工作状态
   * @param params
   * @returns
   */
  robotShop(params = {}): Promise<ApiResponse> {
    return http.get(`${useRuntimeConfig().public.baseUrl}/tool/shop/robot`, params, {})
  },
}
