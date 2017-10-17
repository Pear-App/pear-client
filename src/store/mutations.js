export default {

  // Auth
  loggedIn (state, { facebookId, id, jwt }) {
    state.isLoggedIn = true
    state.jwt = jwt
    state.me.id = id
    state.me.facebookId = facebookId
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
  setMe (state, me) { state.me = { ...state.me, ...me } },
  setFriend (state, friend) { state.friend = { ...state.friend, ...friend } },
  addFriend (state, friendId) { state.friend.id = friendId }

}
