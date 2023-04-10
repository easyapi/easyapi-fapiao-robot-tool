import { ElMessage } from 'element-plus'
import { getToken } from '~/utils/token'

/**
 * API请求封装
 * @param url
 * @param options
 * @param headers
 */
const fetch = async (url: string, options?: any, headers?: any): Promise<ApiResponse> => {
  const router = useRouter()
  try {
    const authenticationToken = getToken()
    if (!authenticationToken && !url.includes('authenticate')) {
      router.push('/login')
      return
    }
    const customHeaders = { Authorization: `Bearer ${authenticationToken}`, ...headers }
    const res = await $fetch<ApiResponse>(url,
      { ...options, headers: customHeaders },
    )
    console.log(778899)
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
    return fetch(url, { method: 'post', body: data }, headers)
  }

  put(url: string, data?: any, headers?: any): Promise<any> {
    return fetch(url, { method: 'put', body: data }, headers)
  }

  delete(url: string, data?: any, headers?: any): Promise<any> {
    return fetch(url, { method: 'delete', body: data }, headers)
  }
}()
