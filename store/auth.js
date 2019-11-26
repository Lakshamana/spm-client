import { recovery, persist } from '@/front/persistence'

export const state = () => ({
  token: recovery('token'),
  user: recovery('user'),
  lastLoginDate: recovery('lastLoginDate'),
  lastLogin: recovery('lastLogin')
})

export const mutations = {
  setUser(state, username) {
    persist('user', username)
    state.user = username
  },

  setToken(state, token) {
    persist('token', token)
    state.token = token
  },

  setLastLoginDate(state) {
    const date = Date.now()
    persist('lastLoginDate', date)
    state.lastLoginDate = date
  },

  setLastLogin(state, username) {
    persist('lastLogin', username)
    state.lastLogin = username
  }
}

export const actions = {
  login({ commit }, { username, token, lastLogin }) {
    commit('setUser', username)
    commit('setToken', token)
    lastLogin && commit('setLastLogin', username)
    commit('setLastLoginDate')
  },

  logout({ commit }) {
    commit('setUser', false)
    commit('setToken', false)
  }
}
