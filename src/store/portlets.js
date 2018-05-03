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