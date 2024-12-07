import md5 from 'md5'
import { getUserInfo, login } from '../../api/sys'
import {
  getStorageItem,
  removeAllStorageItem,
  setStorageItem,
  StorageKeys
} from '../../utils/storage'
import router, { resetRouter } from '../../router'

export default {
  namespaced: true,
  state: () => ({
    token: getStorageItem(StorageKeys.token) || '',
    userInfo: {}
  }),
  mutations: {
    setToken(state, token) {
      state.token = token
      setStorageItem(StorageKeys.token, token)
    },
    setUserInfo(state, userInfo) {
      state.userInfo = userInfo || {}
    }
  },
  actions: {
    // 登录请求
    login(context, userInfo) {
      const { username, password } = userInfo
      return new Promise((resolve, reject) => {
        login({ username, password: md5(password) })
          .then((data) => {
            // console.log(data);
            this.commit('user/setToken', data.token)
            setStorageItem(StorageKeys.timeStamp, Date.now())
            resolve(data)
          })
          .catch((err) => reject(err))
      })
    },
    // 获取用户信息
    async getUserInfo() {
      const res = await getUserInfo()
      // console.log(res);
      this.commit('user/setUserInfo', res)
      return res
    },
    logout() {
      resetRouter()
      this.commit('user/setToken', '')
      this.commit('user/setUserInfo', {})
      removeAllStorageItem()
      router.push('/login')
    }
  }
}
