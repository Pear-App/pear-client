<template>
  <!-- Configure "view" prop for QLayout -->
  <q-layout ref="layout" view="lHr LpR lfr">
    <div class="header-bg"></div>

    <q-toolbar slot="header" class="text-tertiary bg-secondary">
      <q-btn flat class="hide-on-drawer-visible" @click="$refs.layout.toggleLeft()">
        <img v-if="me != null" class="user-photo" :src="`https://graph.facebook.com/${me.facebookId}/picture?type=large`" width="32" height="32">
      </q-btn>

      <q-toolbar-title>
        <img class="banner" src="~assets/banner.png" width="86" height="40">
      </q-toolbar-title>

      <div style="width:38px;margin-right:0.2rem"></div>
    </q-toolbar>

    <div slot="left">
      <sidebar slot="left" @close="$refs.layout.hideLeft()" />
    </div>

    <router-view />

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
    return {}
  },

  computed: mapState({
    me: ({ users, me }) => users[me],
  }),

  mounted() {
    this.$store.dispatch('fetchMe')
  },
}
</script>

<style lang="stylus" scoped>
@import '../themes/app.variables'

.user-photo
  margin-left -2px
  border-radius 100%

.header-bg
  position fixed
  z-index -100
  top 0
  left -2%
  width 104%
  height 159px
  border-radius 53px
  background-color $secondary
</style>
