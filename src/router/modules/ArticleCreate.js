import layout from '@/views/layout'

export default {
  path: '/article',
  component: layout,
  redirect: '/article/ranking',
  name: 'articleCreate',
  meta: { title: 'article', icon: 'article' },
  children: [
    {
      path: '/article/create',
      component: () =>
        import(
          /* webpackChunkName: "article-upsert" */ '@/views/article-upsert/index'
        ),
      meta: {
        title: 'articleCreate',
        icon: 'article-create'
      }
    },
    {
      path: '/article/editor/:id',
      component: () =>
        import(
          /* webpackChunkName: "article-upsert" */ '@/views/article-upsert/index'
        ),
      meta: {
        title: 'articleEditor'
      }
    }
  ]
}
