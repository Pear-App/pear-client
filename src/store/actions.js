import jwtDecode from 'jwt-decode'

import router from '../router'
import { get, post } from '../util'

export default {
  // Auth
  async facebookLogin ({ commit, dispatch }, { status, authResponse }) {
    if (status === 'connected') {
      const { jwt } = await post('/authenticate', { fbToken: authResponse.accessToken })
      const { user: { userId } } = JSON.parse(jwtDecode(jwt).sub)
      commit('loggedIn', { facebookId: authResponse.userID, id: userId, jwt })
      router.push('/')
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
    const data = {
      me: await get(`/user/${state.me.id}`),
      friends: (await get('/user/friend')).friend,
      singles: (await get('/user/single')).single
    }
    commit('initialise', data)
    // commit('initialise', await get('/user/me'))
  },

  async fetchFriend ({ commit }) {
    commit('setFriend', await get('/user/friend'))
  },

  async setMe ({ state, commit }, me) {
    if (state.me.id != null) await post(`/user/${state.me.id}/edit`, { me })
    commit('setMe', me)
  },

  async setFriend ({ commit }, friend) {
    if (friend.id != null) await post(`/user/${friend.id}/edit`, { friend })
    commit('setFriend', friend)
  },

  async addFriend ({ commit }) {
    commit('addFriend', await post('/user/friend/add'))
  }

}
