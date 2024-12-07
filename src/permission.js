import router from './router'
import store from './store'

//  未登录也可访问的页面
const whitelist = ['/login']

// 路由前置守卫
router.beforeEach(async (to, from, next) => {
  // 判断是否已登录，跳转页面
  // 此处store已从缓存中取token
  if (store.getters.token) {
    if (to.path === '/login') {
      next('/')
    } else {
      // 若不存在用户信息，则需要获取用户信息
      if (!store.getters.hasUserInfo) {
        // 获取用户信息与权限
        const { permission } = await store.dispatch('user/getUserInfo')
        // 处理用户权限，筛选出需要添加的权限
        const filterRoutes = await store.dispatch(
          'permission/filterRoutes',
          permission.menus
        )
        // 动态添加路由
        filterRoutes.forEach((rt) => router.addRoute(rt))
        // 添加后首次需主动跳转
        return next(to.path)
      }
      next()
    }
  } else {
    if (whitelist.includes(to.path)) {
      next()
    } else {
      next('/login')
    }
  }
})
