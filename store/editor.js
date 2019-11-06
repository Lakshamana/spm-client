export const state = () => ({
  currentProcessModel: undefined,
  currentGraphicDescription: undefined
})

export const mutations = {
  setCurrentProcessModel(state, processModelId) {
    state.currentProcessModel = processModelId
  },

  setCurrentGraphicDescription(state, gdId) {
    state.currentGraphicDescription = gdId
  }
}
