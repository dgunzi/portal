/**
 * Created by dgunzi on 2018/5/3.
 */

const install = function(Vue, opts = {}) {
  Vue.component('hello', () => import('./hello'))
  Vue.component('chart1', () => import('./chart1'))
  Vue.component('line1', () => import('./line1'))
  Vue.component('table1', () => import('./table1'))
  Vue.component('info', () => import('./info'))
  Vue.component('test', () => import('./test'))
}
export default {
  install
}
