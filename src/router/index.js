import { createRouter, createWebHashHistory } from 'vue-router'

const Home = () => import('@/views/home-view.vue')
const Article = () => import('@/views/article/article-view.vue')
const Login = () => import('@/views/login/login-view.vue')
const register = () => import('@/views/login/register-view.vue')
const TimeLine = () => import('@/views/timeline-view.vue')
const createArticle = () => import('@/views/article/create-article.vue')

const routes = [
  {
    path: '/',
    component: Home,
    redirect: '/timeline',
    children: [
      { path: '/timeline', component: TimeLine },
      { path: '/article', component: Article },
      { path: '/create-article', component: createArticle }
    ]
  },
  { path: '/login', component: Login },
  { path: '/register', component: register }
]

// 3. 创建路由实例并传递 `routes` 配置
// 你可以在这里输入更多的配置，但我们在这里
// 暂时保持简单
const router = createRouter({
  // 4. 内部提供了 history 模式的实现。为了简单起见，我们在这里使用 hash 模式。
  history: createWebHashHistory(),
  routes // `routes: routes` 的缩写
})

export default router
