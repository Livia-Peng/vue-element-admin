import router from './router';
import store from './store';
import { checkLoginTimeout } from './utils/tools';

//  未登录也可访问的页面
const whitelist = ['/login'];

// 路由前置守卫
router.beforeEach(async (to, from, next) => {
  // 判断是否已登录，跳转页面
  // 此处store已从缓存中取token
  if (store.getters.token) {
    if (checkLoginTimeout()) {
      store.dispatch('user/logout');
      return Promise.reject(new Error('登录过期'));
    }
    if (to.path === '/login') {
      next('/');
    } else {
      if (!store.getters.hasUserInfo) {
        // 获取用户信息与权限
        await store.dispatch('user/getUserInfo');
      }
      next();
    }
  } else {
    if (whitelist.includes(to.path)) {
      next();
    } else {
      next('/login');
    }
  }
});
