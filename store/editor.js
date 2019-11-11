export const state = () => ({
  currentProcessModel: undefined,
  currentProcess: undefined
})

export const mutations = {
  setCurrentProcessModel(state, processModelId) {
    state.currentProcessModel = processModelId
  },

  setCurrentProcess(state, processId) {
    state.currentProcess = processId
  }
}
