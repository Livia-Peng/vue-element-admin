import { privateRoutes, publicRoutes } from '@/router'

export default {
  namespaced: true,
  state: () => ({
    routes: publicRoutes
  }),
  mutations: {
    setRoutes(state, routes) {
      state.routes = [...publicRoutes, ...routes]
    }
  },
  actions: {
    filterRoutes(context, menus) {
      const routes = privateRoutes
        .filter((e) => menus.includes(e.name))
        .concat({
          path: '/:catchAll(.*)',
          redirect: '/404'
        })
      this.commit('permission/setRoutes', routes)
      return routes
    }
  }
}
