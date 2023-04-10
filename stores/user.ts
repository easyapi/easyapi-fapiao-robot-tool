import { defineStore } from 'pinia'
import { removeToken } from '~/utils/token'
import { user } from '@/api/user'

export const useUser = defineStore('user', {

  state() {
    return {
      isLogin: false,
      userId: null,
      username: '',
      mobile: '',
      nickname: '',
      photo: '',
    }
  },

  getters: {
    getUsername: state => state.username,
    getNickname: state => state.nickname,
    getPhoto: state => state.photo,
  },

  actions: {
    /**
     * 获取用户信息
     */
    getUser() {
      const router = useRouter()
      user.getUser().then((res) => {
        if (res.code === 1) {
          this.nickname = res.content.nickname
          this.username = res.content.username
          this.mobile = res.content.mobile
          this.isLogin = true
          localStorage.setItem('userInfo', JSON.stringify(res.content))
          router.push('/')
        }
      })
    },

    /**
     * 退出登录
     */
    logout(router: any) {
      removeToken()
      this.isLogin = false
      router.push('/login')
    },
  },
})
