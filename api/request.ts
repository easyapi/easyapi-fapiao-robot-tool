const apiUrl = 'https://api.easyapi.com'
const baseUrl = 'https://fapiao-robot-api.easyapi.com'
const accountUrl = 'https://account-api.easyapi.com'

const errorResponse: ApiResponse = {
  success: false,
  code: 0,
  message: '',
  data: null,
  result: ''
}

const get = async (url: string, params = {}): Promise<ApiResponse> => {
  try {
    const token = useCookie('robotToken')
    const res = await $fetch<ApiResponse>(url, {
      headers: {
        Authorization: `Bearer ${token.value}`
      },
      method: 'GET',
      params: params
    })
    return res
  } catch (error) {
    errorResponse.message = error
    return errorResponse
  }
}

const post = async (url: string, params = {}): Promise<ApiResponse> => {
  try {
    const token = useCookie('robotToken')
    const res = await $fetch<ApiResponse>(url, {
      headers: {
        Authorization: `Bearer ${token.value}`
      },
      method: 'POST',
      body: params
    })
    return res
  } catch (error) {
    errorResponse.message = error
    return errorResponse
  }
}

const put = async (url: string, params = {}): Promise<ApiResponse> => {
  try {
    const token = useCookie('robotToken')
    const res = await $fetch<ApiResponse>(url, {
      headers: {
        Authorization: `Bearer ${token.value}`
      },
      method: 'PUT',
      body: params
    })
    return res
  } catch (error) {
    errorResponse.message = error
    return errorResponse
  }
}

const del = async (url: string, params = {}): Promise<ApiResponse> => {
  try {
    const token = useCookie('robotToken')
    const res = await $fetch<ApiResponse>(url, {
      headers: {
        Authorization: `Bearer ${token.value}`
      },
      method: 'DELETE',
      body: params
    })
    return res
  } catch (error) {
    errorResponse.message = error
    return errorResponse
  }
}

export default { get, post, put, del, baseUrl, apiUrl, accountUrl }
