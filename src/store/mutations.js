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

  // Swiping
  removeMatch(state, { id, candidateId }) {
    state.users[id].matches = state.users[id].matches.filter(
      _ => _.id !== candidateId
    )
  },

  // Profile
  initialise(state, { users, me, friends, singles, invitations }) {
    users.new = state.users.new
    state.users = users
    state.me = me
    state.friends = friends
    state.singles = singles
    state.invitations = invitations
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
  addInvitation(state, id) {
    state.users[id] = state.users.new
    state.users[id].id = id
    state.users.new = initialUser('new')
  },
}
