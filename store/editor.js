export const state = () => ({
  currentProcessModel: undefined
})

export const mutations = {
  setCurrentProcessModel(state, processModelId) {
    state.currentProcessModel = processModelId
  }
}
