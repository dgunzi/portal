// Vue + Router
import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/home/Login'
import Error from '@/home/404.vue'
Vue.use(Router)

// 平台首页
let HomePage = () => import('@/home/HomePage')

// 懒加载路由
export const asyncRouter = [
  {
    path: '/',
    beforeEnter (to, from, next) {
      next('/login')
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
    path: '*',
    name: '404',
    component: Error
  }
]
// 未登录只有login路由
export const constRouter = [
  {
    path: '/login',
    name: 'index',
    component: Login
  }
]

let router = new Router({
  routes: constRouter,
  linkActiveClass: 'active'
})

router.beforeEach((to, from, next) => {
  if (window.resizeHandler) {
    window.removeEventListener('resize', window.resizeHandler)
    window.resizeHandler = undefined
  }
  if (typeof window.mxEvent !== 'undefined') {
    window.mxEvent.removeAllListeners(window)
    window.mxEvent.removeAllListeners(document)
  }
  next()
})

export default router
