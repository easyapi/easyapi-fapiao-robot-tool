import http from '~/api/request'

export const taxPlate = {
  /**
   * 获取税盘列表
   */
  getTaxPlateList(): Promise<ApiResponse> {
    return http.get(`${http.baseUrl}/tax-plates`)
  },
  /**
   * 修改税盘信息
   */
  updateTaxPlate(data, id): Promise<ApiResponse> {
    return http.put(`${http.baseUrl}/tax-plate/${id}`, data)
  },
  /**
   * 添加税盘信息
   */
  createTaxPlate(data): Promise<ApiResponse> {
    return http.post(`${http.baseUrl}/tax-plate`, data)
  },
  /**
   * 删除税盘信息
   */
  deteleTaxPlate(id): Promise<ApiResponse> {
    return http.del(`${http.baseUrl}/tax-plate/${id}`)
  }
}
