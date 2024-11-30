import { createRouter, createWebHashHistory } from 'vue-router';
import UserManageRouter from './modules/UserManage';
import RoleListRouter from './modules/RoleList';
import PermissionListRouter from './modules/PermissionList';
import ArticleRouter from './modules/Article';
import ArticleCreateRouter from './modules/ArticleCreate';
import layout from '@/views/layout';

// 私有路由表
export const privateRoutes = [
  UserManageRouter,
  RoleListRouter,
  PermissionListRouter,
  ArticleRouter,
  ArticleCreateRouter
];

// 公开路由表（无需判断权限）
export const publicRoutes = [
  {
    path: '/login',
    component: () =>
      import(/* webpackChunkName: "login" */ '@/views/login/index')
  },
  {
    path: '/',
    component: layout,
    redirect: '/profile',
    children: [
      {
        path: '/profile',
        name: 'profile',
        component: () =>
          import(/* webpackChunkName: "profile" */ '@/views/profile/index'),
        meta: {
          title: 'profile',
          icon: 'personnel'
        }
      },
      {
        path: '/404',
        name: '404',
        component: () =>
          import(/* webpackChunkName: "error-page" */ '@/views/error-page/404')
      },
      {
        path: '/401',
        name: '401',
        component: () =>
          import(/* webpackChunkName: "error-page" */ '@/views/error-page/401')
      }
    ]
  }
];

const router = createRouter({
  history: createWebHashHistory(),
  routes: [...privateRoutes, ...publicRoutes]
});

export default router;
