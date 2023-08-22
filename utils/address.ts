import http from '~/api/request'

const address = {

  /**
   * 获取地址列表
   */
  getAddressList(params: any): Promise<ApiResponse> {
    return http.get(`${useRuntimeConfig().public.baseUrl}/addresses`, params, {})
  },

  /**
   * 创建地址信息
   */
  createAddress(data: any): Promise<ApiResponse> {
    return http.post(`${useRuntimeConfig().public.baseUrl}/address`, data, {})
  },

  /**
   * 修改地址信息
   */
  updateAddress(id: any, data: any): Promise<ApiResponse> {
    return http.put(`${useRuntimeConfig().public.baseUrl}/address/${id}`, data, {})
  },

  /**
   * 查询地址信息
   */
  findAddress(params: any): Promise<ApiResponse> {
    return http.get(`${useRuntimeConfig().public.baseUrl}/address/find`, params, {})
  },

}

export default address
