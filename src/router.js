import Vue from 'vue'
import VueRouter from 'vue-router'

import { log } from './util'

Vue.use(VueRouter)

function load(component) {
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
    { path: '/', component: load('Loader') },
    { path: '/login', component: load('Login') },

    // Users
    {
      path: '/user/:id',
      props: {
        default: true,
        footer: true,
      },
      components: {
        default: load('user/Index'),
        footer: load('user/Tabs'),
      },
      children: [
        { path: 'profile', component: load('user/Profile') },
        { path: 'swipe', component: load('user/Swipe') },
        { path: 'sort', component: load('user/Sort') },
      ],
    },

    // Invite friends
    { path: '/invite/1', component: load('invite/1') },
    { path: '/invite/2', component: load('nvite/2') },

    // Invited by friends
    { path: '/join/:hash', props: true, component: load('Join') },

    // Always leave this last one
    { path: '*', component: load('Error404') }, // Not found
  ],
})

if (process.env.NODE_ENV !== 'production') {
  router.beforeEach((to, from, next) => {
    log(`Routing to: ${to.path}`)
    next()
  })
}

export default router
