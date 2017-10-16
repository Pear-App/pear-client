import router from '../router'
import { log, post } from '../util'

export default {
  async facebookLogin ({ commit }, { status, authResponse, redirect }) {
    if (status === 'connected') {
      await post('/login', { accessToken: authResponse.accessToken }).catch(log)
      commit('loggedIn', { userID: authResponse.userID })
      router.push(redirect)
    }
    if (status === 'unknown') {
      commit('notLoggedIn')
    }
  },

  findingFor ({ state, commit }, findingFor) {
    commit('findingFor', findingFor)
  },

  async fetchPerson ({ state, commit }) {
    const gender = state.friend.lookingFor === 0 ? 'female' : 'male'
    const res = await fetch(`https://randomuser.me/api/?gender=${gender}&inc=gender,name,picture`)
    const data = await res.json()
    const person = data.results[0]
    commit('addPerson', {
      picture: person.picture.large,
      name: `${person.name.first} ${person.name.last}`,
      gender: person.gender === 'male' ? 1 : 0
    })
  },

  updateFriend ({ commit }, friend) {
    commit('updateFriend', friend)
  }
}
