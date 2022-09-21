import http from '~/api/request'

export const shop = {
  /**
   * 获取我的用户店铺关系列表
   */
  getUserShops(params): Promise<ApiResponse> {
    return http.get(`${http.baseUrl}/user/user-shops`, params)
  }
}
