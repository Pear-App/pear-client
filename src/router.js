import Vue from 'vue'
import VueRouter from 'vue-router'

import { log } from './util'
import store from './store'

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
    {
      path: '/',
      component: load('Loader'),
    },
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
        { path: 'profile/edit', component: load('user/EditProfile') },
        { path: 'swipe', component: load('user/Swipe') },
        { path: 'chat', component: load('chat/ChatRoomList') },
        {
          path: 'chat/:otherPersonId',
          component: load('chat/ChatView'),
          props: true,
        },
      ],
    },

    // Invite friends
    { path: '/invite/1', component: load('invite/1') },
    { path: '/invite/2', component: load('invite/2') },

    // Invited by friends
    { path: '/join/:hash', props: true, component: load('join/Index') },

    // Settings
    { path: '/settings', component: load('Settings') },

    // Privacy Policy
    { path: '/privacy', component: load('Privacy') },

    // Terms of Service
    { path: '/terms', component: load('Terms') },

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

router.beforeEach((to, from, next) => {
  console.log(to)
  if (to.path === '/') {
    if (store.state.friends.length > 0) {
      next({ path: `/user/${store.state.me}/swipe`, replace: true })
    } else if (store.state.singles.length > 0) {
      next({ path: `/user/${store.state.singles[0]}/swipe`, replace: true })
    } else {
      next({ path: `/invite/1`, replace: true })
    }
  } else {
    next()
  }
})

export default router
