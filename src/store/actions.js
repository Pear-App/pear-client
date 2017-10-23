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
    }
    if (status === 'unknown') {
      commit('notLoggedIn')
    }
  },

  logout({ commit }) {
    /* global FB */
    FB.logout()
    commit('notLoggedIn')
  },

  // Swipe
  async fetchMatches({ state, commit }, id) {
    const user = state.users[id]
    const matches = user.isMe
      ? await get('/match/single')
      : await get(`/match/friend/${id}`)
    commit('setUser', { id, matches })
  },

  async acceptMatch({ state, commit }, { id, candidateId }) {
    const user = state.users[id]
    if (user.isMe) {
      await post('/match/single', { candidateId, singleChoice: true })
    } else {
      await post(`/match/friend/${id}`, { candidateId, friendChoice: true })
    }
    commit('removeMatch', { id, candidateId })
  },

  async rejectMatch({ state, commit }, { id, candidateId }) {
    const user = state.users[id]
    if (user.isMe) {
      await post('/match/single', { candidateId, singleChoice: false })
    } else {
      await post(`/match/friend/${id}`, { candidateId, friendChoice: false })
    }
    commit('removeMatch', { id, candidateId })
  },

  // Profile
  async fetchMe({ state, commit }) {
    const data = await get('/user/me')

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
    data.inviter.map(_ => {
      _.isInvitation = true
      users[_.id] = _
    })
    const friends = data.friend.map(_ => _.id)
    const singles = data.single.map(_ => _.id)
    const invitations = data.inviter.map(_ => _.id)

    const me = data.id
    delete data.friend
    delete data.single
    delete data.inviter
    data.isMe = true
    users[me] = data

    console.log(data.rooms)
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

  // Invitations
  async addInvitation({ state, commit }) {
    const data = await post('/invitation', state.users.new)
    commit('addInvitation', data)
    router.push(`/user/${data.id}`)
  },

  async fetchInvitation({ state, commit }, hash) {
    commit('addInvitationHash', {
      hash,
      user: await get(`/invitation/${hash}`),
    })
  },

  async acceptInvitation({ commit }, hash) {
    await post(`/invitation/${hash}/accept`)
    commit('acceptInvitation', hash)
  },

  async deleteInvitation({ commit }, hash) {
    await post(`/invitation/${hash}/accept`)
  },
}
