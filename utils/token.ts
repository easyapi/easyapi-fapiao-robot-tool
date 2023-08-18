import { useCookie } from '#app/composables/cookie'

const key = 'robotToken'

/**
 * 获取token
 */
export function getToken() {
  return useCookie(key).value
}

/**
 * 存储token
 */
export function setToken(token: string) {
  useCookie(key, { maxAge: 60 * 60 * 24 * 30, path: '/' }).value = token
}

/**
 * 移除token
 */
export function removeToken() {
  useCookie(key).value = null
}
