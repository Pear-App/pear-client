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
  }
}
