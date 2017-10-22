<template>
  <!-- Configure "view" prop for QLayout -->
  <q-layout ref="layout" view="lHr LpR lfr">

    <q-toolbar slot="header" class="text-black bg-white">
      <q-btn flat class="hide-on-drawer-visible" @click="$refs.layout.toggleLeft()">
        <img class="user-photo" :src="`https://graph.facebook.com/${me.facebookId}/picture?type=large`" width="32" height="32">
      </q-btn>

      <q-toolbar-title>
        <img class="banner" src="~assets/banner.png" width="86" height="40">
      </q-toolbar-title>

      <q-btn flat class="hide-on-drawer-visible" @click="$refs.layout.toggleLeft()">
        <img src="~assets/overflow.png" width="24" height="24">
      </q-btn>
    </q-toolbar>

    <div slot="left">
      <sidebar slot="left" @close="$refs.layout.hideLeft()" />
    </div>

    <!-- Right Side Panel
    <div slot="right">
      ...
    </div>
    -->

    <router-view />

    <!-- Footer
    <q-toolbar slot="footer">
      ...
    </q-toolbar>
    -->

  </q-layout>
</template>

<script>
import { mapState } from 'vuex'
import { QBtn, QIcon, QLayout, QToolbar, QToolbarTitle } from 'quasar'
import Sidebar from './Sidebar'

export default {
  name: 'index',

  components: { QBtn, QIcon, QLayout, QToolbar, QToolbarTitle, Sidebar },

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
.user-photo
  border-radius 100%
</style>
