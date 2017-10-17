import jwtDecode from 'jwt-decode'

import router from '../router'
import { get, post } from '../util'

export default {
  // Auth
  async facebookLogin ({ commit, dispatch }, { status, authResponse, redirect }) {
    if (status === 'connected') {
      const { jwt } = await post('/authenticate', { fbToken: authResponse.accessToken })
      const { user: { userId } } = JSON.parse(jwtDecode(jwt).sub)
      commit('loggedIn', { facebookId: authResponse.userID, id: userId, jwt })
      dispatch('fetchMe')
      router.push(redirect)
    }
    if (status === 'unknown') {
      commit('notLoggedIn')
    }
  },

  // Swipe
  async fetchPerson ({ commit }) {
    const person = await get('/user/single')
    person.accepted = null
    commit('addPerson', person)
  },

  setPerson ({ commit }, person) {
    commit('setPerson', person)
  },

  // Profile
  async fetchMe ({ state, commit }) {
    commit('setMe', await get(`/user/${state.me.id}`))
  },

  async fetchFriend ({ commit }) {
    commit('setFriend', await get('/user/friend'))
  },

  async setMe ({ state, commit }, me) {
    await post(`/user/${state.me.id}/edit`, { me })
    commit('setMe', me)
  },

  async setFriend ({ commit }, friend) {
    await post(`/user/${friend.id}/edit`, { friend })
    commit('setFriend', friend)
  },

  async addFriend ({ commit }) {
    commit('addFriend', await post('/user/friend/add'))
  }

}
