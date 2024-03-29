import { ElMessage } from 'element-plus'
import { useRouter } from 'vue-router'
import { getToken } from '~/utils/token'

/**
 * API请求封装
 * @param url
 * @param options
 * @param headers
 */
async function fetch(url: string, options?: any, headers?: any): Promise<ApiResponse> {
  const router = useRouter()
  try {
    const customHeaders = { ...headers }
    const authenticationToken = getToken()
    if (authenticationToken)
      customHeaders.Authorization = `Bearer ${authenticationToken}`
    return await $fetch<ApiResponse>(url,
      { ...options, headers: customHeaders },
    )
  } catch (error: any) {
    if (error.data.code === -9) {
      router.push('/login')
      return
    }
    ElMessage.error(error.data.message)
    return error.data
  }
}

export default new class http {
  get(url: string, params?: any, headers?: any): Promise<any> {
    return fetch(url, { method: 'get', params }, headers)
  }

  post(url: string, data?: any, headers?: any): Promise<any> {
    return fetch(url, { method: 'post', body: data }, headers)
  }

  put(url: string, data?: any, headers?: any): Promise<any> {
    return fetch(url, { method: 'put', body: data }, headers)
  }

  delete(url: string, data?: any, headers?: any): Promise<any> {
    return fetch(url, { method: 'delete', body: data }, headers)
  }
}()
