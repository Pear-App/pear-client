import store from '../store'
import router from '../router'

window.addEventListener('keyboardWillShow', function() {
  if (router.currentRoute.fullPath.indexOf('chat') !== -1) {
    store.state.showFooter = false
    document.getElementsByClassName('chat-size')[0].style.height =
      'calc(97vh - 150px)'
  }
})
window.addEventListener('keyboardDidShow', function() {
  if (router.currentRoute.fullPath.indexOf('chat') !== -1) {
    document.getElementsByClassName(
      'chat-size'
    )[0].scrollTop = document.getElementsByClassName(
      'chat-size'
    )[0].scrollHeight
  }
})
window.addEventListener('keyboardWillHide', function() {
  if (router.currentRoute.fullPath.indexOf('chat') !== -1) {
    store.state.showFooter = true
    document.getElementsByClassName('chat-size')[0].style.height =
      'calc(97vh - 230px)'
  }
})
window.addEventListener('keyboardDidHide', function() {
  if (router.currentRoute.fullPath.indexOf('chat') !== -1) {
    document.getElementsByClassName(
      'chat-size'
    )[0].scrollTop = document.getElementsByClassName(
      'chat-size'
    )[0].scrollHeight
  }
})
