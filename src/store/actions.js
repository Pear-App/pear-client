import jwtDecode from 'jwt-decode'

import router from '../router'
import { get, post } from '../util'

export default {
  // Auth
  async facebookLogin({ commit, dispatch }, { status, authResponse }) {
    if (status === 'connected') {
      const { jwt } = await post('/authenticate', {
        fbToken: authResponse.accessToken,
      })
      const { user: { userId } } = JSON.parse(jwtDecode(jwt).sub)
      commit('loggedIn', { facebookId: authResponse.userID, me: userId, jwt })
      router.push('/')
    }
    if (status === 'unknown') {
      commit('notLoggedIn')
    }
  },

  // Swipe
  async fetchMatches({ commit }, id) {
    const matches = await get(`/match/friend/${id}`)
    commit('setUser', { id, matches })
  },

  async acceptMatch({ commit }, { id, candidateId }) {
    await post(`/match/friend/${id}`, { candidateId, friendChoice: true })
    commit('removeMatch', { id, candidateId })
  },

  async rejectMatch({ commit }, { id, candidateId }) {
    await post(`/match/friend/${id}`, { candidateId, friendChoice: false })
    commit('removeMatch', { id, candidateId })
  },

  // Profile
  async fetchMe({ state, commit }) {
    const data = await get('/user/me')

    const users = {}

    data.friend.map(_ => {
      users[_.id] = _
    })
    data.single.map(_ => {
      users[_.id] = _
    })
    const friends = data.friend.map(_ => _.id)
    const singles = data.single.map(_ => _.id)

    const me = data.id
    delete data.friend
    delete data.single
    users[me] = data

    commit('initialise', { users, me, friends, singles })
  },

  async fetchUser({ commit }, id) {
    commit('setUser', await get(`/user/${id}`))
  },

  async setUser({ commit }, user) {
    if (user.id != null) await post(`/user/${user.id}/edit`, user)
    commit('setUser', user)
  },

  async addFriend({ commit }) {
    commit('addFriend', await post('/user/friend'))
  },
}
