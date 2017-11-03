<template>
  <!-- Configure "view" prop for QLayout -->
  <q-layout ref="layout" view="lHr LpR lFr" class="layout" :class="{ animating }">
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

    <transition name="slide-fade" mode="out-in">
      <keep-alive>
        <router-view v-if="doneInitialFetch" />
      </keep-alive>
    </transition>

    <q-toolbar v-if="id != null" slot="footer" class="text-tertiary bg-white">
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
      if (this.id !== params.id && params.id != null) {
        this.animating = true
        setTimeout(() => {
          this.animating = false
        }, 500)
      }
      this.id = params.id
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
    opacity 0
    transform perspective(600px) rotateY(90deg)

  50.01%
    opacity 0
    transform perspective(600px) rotateY(-90deg)

  100%
    transform perspective(600px) rotateY(0deg)

.slide-fade-enter-active 
  transition all .3s ease

.slide-fade-leave-active
  transition all .3s ease

.slide-fade-enter, .slide-fade-leave-to
  opacity 0
</style>
