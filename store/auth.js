import { recovery, persist } from '@/front/persistence'

export const state = () => ({
  token: recovery('user')
})

export const mutations = {
  setUser(state, username) {
    persist('user', username)
    state.user = username
  },

  setToken(state, token) {
    persist('token', token)
    state.token = token
  }
}

export const actions = {
  login({ commit }, { username, token }) {
    commit('setUser', username)
    commit('setToken', token)
  },

  logout({ commit }) {
    commit('setUser', false)
    commit('setToken', false)
  }
}
