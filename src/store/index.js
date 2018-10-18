/**
 * Created by YOU on 2017/7/18.
 */
import Vue from 'vue'
import Vuex from 'vuex'
import $axios from '@/plugins/ajax'
import {asyncRouter, constRouter} from '@/router'
import userinfo from './userinfo'
import menus from './menus'
import portlets from './portlets'

Vue.use(Vuex)
/* eslint-disable no-unused-vars */
function hasMenu(name, key, route) {
  if (route.meta && route.meta.keyWord) {
    if (route.meta.keyWord.indexOf(name) >= 0) {
      // 判断有对应模板，挂载新模板
      if (route.meta.template && route.meta.template[key]) {
        route.children = route.meta.template[key]
      }
      return true
    } else {
      return false
    }
  } else {
    return true
  }
}

let store = new Vuex.Store({
  state: {
    userName: null,
    uuid: null,
    role: null,
    sessionId: null,
    // 用户数据
    userData: null,
    // 初始路由
    routers: constRouter,
    // 动态添加路由
    addRouters: [],
    index: null,
    // 角色权限树
    initMenu: null,
    // 手机口令牌登录设置
    phoneTokenData: null,
    // 菜单
    menu: [
      {
        class: 'icon-nav-account-manage',
        title: '账号管理',
        to: '/AccountManage',
        keyWord: 'accountManage',
        icon: 'nav-account-manage',
        msg: '组织机构、授权策略、机构、改密'
      },
      {
        class: 'icon-nav-asset-manage',
        title: '资产管理',
        to: '/AssetsAll',
        keyWord: 'assetsManage',
        icon: 'nav-asset-manage',
        msg: '资产发现、资产管理、配置管理'
      },
      {
        class: 'icon-nav-asset-monitor',
        title: '资产监控',
        to: '/AssetsMonitor',
        keyWord: 'assetsMonitor',
        icon: 'nav-asset-monitor',
        msg: '资产监控、拓扑视图、业务服务'
      },
      {
        class: 'icon-nav-oper-center-t',
        title: '运维中心',
        to: '/OperationCenter',
        keyWord: 'operationCenter',
        icon: 'nav-oper-center-t',
        msg: '运维、双人协作、客户端下载'
      },
      {
        class: 'icon-nav-event-center',
        title: '事件中心',
        to: '/EventCenter',
        keyWord: 'eventCenter',
        icon: 'nav-event-center',
        msg: '告警、异常事件、规则、知识库'
      },
      {
        class: 'icon-histogram',
        title: '报表中心',
        to: '/LogCenter',
        keyWord: 'logCenter',
        icon: 'histogram',
        msg: '统计、审计总数、监控排行'
      },
      {
        class: 'icon-nav-system-set',
        title: '系统设置',
        to: '/SystemSet',
        keyWord: 'systemSet',
        icon: 'nav-system-set',
        msg: '自检、备份、公告、注册升级'
      }
    ],
    // 面包屑
    bread: [],
    // 授权
    authCurrent: 0,
    docData: {
      isShow: '',
      selectDocList: []
    },
    assetData: {
      isShow: '',
      selectAssetList: []
    },
    namecard: {
      show: false,
      data: null,
      x: 0,
      y: 0
    }
  },
  getters: {
    userName: state => state.userName,
    uuid: state => state.uuid,
    sessionId: state => state.sessionId,
    userData: state => state.userData,
    routers: state => state.routers,
    addRouters: state => state.addRouters,
    index: state => state.index,
    initMenu: state => state.initMenu,
    menu: state => {
      let menuList = state.initMenu
      let keyWords = menuList.map(function (item) {
        return item.keyWord
      })
      return state.menu.filter(function (item) {
        if (keyWords.indexOf(item.keyWord) !== -1) {
          return true
        }
        return false
      })
    },
    bread: state => state.bread,
    authCurrentText: state => {
      if (state.authCurrent === 3) {
        return '保存'
      } else {
        return '下一步'
      }
    }
  },
  mutations: {
    SET_ROUTER (state, router) {
      state.addRouters = router
      // 设置/对应的路由
      state.index = state.addRouters[1].path
      state.routers = constRouter.concat(asyncRouter)
    },
    SET_TOKEN (state) {
      state.userName = localStorage.getItem('userName')
      state.uuid = localStorage.getItem('uuid')
      state.sessionId = localStorage.getItem('sessionId')
    },
    getBread (state, fullPath) {
      fullPath = fullPath.length > 1 ? fullPath.replace(/\/$/, '') : fullPath
      let pathTemp = '/'
      let paths = fullPath.split('/').slice(1).map(function (route) {
        let to = pathTemp + route
        pathTemp = to + '/'
        return {
          path: route,
          to: to
        }
      })
      let addRouters = state.addRouters

      deepBread(paths, addRouters)
      function deepBread(paths, routers, index) {
        let k = index || 0
        for (let i = 0; i < routers.length; i++) {
          // 匹配路由
          if (routers[i].path.toLowerCase().indexOf(paths[k].path.split('?')[0].toLowerCase()) !== -1) {
            paths[k] = {
              ...paths[k],
              title: routers[i].meta && routers[i].meta.name ? routers[i].meta.name : '未知'
            }
            // 如果存在动态路由，去掉query参数
            if (routers[i].path.indexOf('/') > 0) {
              let add = routers[i].path.split('/').length - 1
              while (add-- > 0) {
                paths[k].to += ('/' + paths[k + 1].path)
                paths.splice(k + 1, 1)
              }
              // function传入当前path并执行自定义方法生成title
              if (typeof paths[k].title === 'function') {
                paths[k].title = paths[k].title(paths[k].to)
              }
            }
            // 下一级路由
            if (paths[k + 1]) {
              deepBread(paths, routers[i].children, k + 1)
            }
            return false
          }
        }
        return false
      }

      paths.unshift({
        path: 'HomePage',
        to: '/HomePage',
        title: '首页'
      })
      state.bread = paths
    },
    authIncrement(state) {
      state.authCurrent++
      if (state.authCurrent > 3) {
        state.authCurrent = 0
      }
    },
    authZero(state) {
      state.authCurrent = 0
    },
    getDocList(state, val) {
      state.docData.selectDocList = val
    },
    openDocDialog(state, val = true) {
      state.docData.isShow = val
    },
    getAssetList(state, val) {
      state.assetData.selectAssetList = val
    },
    openAssetDialog(state, val = true) {
      state.assetData.isShow = val
    },
    nameCardShow(state, val) {
      state.namecard.show = true
      state.namecard.data = val.data
      let windowWidth = val.event.view.innerWidth;    // 获取当前视窗宽度
      let windowHeight = val.event.view.innerHeight;  // 获取当前视窗高度
      state.namecard.x = parseInt(val.event.clientX) - 40
      state.namecard.y = parseInt(val.event.clientY) + 20
      if (parseInt(val.event.clientX) + 650 > windowWidth) {
        let x_ = state.namecard.x - parseInt(val.event.clientX + 650 - windowWidth) - 640
        state.namecard.x = (x_ < 0) ? 0 : x_;
      }
      if (parseInt(val.event.clientY) + 400 > windowHeight) {
        state.namecard.y -= parseInt(val.event.clientY + 400 - windowHeight)
      }
    },
    nameCardHide(state) {
      state.namecard = {
        show: false,
        data: null,
        x: 0,
        y: 0
      }
    }
  },
  actions: {
    login ({state}, params) {
      // 记录用户名
      state.userName = params.userLoginName
      return new Promise((resolve, reject) => {
        $axios.post('/login/loginMany', params).then(function ({data}) {
          if (data.picPath) {
            // 显示手机口令牌设置弹框
            state.phoneTokenData = data
            resolve(data)
          } else {
            // 重置手机口令牌设置弹框(不显示)
            state.phoneTokenData = null
            if (data.roleUuid) {
              state.uuid = data.roleUuid.replace(/,/, '')
              state.sessionId = data.sessionId
              localStorage.setItem('userName', params.userLoginName)
              localStorage.setItem('uuid', state.uuid)
              localStorage.setItem('sessionId', state.sessionId)
              localStorage.setItem('authorizationModel', JSON.stringify(data.authorizationModel))
              resolve(data)
            } else {
              reject(data)
            }
          }
        })
      })
    },
    logout ({state}) {
      return new Promise(function (resolve, reject) {
        $axios.get('/login/userLogout/' + state.userName).then(function ({data}) {
          if (data === true) {
            let theme = localStorage.getItem('theme')
            localStorage.clear()
            if (theme !== null) {
              localStorage.setItem('theme', theme)
            }
            resolve(true)
          } else {
            resolve(false)
          }
        })
      })
    },
    // VUEX
    getUserData ({state}) {
      return new Promise((resolve, reject) => {
        state.userData = userinfo
        resolve(userinfo);
      })
    },
    getInitMenu({state}) {
      return new Promise((resolve, reject) => {
        state.initMenu = menus
        resolve(menus);
      })
    },
    concatRouters ({state, commit}) {
      return new Promise(function (resolve, reject) {
        // 当前角色
        let menuList = state.initMenu
        let firstMenu = []
        for (let i = 0; i < menuList.length; i++) {
          if (menuList[i].menuLevel === 1) {
            firstMenu.push(menuList[i])
          }
        }
        let routers = asyncRouter.filter(function (item) {
          for (let i = 0; i < firstMenu.length; i++) {
            if (hasMenu(firstMenu[i].keyWord, firstMenu[i].keyName, item)) {
              return item
            }
          }
        })
        commit('SET_ROUTER', routers)
        resolve(asyncRouter)
      })
    },
    nameCardShow({state, commit}, params) {
      let val = {}
      $axios.get(`/iamUserInfo/viewUserInfo/${params.useruuid}`).then(({ status, data }) => {
        if (status === 200 || status === 304) {
          Object.assign(val, {event: params.event, data: data});
          store.commit('nameCardShow', val);
        }
      });
    },
    nameCardHide({state, commit}) {
      store.commit('nameCardHide');
    },
    nameCardToggle({state, commit}, params) {
      if (state.namecard.show) {
        store.dispatch('nameCardHide');
      } else {
        store.dispatch('nameCardShow', params)
      }
    }
  },
  modules: {
    portlets
  }
})

export default store
