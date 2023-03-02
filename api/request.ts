import { ElMessage } from 'element-plus'

/**
 * API请求封装
 * @param url
 * @param options
 * @param headers
 */
const fetch = async (url: string, options?: any, headers?: any): Promise<ApiResponse> => {
  try {
    const customHeaders = { Authorization: `Bearer ${useCookie('robotToken').value}`, ...headers }
    const res = await $fetch<ApiResponse>(url,
      { ...options, headers: customHeaders },
    )
    return res
  } catch (error: any) {
    ElMessage({
      type: 'error',
      message: error.data.message,
    })
    return error.data
  }
}

export default new class http {
  get(url: string, params?: any, headers?: any): Promise<any> {
    return fetch(url, { method: 'get', params }, headers)
  }

  post(url: string, data?: any, headers?: any): Promise<any> {
    return fetch(url, { method: 'post', data }, headers)
  }

  put(url: string, data?: any, headers?: any): Promise<any> {
    return fetch(url, { method: 'put', data }, headers)
  }

  delete(url: string, data?: any, headers?: any): Promise<any> {
    return fetch(url, { method: 'delete', data }, headers)
  }
}()
