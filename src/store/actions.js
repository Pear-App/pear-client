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
    if (data.invitation == null) data.invitation = await get('/invitation/me')

    const users = {}

    data.friend.map(_ => {
      _.isFriend = true
      users[_.id] = _
    })
    data.single.map(_ => {
      _.isSingle = true
      if (users[_.id] != null) {
        users[_.id] = { ...users[_.id], ..._ }
      } else {
        users[_.id] = _
      }
    })
    data.invitation.map(_ => {
      _.isInvitation = true
      users[_.id] = _
    })
    const friends = data.friend.map(_ => _.id)
    const singles = data.single.map(_ => _.id)
    const invitations = data.invitation.map(_ => _.id)

    const me = data.id
    delete data.friend
    delete data.single
    // delete data.invitation
    data.isMe = true
    users[me] = data

    commit('initialise', { users, me, friends, singles, invitations })
  },

  async fetchUser({ commit }, id) {
    commit('setUser', await get(`/user/${id}`))
  },

  async setUser({ commit }, user) {
    if (user.id != null && user.id !== 'new')
      await post(`/user/${user.id}/edit`, user)
    commit('setUser', user)
  },

  async addInvitation({ state, commit }) {
    commit('addInvitation', await post('/invitation', state.users.new))
  },
}
