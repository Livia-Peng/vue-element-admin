import layout from '@/views/layout'

export default {
  path: '/user',
  component: layout,
  redirect: '/user/manage',
  name: 'userManage',
  meta: {
    title: 'user',
    icon: 'personnel'
  },
  children: [
    {
      path: '/user/manage',
      component: () =>
        import(
          /* webpackChunkName: "user-manage" */ '@/views/user-manage/index'
        ),
      meta: {
        title: 'userManage',
        icon: 'personnel-manage'
      }
    }
  ]
}
