<template>
  <!-- Configure "view" prop for QLayout -->
  <q-layout ref="layout" view="lHr LpR lfr" class="layout" :class="{ animating }">
    <q-toolbar slot="header" class="text-tertiary bg-secondary">
      <q-btn flat class="hide-on-drawer-visible" @click="$refs.layout.toggleLeft()" style="padding:8px;margin-left:-6px">
        <img src="~assets/overflow.png" width="24" height="24">
      </q-btn>

      <q-toolbar-title>
        <img class="banner" src="~assets/banner.png" width="86" height="40">
      </q-toolbar-title>

      <div style="width:26px;margin-right:0.2rem"></div>
    </q-toolbar>

    <div slot="left">
      <sidebar slot="left" @close="$refs.layout.hideLeft()" />
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
      id: null,
      animating: false,
      doneInitialFetch: false,
    }
  },

  computed: mapState({
    me: ({ users, me }) => users[me],
  }),

  mounted() {
    this.$store.dispatch('fetchMe').then(() => (this.doneInitialFetch = true))
  },

  watch: {
    $route({ params }) {
      if (this.id !== params.id) {
        this.animating = true
        this.id = params.id
        setTimeout(() => {
          this.animating = false
        }, 500)
      }
    },
  },
}
</script>

<style lang="stylus" scoped>
@import '../themes/app.variables'

.user-photo
  margin-left -2px
  border-radius 100%

  transition-delay 0.25s

.layout
  perspective 800px

.animating
  animation flip 0.5s

@keyframes flip
  50%
    transform perspective(600px) rotateY(90deg)
  50.01%
    transform perspective(600px) rotateY(-90deg)
  100%
    transform perspective(600px) rotateY(0deg)
</style>
