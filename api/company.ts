import http from '~/api/request'

export const company = {
  /**
   * 获取销方列表
   */
  getCompanyList(): Promise<ApiResponse> {
    return http.get(`${http.baseUrl}/companies`)
  },
  /**
   * 修改销方信息
   */
  updateCompany(data, id): Promise<ApiResponse> {
    return http.put(`${http.baseUrl}/company/${id}`, data)
  },
  /**
   * 添加销方信息
   */
  createCompany(data): Promise<ApiResponse> {
    return http.post(`${http.baseUrl}/company`, data)
  },
  /**
   * 删除销方信息
   */
  deteleCompany(id): Promise<ApiResponse> {
    return http.del(`${http.baseUrl}/company/${id}`)
  }
}
