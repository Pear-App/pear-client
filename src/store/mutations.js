export default {
  loggedIn (state, { userID }) {
    state.isLoggedIn = true
    state.userID = userID
  },
  notLoggedIn (state) {
    state.isLoggedIn = false
  }
}
