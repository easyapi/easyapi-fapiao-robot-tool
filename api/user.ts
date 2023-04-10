import http from '~/api/request'

export const user = {
  /**
   * 登录
   */
  login(data: any): Promise<ApiResponse> {
    return http.post(`${useRuntimeConfig().public.baseUrl}/authenticate`, data, {})
  },

  /**
   * 注册
   */
  signup(data: any): Promise<ApiResponse> {
    return http.post(`${useRuntimeConfig().public.baseUrl}/account/signup`, data, {})
  },

  /**
   * 获取用户信息
   */
  getUser(): Promise<ApiResponse> {
    return http.get(`${useRuntimeConfig().public.baseUrl}/account`)
  },

  /**
   * 发送验证码
   */
  sendCode(params: any): Promise<ApiResponse> {
    return http.get(`${useRuntimeConfig().public.baseUrl}/captcha/send`, params, {})
  },

  /**
   * 重置密码
   */
  forgetPassword(data: any): Promise<ApiResponse> {
    return http.post(`${useRuntimeConfig().public.baseUrl}/account/forget-password/reset`, data, {})
  },

  /**
   * 修改密码
   */
  changePassword(data: any): Promise<ApiResponse> {
    return http.post(`${useRuntimeConfig().public.baseUrl}/account/change-password`, data, {})
  },

  /**
   * 获取员工列表
   */
  getUserList(params: any): Promise<ApiResponse> {
    return http.get(`${useRuntimeConfig().public.baseUrl}/users`, params, {})
  },

  /**
   * 添加新员工
   */
  createShopUserCreate(data: any): Promise<ApiResponse> {
    return http.post(`${useRuntimeConfig().public.baseUrl}/account/assign`, data, {})
  },

  /**
   * 修改员工权限
   */
  updateShopUserUpdate(data: any, id: any): Promise<ApiResponse> {
    return http.put(`${useRuntimeConfig().public.baseUrl}/account/change-assign/${id}`, data, {})
  },
}

export default user
