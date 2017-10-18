import jwtDecode from 'jwt-decode'

import router from '../router'
import { get, post } from '../util'

export default {
  // Auth
  async facebookLogin ({ commit, dispatch }, { status, authResponse }) {
    if (status === 'connected') {
      const { jwt } = await post('/authenticate', { fbToken: authResponse.accessToken })
      const { user: { userId } } = JSON.parse(jwtDecode(jwt).sub)
      commit('loggedIn', { facebookId: authResponse.userID, me: userId, jwt })
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
      me: await get(`/user/${state.me}`),
      friends: (await get('/user/friend')).friend,
      singles: (await get('/user/single')).single
    }
    const users = {}
    users[data.me.id] = data.me
    data.friends.map(_ => { users[_.id] = _ })
    data.singles.map(_ => { users[_.id] = _ })
    const me = data.me.id
    const friends = data.friends.map(_ => _.id)
    const singles = data.singles.map(_ => _.id)
    commit('initialise', { users, me, friends, singles })
    // commit('initialise', await get('/user/me'))
  },

  async fetchUser ({ commit }, id) {
    commit('setUser', await get(`/user/${id}`))
  },

  async setUser ({ commit }, user) {
    if (user.id != null) await post(`/user/${user.id}/edit`, user)
    commit('setUser', user)
  },

  async addFriend ({ commit }) {
    commit('addFriend', await post('/user/friend/add'))
  }

}
