import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      meta: {
        title: '首页'
      }
    },
    {
      path: '/article/:id',
      name: 'article',
      component: () => import('../views/ArticleView.vue'),
      meta: {
        title: '文章详情'
      }
    },
    {
      path: '/tag/:tag',
      name: 'tag',
      component: () => import('../views/TagView.vue'),
      meta: {
        title: '标签'
      }
    }
  ]
})

router.beforeEach((to, from, next) => {
  document.title = `${to.meta.title} - AI技术博客`
  next()
})

export default router 