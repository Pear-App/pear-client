import Vue from 'vue'
import VueRouter from 'vue-router'

import store from './store'

Vue.use(VueRouter)

function load (component) {
  // '@' is aliased to src/components
  return () => import(`@/${component}.vue`)
}

const router = new VueRouter({
  /*
   * NOTE! VueRouter "history" mode DOESN'T works for Cordova builds,
   * it is only to be used only for websites.
   *
   * If you decide to go with "history" mode, please also open /config/index.js
   * and set "build.publicPath" to something other than an empty string.
   * Example: '/' instead of current ''
   *
   * If switching back to default "hash" mode, don't forget to set the
   * build publicPath back to '' so Cordova builds work again.
   */

  routes: [
    { path: '/', component: load('Tutorial') },
    { path: '/login', component: load('Login') },

    { path: '/user/:id', props: true, component: load('user/Profile') },
    { path: '/user/:id/setup/1', props: true, component: load('user/setup/1') },
    { path: '/user/:id/setup/2', props: true, component: load('user/setup/2') },

    { path: '/swipe', component: load('Swipe') },
    { path: '/sort', component: load('Sort') },

    // Always leave this last one
    { path: '*', component: load('Error404') } // Not found
  ]
})

router.beforeEach((to, from, next) => {
  if (to.path !== '/login' && !store.state.isLoggedIn) return next('/login')
  next()
})

export default router
