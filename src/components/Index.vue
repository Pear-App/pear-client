<template>
  <!-- Configure "view" prop for QLayout -->
  <q-layout ref="layout" view="lHr LpR lfr">
    <q-toolbar slot="header">
      <q-btn flat class="hide-on-drawer-visible" @click="$refs.layout.toggleLeft()">
        <q-icon name="menu" />
      </q-btn>
      <q-toolbar-title>
        Title
      </q-toolbar-title>
    </q-toolbar>

    <div slot="left">
      <sidebar slot="left" />
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
import { QBtn, QIcon, QLayout, QToolbar, QToolbarTitle } from 'quasar'
import Sidebar from './Sidebar'

export default {
  name: 'index',

  components: { QBtn, QIcon, QLayout, QToolbar, QToolbarTitle, Sidebar },

  data() {
    return {}
  },

  mounted() {
    this.$store.dispatch('fetchMe')
  },
}
</script>

<style lang="stylus">
</style>
