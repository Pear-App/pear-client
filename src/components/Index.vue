<template>
  <!-- Configure "view" prop for QLayout -->
  <q-layout ref="layout" view="lHr LpR lfr">

    <q-toolbar slot="header" class="text-tertiary bg-white">
      <q-btn flat class="hide-on-drawer-visible" @click="$refs.layout.toggleLeft()">
        <img v-if="me != null" class="user-photo" :src="`https://graph.facebook.com/${me.facebookId}/picture?type=large`" width="32" height="32">
      </q-btn>

      <q-toolbar-title>
        <img class="banner" src="~assets/banner.png" width="86" height="40">
      </q-toolbar-title>

      <q-btn flat @click="$refs.layout.toggleRight()">
        <img src="~assets/overflow.png" width="24" height="24">
      </q-btn>
    </q-toolbar>

    <div slot="left">
      <sidebar slot="left" @close="$refs.layout.hideLeft()" />
    </div>

    <div slot="right">
    </div>

    <router-view />

    <q-toolbar slot="footer" class="text-tertiary bg-white">
      <q-toolbar-title>
        <router-view name="footer" />
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
.user-photo
  border-radius 100%
</style>
