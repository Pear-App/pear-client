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
  addPerson (state, person) { state.persons.push(person) },
  setPerson (state, person) {
    const index = state.persons.findIndex(p => p.id === person.id)
    if (index === -1) {
      state.persons.push(person)
    }
    else {
      state.persons[index] = { ...state.persons[index], ...person }
    }
  },
  setPersons (state, persons) { state.persons = [ ...state.persons, ...persons ] },

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
