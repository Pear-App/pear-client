import jwtDecode from 'jwt-decode'

import router from '../router'
import { get, post, log } from '../util'

export default {
  // Auth
  async facebookLogin({ commit, dispatch }, { status, authResponse }) {
    if (status === 'connected') {
      const [data, err] = await post('/authenticate', {
        fbToken: authResponse.accessToken,
      })
      // TODO: catch error
      if (err != null) log(err)
      const { jwt } = data
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
    const [matches, err] = user.isMe
      ? await get('/match/single')
      : await get(`/match/friend/${id}`)
    // TODO: catch error
    if (err != null) log(err)
    commit('setUser', { id, matches })
  },

  async acceptMatch({ state, commit }, { id, candidateId }) {
    const user = state.users[id]
    if (user.isMe) {
      post('/match/single', { candidateId, singleChoice: true })
    } else {
      post(`/match/friend/${id}`, { candidateId, friendChoice: true })
    }
    // TODO: catch error
    commit('removeMatch', { id, candidateId })
  },

  async rejectMatch({ state, commit }, { id, candidateId }) {
    const user = state.users[id]
    if (user.isMe) {
      post('/match/single', { candidateId, singleChoice: false })
    } else {
      post(`/match/friend/${id}`, { candidateId, friendChoice: false })
    }
    // TODO: catch error
    commit('removeMatch', { id, candidateId })
  },

  // Profile
  async fetchMe({ state, commit }) {
    const [data, err] = await get('/user/me')
    if (err != null) return log(err)
    const users = {}

    data.friend.forEach(_ => {
      _.isFriend = true
      users[_.id] = _
    })
    data.single.forEach(_ => {
      _.isSingle = true
      if (users[_.id] != null) {
        users[_.id] = { ...users[_.id], ..._ }
      } else {
        users[_.id] = _
      }
    })
    data.inviter.forEach(_ => {
      _.isInvitation = true
      users[_.id] = _
    })
    const friends = data.friend.map(_ => _.id)
    const singles = data.single.map(_ => _.id)
    const invitations = data.inviter.map(_ => _.id)

    const me = data.id
    const rooms = data.rooms
    delete data.friend
    delete data.single
    delete data.inviter
    delete data.rooms
    data.isMe = true
    users[me] = data

    commit('initialise', { users, me, friends, singles, invitations, rooms })
    return Promise.resolve()
  },

  async fetchUser({ commit }, id) {
    const [user, err] = await get(`/user/${id}`)
    if (err != null) return log(err)
    commit('setUser', user)
  },

  async setUser({ commit }, user) {
    if (user.id != null && user.id !== 'new') {
      const [, err] = post(`/user/${user.id}/edit`, user)
      if (err != null) return log(err)
    }
    commit('setUser', user)
  },

  // Invitations
  async addInvitation({ state, commit }) {
    const [invitation, err] = await post('/invitation', state.users.new)
    if (err != null) return log(err)
    commit('addInvitation', invitation)
    router.push(`/user/${invitation.id}/profile`)
  },

  async fetchInvitation({ state, commit }, hash) {
    const [user, err] = await get(`/invitation/${hash}`)
    if (err != null) return log(err)
    commit('addInvitationHash', {
      hash,
      user,
    })
  },

  async acceptInvitation({ commit }, hash) {
    const [, err] = post(`/invitation/${hash}/accept`)
    if (err != null) return log(err)
    commit('acceptInvitation', hash)
  },

  async deleteInvitation({ commit }, hash) {
    const [, err] = post(`/invitation/${hash}/accept`)
    if (err != null) return log(err)
  },
}
