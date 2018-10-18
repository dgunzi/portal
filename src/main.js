// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import Sunflower from 'vue-sunflower'
import Router from 'vue-router'
import router from './router'
import store from './store'
import './styles/chalk-theme/index.styl'
import './styles/dark-theme/index.styl'
import Portal from './home/portlets'

Vue.config.productionTip = false
Vue.use(Sunflower)
Vue.use(Router)
Vue.use(Portal)

router.beforeEach(function (to, from, next) {
  //  判断是否有token和uuid
    // 从storge中获取基本信息
    store.commit('SET_TOKEN')
    if ((to.path === '/login' || to.path === '/') && store.getters.index) {
      next(store.getters.index)
    } else {
      Sunflower.LoadingBar.start()
      if (to.path === '/login') {
        next('/')
      } else {
        next()
      }
      // 判断是否有用户数据
      if (!store.getters.userData) {
        // 获取用户数据
        Promise.all([
          store.dispatch('getUserData').then(function (data) {
            // 获取用户信息成功
            console.log(data)
          }),
          store.dispatch('getInitMenu').then(function (data) {
            // 获取asyncRouter
            console.log(data)
            return store.dispatch('concatRouters').then(function (data) {
              // 获取asyncRouter
              console.log(data)
            })
          })
        ]).then(function () {
          // 登录并获取数据成功后添加路由
          router.addRoutes(store.getters.addRouters)
        }).catch(function () {
          // 处理报错
        })
      }
    }
})

router.afterEach((to, from, next) => {
  setTimeout(() => {
    Sunflower.LoadingBar.finish()
  }, 800)
})
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: {App}
})

