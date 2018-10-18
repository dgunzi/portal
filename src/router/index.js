// Vue + Router
import Vue from 'vue'
import Router from 'vue-router'
import Error from '@/home/404.vue'
import Home from '@/home/Home'
import PortalRouter from './PortalRouter'
Vue.use(Router)

// 平台首页
let HomePage = () => import('@/home/3dRoom')

// 懒加载路由
export const asyncRouter = [
  {
    path: '/',
    beforeEnter (to, from, next) {
      next('/Portal')
    }
  },
  {
    path: '/HomePage',
    component: HomePage,
    meta: {
      name: '首页'
    }
  },
  {
    path: '/Portal',
    component: Home,
    children: PortalRouter,
    meta: {
      keyWord: 'Portal',
      name: '自定义首页'
    }
  },
  {
    path: '*',
    name: '404',
    component: Error
  }
]
// 未登录只有login路由
export const constRouter = [
]

let router = new Router({
  routes: constRouter,
  linkActiveClass: 'active'
})

export default router
