import { defineStore } from 'pinia'

export const userStore = defineStore('user', {
  state() {
    return {
      showLogin: false,
      isLogin: false,
    }
  },
})
