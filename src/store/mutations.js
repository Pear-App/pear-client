export default {
  loggedIn (state, { userID }) {
    state.isLoggedIn = true
    state.userID = userID
  },

  notLoggedIn (state) {
    state.isLoggedIn = false
  },

  updateFindingFor (state, findingFor) {
    state.findingFor = findingFor
  },

  addPerson (state, person) {
    state.persons.queue.unshift(person)
  },

  updatePersons (state, persons) {
    state.persons = { ...state.persons, ...persons }
  },

  updateFriend (state, friend) {
    state.friend = { ...state.friend, ...friend }
  }
}
