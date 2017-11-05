import Vue from 'vue'
import { initialUser } from '../util'

export default {
  // Auth
  loggedIn(state, { facebookId, me, jwt }) {
    state.isLoggedIn = true
    state.jwt = jwt
    state.me = me
    state.users[me] = { facebookId }
  },
  notLoggedIn(state) {
    state.isLoggedIn = false
    state.jwt = null
  },
  finishedTutorial(state) {
    state.hasSeenTutorial = true
  },

  // Swiping
  removeMatch(state, { id, candidateId }) {
    const index = state.users[id].matches.findIndex(
      _ => toString(_.id) === toString(candidateId)
    )
    state.users[id].matches.splice(index, 1)
  },

  // Profile
  initialise(state, { users, me, friends, singles, invitations, rooms }) {
    users.new = state.users.new
    state.users = users
    state.me = me
    state.friends = friends
    state.singles = singles
    state.invitations = invitations
    state.rooms = rooms
  },
  setUser(state, user) {
    if (state.users[user.id] == null)
      state.users[user.id] = initialUser(user.id)
    state.users[user.id] = { ...state.users[user.id], ...user }
  },
  addFriend(state, friendId) {
    state.friend.id = friendId
  },

  // Invitations
  addInvitation(state, invitation) {
    state.users[invitation.id] = invitation
    state.invitations.push(invitation.id)
    state.lastInvited = invitation.id
    state.users.new = initialUser('new')
  },
  addInvitationHash(state, { hash, user }) {
    Vue.set(state.invitationHashes, hash, user)
    Vue.set(state.users, user.inviter.id, user.inviter)
  },
  acceptInvitation(state, hash) {
    const user = state.invitationHashes[hash]
    state.friends.push(user.inviter.id)
    Vue.set(state.users, user.inviter.id, user.inviter)
    delete user.inviter
    delete user.inviterId
    delete user.id
    Vue.set(state.users, state.me, { ...state.users[state.me], ...user })
  },

  // Photos
  setPhotos(state, photos) {
    state.photos = photos
  },

  // Messages
  setRoomMessages(state, { roomId, messages }) {
    state.roomMessages[roomId] = messages
  },

  patchRoomMessage(state, { roomId, message }) {
    state.roomMessages[roomId].push(message)
  },
}
