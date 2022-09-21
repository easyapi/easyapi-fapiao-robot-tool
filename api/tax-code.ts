import http from '~/api/request'

export const tax = {
  /**
   * 获取分类树
   */
  getTaxCodeTree(): Promise<ApiResponse> {
    return http.get(`${http.apiUrl}/tax-code/tree`)
  },
  /**
   * 搜索税务局税收分类编码
   */
  searchTaxCode(params): Promise<ApiResponse> {
    return http.get(`${http.apiUrl}/tax-codes`, params)
  },
  /**
   * 查询税收分类编码
   */
  findTaxCodeProduct(params): Promise<ApiResponse> {
    return http.get(`${http.apiUrl}/tax-code/product`, params)
  },
  /**
   * 添加税收分类编码信息
   */
  createTaxCode(data): Promise<ApiResponse> {
    return http.post(`${http.baseUrl}/tax-code`, data)
  },
  /**
   * 获取税收分类编码列表
   */
  getTaxCodeList(params): Promise<ApiResponse> {
    return http.get(`${http.baseUrl}/tax-codes`, params)
  },
  /**
   *  修改税收分类编码信息
   */
  updateTaxCode(data, id): Promise<ApiResponse> {
    return http.put(`${http.baseUrl}/tax-code/${id}`, data)
  },
  /**
   *  删除税收分类编码信息
   */
  deleteTaxCode(id): Promise<ApiResponse> {
    return http.del(`${http.baseUrl}/tax-code/${id}`)
  },
  /**
   * 创建税收分类编码规则
   */
  createTaxCodeRule(data): Promise<ApiResponse> {
    return http.post(`${http.baseUrl}/tax-code/rule`, data)
  },
  /**
   * 获取税收编码规则列表
   */
  getTaxCodeRuleList(params): Promise<ApiResponse> {
    return http.get(`${http.baseUrl}/tax-code/rules`, params)
  },
  /**
   * 编辑税收分类编码规则
   */
  updataTaxCodeRule(data, id): Promise<ApiResponse> {
    return http.put(`${http.baseUrl}/tax-code/rule/${id}`, data)
  },
  /**
   * 删除税收分类编码规则
   */
  deleteTaxCodeRule(id): Promise<ApiResponse> {
    return http.del(`${http.baseUrl}/tax-code/rule/${id}`)
  }
}
