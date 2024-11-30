import axios from 'axios';
import md5 from 'md5';
import { ElMessage } from 'element-plus';
import store from '../store';

const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API,
  timeout: 5000
});

function getTestICode() {
  const now = parseInt(Date.now() / 1000);
  const code = now + 'LGD_Sunday-1991-12-30';
  return {
    icode: md5(code),
    time: now
  };
}

// 请求拦截器
service.interceptors.request.use(
  (config) => {
    const { icode, time } = getTestICode();
    config.headers.icode = icode;
    config.headers.codeType = time;
    // console.log('token', store.getters.token);
    if (store.getters.token) {
      config.headers.Authorization = 'Bearer ' + store.getters.token;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 响应拦截器
service.interceptors.response.use(
  (response) => {
    const { success, message, data } = response.data;
    // 判断请求是否成功
    if (success) {
      return data;
    } else {
      // 业务错误
      ElMessage.error(message); // 提示错误消息
      return Promise.reject(new Error(message));
    }
  },
  (error) => {
    if (
      error.response &&
      error.response.data &&
      error.response.data.code === 401
    ) {
      store.dispatch('user/logout');
    }
    ElMessage.error(error.message); // 提示错误消息
    return Promise.reject(error);
  }
);

export default service;
