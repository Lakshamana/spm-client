export const state = () => ({
  currentProcess: undefined
})

export const mutations = {
  setCurrentProcess(state, processId) {
    state.currentProcess = processId
  }
}
