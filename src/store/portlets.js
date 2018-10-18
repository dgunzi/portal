import portal from '../api/portal'
import {has, isArray, isString, isObject, merge} from 'lodash'

const state = {
  portlets: {}
}

// getters
const getters = {
  allLayout: state => state.portlets.layout,
  allComponents: state => state.portlets.component
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
    if (isObject(content) && has(content, 'size') && isArray(content.size)) {
      merge(content, {
        content: new Array(content.size.length).fill('')
      })
      let tempContent = Array.from(state.portlets.layout[row].content);
      tempContent[index] = content;
      state.portlets.layout[row].content = tempContent;
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
  changeChildPortlet (state, {row, index, cIndex, content}) {
    let clayout = state.portlets.layout[row].content[index];
    let tempContent = Array.from(clayout.content);
    tempContent[cIndex] = content;
    clayout.content = tempContent;
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
