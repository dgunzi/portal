import portal from '../api/portal'
import {has, isArray, isString, isObject, merge} from 'lodash'

const state = {
  portlets: {}
}

// getters
const getters = {
  allLayout: state => state.portlets.layout,
  allCLayout: state => state.portlets.clayout,
  allComponents: state => state.portlets.component,
  getClayoutByLayout: (state) => (index) => {
    let content = state.portlets.layout[index].content;
    let clayoutAry = [];
    let getClayout = (idStr) => {
      state.portlets.clayout.find(layout => layout.id === idStr)
    }
    for (let i = 0, length = content.length; i < length; i++) {
      if (content[i].indexOf('l_') === 0) {
        clayoutAry[i] = getClayout(content[i]);
      }
    }
    return clayoutAry;
  }
}

// actions
const actions = {
  getPortlets ({ commit }) {
    return new Promise((resolve, reject) => {
      portal.getPortlets(portlets => {
        commit('setPortlets', portlets)
        resolve()
      })
    })
  }
}

// mutations
const mutations = {
  setPortlets (state, portlets) {
    state.portlets = portlets
  },
  changeOnePortlet (state, {row, index, content}) {
    if (isObject(content) && has(content, 'id') && has(content, 'size') && isArray(content.size)) {
      console.log(content.size.length);
      merge(content, {
        content: new Array(content.size.length).fill('')
      })
      console.log(content);
      let tempContent = Array.from(state.portlets.layout[row].content);
      tempContent[index] = content.id;
      state.portlets.layout[row].content = tempContent;
      let clayout = Array.from(state.portlets.clayout);
      clayout.push(content);
      state.portlets.clayout = clayout;
    } else {
      if (isString(content)) {
        let tempContent = Array.from(state.portlets.layout[row].content);
        tempContent[index] = content;
        state.portlets.layout[row].content = tempContent;
      } else {
        throw new Error('content arguments is wrong, please check it!');
      }
    }
  },
  changeChildPortlet (state, {id, index, content}) {
    let tempLayout = null;
    for (let i = 0, length = state.portlets.clayout.length; i < length; i++) {
      if (state.portlets.clayout[i].id === id) {
        tempLayout = state.portlets.clayout[i];
        break;
      }
    }
    if (tempLayout !== null) {
      let tempContent = Array.from(tempLayout.content);
      tempContent[index] = content;
      tempLayout.content = tempContent;
    }
  },
  removeLayout(state, {row}) {
    state.portlets.layout.splice(row, 1);
  },
  addLayout (state, layout) {
    state.portlets.layout.push(layout);
  },
  getClayout(state, { id }) {
    return state.portlets.clayout.find(layout => layout.id === id)
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
