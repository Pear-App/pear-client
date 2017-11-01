<template>
  <!-- Configure "view" prop for QLayout -->
  <q-layout ref="layout" view="lHr LpR lfr" class="layout" :class="{ matchmaker: isMatchmakerMode, dater: !isMatchmakerMode }">
    <div slot="header">
      <q-toolbar slot="header" class="text-tertiary bg-secondary">
        <q-btn flat class="hide-on-drawer-visible" @click="$refs.layout.toggleLeft()">
          <img src="~assets/overflow.png" width="32" height="32">
        </q-btn>

        <q-toolbar-title>
          <img class="banner" src="~assets/banner.png" width="86" height="40">
          <img src="~assets/arrow-down.png" width="12" height="12" style="margin:12px 4px">

          <q-popover ref="popover" anchor="bottom middle" self="top middle">
            <q-list item-separator link>
              <q-item @click="$store.dispatch('setMatchmakerMode', { isMatchmakerMode: true }), $router.push('/'),  $refs.popover.close()">
                Matchmaker
              </q-item>
              <q-item @click="$store.dispatch('setMatchmakerMode', { isMatchmakerMode: false }), $router.push('/'),  $refs.popover.close()">
                Dater
              </q-item>
            </q-list>
          </q-popover>
        </q-toolbar-title>

        <div style="width:38px;margin-right:0.2rem"></div>
      </q-toolbar>

      <q-toolbar slot="header" class="text-tertiary bg-secondary">
        <q-toolbar-title v-if="isMatchmakerMode && user != null && user.facebookId != null" class="user">
          <img class="photo" :src="`https://graph.facebook.com/${user.facebookId}/picture?type=large`" width="32" height="32">
          <span class="name">{{ user.facebookName }}</span>
        </q-toolbar-title>
        <q-toolbar-title v-else-if="me != null && me.facebookId != null" class="user">
          <img class="photo" :src="`https://graph.facebook.com/${me.facebookId}/picture?type=large`" width="32" height="32">
          <span class="name">{{ me.facebookName }}</span>
        </q-toolbar-title>
      </q-toolbar>

    </div>

    <div slot="left">
      <sidebar @close="$refs.layout.hideLeft()" />
    </div>

    <router-view v-if="doneInitialFetch" />

    <q-toolbar slot="footer" class="text-tertiary bg-white">
      <q-toolbar-title>
        <keep-alive>
          <router-view name="footer" />
        </keep-alive>
      </q-toolbar-title>
    </q-toolbar>

  </q-layout>
</template>

<script>
import { mapState } from 'vuex'

import Sidebar from './Sidebar'

export default {
  name: 'index',

  components: { Sidebar },

  data() {
    return {
      doneInitialFetch: false,
      id: null,
    }
  },

  computed: mapState({
    me: ({ users, me }) => users[me],
    user({ users }) {
      return users[this.id]
    },
    isMatchmakerMode: ({ isMatchmakerMode }) => isMatchmakerMode,
  }),

  methods: {
    toggleMatchmakerMode() {
      this.$store.dispatch('setMatchmakerMode', {
        isMatchmakerMode: !this.isMatchmakerMode,
      })
    },
  },

  mounted() {
    this.$store.dispatch('fetchMe').then(() => (this.doneInitialFetch = true))
  },

  watch: {
    $route(route) {
      this.id = route.params.id
    },
  },
}
</script>

<style lang="stylus" scoped>
@import '../themes/app.variables'

.user
  font-weight 500

  .photo
    vertical-align middle
    margin-right 2px
    border-radius 100%

.q-toolbar
  transition-delay 0.25s

.layout
  perspective 800px

.dater
  animation dater 0.5s
.matchmaker
  animation matchmaker 0.5s

@keyframes dater
  50%
    transform perspective(600px) rotateY(90deg)
  50.01%
    transform perspective(600px) rotateY(-90deg)
  100%
    transform perspective(600px) rotateY(0deg)
@keyframes matchmaker
  50%
    transform perspective(600px) rotateY(90deg)
  50.01%
    transform perspective(600px) rotateY(-90deg)
  100%
    transform perspective(600px) rotateY(0deg)
</style>
