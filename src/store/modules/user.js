import md5 from 'md5';
import { login } from '../../api/login/sys';
import {
  getStorageItem,
  setStorageItem,
  StorageKeys
} from '../../utils/storage';

export default {
  namespaced: true,
  state: () => ({
    token: getStorageItem(StorageKeys.token) || '',
    userInfo: {}
  }),
  mutations: {
    setToken(state, token) {
      state.token = state;
      setStorageItem(StorageKeys.token, token);
    }
  },
  actions: {
    // 登录请求
    login(context, userInfo) {
      const { username, password } = userInfo;
      return new Promise((resolve, reject) => {
        login({ username, password: md5(password) })
          .then((data) => {
            // console.log(data);
            this.commit('user/setToken', data.token);
            resolve(data);
          })
          .catch((err) => reject(err));
      });
    }
  }
};
