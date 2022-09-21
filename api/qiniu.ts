import http from '~/api/request'

export const qiniu = {
  /**
   * 获取七牛空间TOKEN
   *
   * @see https://www.easyapi.com
   */
  getQiniuToken(): Promise<ApiResponse> {
    return http.get(`${http.accountUrl}/qiniu/upload-token`)
  },

  /**
   * 获取七牛key
   *
   * @see https://www.easyapi.com
   */
  getQiniuKey(): Promise<ApiResponse> {
    return http.get(`${http.accountUrl}/qiniu/key`)
  }
}
