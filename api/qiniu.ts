import http from '~/api/request'

const qiniu = {

  /**
   * 获取七牛key
   */
  getKey() {
    return http.get('https://account-api.easyapi.com/qiniu/key')
  },
  /**
   * 获取七牛token
   */
  getToken() {
    return http.get('https://account-api.easyapi.com/qiniu/upload-token')
  },
}

export default qiniu
