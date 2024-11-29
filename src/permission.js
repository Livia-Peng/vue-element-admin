import router from './router';
import store from './store';

//  未登录也可访问的页面
const whitelist = ['/login'];

// 路由前置守卫
router.beforeEach((to, from, next) => {
  // 判断是否已登录，跳转页面
  // 此处store已从缓存中取token
  if (store.getters.token) {
    if (to.path === '/login') {
      next('/');
    } else {
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
