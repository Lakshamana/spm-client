export const state = () => ({
  currentProcess: undefined
})

export const mutations = {
  setCurrentProcess(state, processId) {
    console.log('received:', processId)
    state.currentProcess = processId
  }
}
