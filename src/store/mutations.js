export default {

  // Auth
  loggedIn (state, { facebookId, me, jwt }) {
    state.isLoggedIn = true
    state.jwt = jwt
    state.me = me
    state.users[me] = { facebookId }
  },
  notLoggedIn (state) { state.isLoggedIn = false },

  // Swiping
  removeMatch (state, { id, candidateId }) {
    state.users[id].matches = state.users[id].matches.filter(_ => _.id !== candidateId)
  },

  // Profile
  initialise (state, { users, me, friends, singles }) {
    state.users = users
    state.me = me
    state.friends = friends
    state.singles = singles
  },
  setUser (state, user) { state.users[user.id] = { ...state.users[user.id], ...user } },
  addFriend (state, friendId) { state.friend.id = friendId }

}
