export const state = () => ({
  currentProcess: undefined
})

export const mutations = {
  setCurrentProcess(state, processId) {
    state.currentProcess = processId
  }
}

export const actions = {
  changeProcess({ commit }, processId) {
    commit('setCurrentProcess', processId)
  }
}
