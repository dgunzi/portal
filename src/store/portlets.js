import portal from '../api/portal'

const state = {
  portlets: {}
}

// getters
const getters = {
  allLayout: state => state.portlets.layout,
  allCLayout: state => state.portlets.clayout,
  allComponents: state => state.portlets.components
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
    let tempContent = Array.from(state.portlets.layout[row].content);
    tempContent[index] = content;
    state.portlets.layout[row].content = tempContent;
  },
  changeChildPortlet (state, {id, index, content}) {
    let tempLayout = null;
    for (let i = 0, length = state.portlets.clayout.length; i < length; i++) {
      console.log(state.portlets.clayout[i].id);
      console.log(id);
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
