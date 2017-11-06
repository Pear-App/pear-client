import jwtDecode from 'jwt-decode'

import router from '../router'
import { get, post, del, log } from '../util'

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
      await commit('loggingIn', {
        facebookId: authResponse.userID,
        me: userId,
        jwt,
      })
      await dispatch('fetchMe')
      commit('loggedIn')
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
    const blockedIds = data.blockedIds
    delete data.friend
    delete data.single
    delete data.inviter
    delete data.rooms
    delete data.blockedIds
    data.isMe = true
    users[me] = data

    await commit('initialise', {
      users,
      me,
      friends,
      singles,
      invitations,
      rooms,
      blockedIds,
    })
  },

  async fetchUser({ commit }, id) {
    const [user, err] = await get(`/user/${id}`)
    if (err != null) return log(err)
    commit('setUser', user)
  },

  async setUser({ state, commit }, user) {
    commit('setUser', user)
    if (user.id != null && user.id !== 'new') {
      const [, err] = await post(`/user/${user.id}/edit`, {
        ...state.users[user.id],
        ...user,
      })
      if (err != null) return log(err)
    }
  },

  // Invitations
  async addInvitation({ state, commit }) {
    const [invitation, err] = await post('/invitation', state.users.new)
    if (err != null) return log(err)
    commit('addInvitation', {
      ...state.users.new,
      ...invitation,
      isInvitation: true,
    })
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
    const [, err] = await post(`/invitation/${hash}/accept`)
    if (err != null) return log(err)
    return commit('acceptInvitation', hash)
  },

  async deleteInvitation({ commit }, hash) {
    const [, err] = await post(`/invitation/${hash}/accept`)
    if (err != null) return log(err)
  },

  // Photos
  async getProfilePictures({ commit }) {
    const [photos, err] = await get('/photo')
    if (err != null) return log(err)
    commit('setPhotos', photos)
  },

  async choosePhotos({ state, commit }, photos) {
    const [, err] = await post('/photo', { photoIds: photos })
    if (err != null) return log(err)
    commit('setUser', { ...state.users[state.me], photos })
  },

  // Messages
  async getRoomMessages({ commit }, roomId) {
    const [messages, err] = await get(`/room/${roomId}/messages`)
    if (err != null) {
      log(err)
    } else {
      commit('setRoomMessages', { roomId, messages })
    }
  },

  // Blacklists
  async unblockPerson({ commit }, otherPersonId) {
    const [, err] = await del('/blacklist', { blockeeId: otherPersonId })
    if (err != null) {
      log(err)
    } else {
      commit('unblockPerson', otherPersonId)
    }
  },

  async blockPerson({ commit }, otherPersonId) {
    const [, err] = await post('/blacklist', { blockeeId: otherPersonId })
    if (err != null) {
      log(err)
    } else {
      commit('blockPerson', otherPersonId)
    }
  },
}
