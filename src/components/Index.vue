<template>
  <!-- Configure "view" prop for QLayout -->
  <q-layout ref="layout" view="lHr LpR lFr" class="layout" :class="{ animating }">
    <q-toolbar slot="header" class="text-tertiary bg-secondary">
      <q-btn flat class="hide-on-drawer-visible" @click="$refs.layout.toggleLeft()" style="padding:8px;margin-left:-6px">
        <svg class="toolbar-button" width="32px" height="32px" viewBox="0 0 300 300">
          <path d="M149.996,0C67.157,0,0.001,67.158,0.001,149.997c0,82.837,67.156,150,149.995,150s150-67.163,150-150
          C299.996,67.156,232.835,0,149.996,0z M150.453,220.763v-0.002h-0.916H85.465c0-46.856,41.152-46.845,50.284-59.097l1.045-5.587
          c-12.83-6.502-21.887-22.178-21.887-40.512c0-24.154,15.712-43.738,35.089-43.738c19.377,0,35.089,19.584,35.089,43.738
          c0,18.178-8.896,33.756-21.555,40.361l1.19,6.349c10.019,11.658,49.802,12.418,49.802,58.488H150.453z"/>
        </svg>
      </q-btn>

      <q-toolbar-title>
        <img class="banner" src="~assets/banner.png" width="86" height="40">
      </q-toolbar-title>

      <div style="width:26px;margin-right:0.2rem"></div>
    </q-toolbar>

    <div slot="left">
      <sidebar slot="left" @close="$refs.layout.hideLeft()" />
    </div>

    <transition name="fade" mode="out-in">
      <keep-alive>
        <router-view />
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
    }
  },

  computed: mapState({
    me: ({ users, me }) => users[me],
  }),

  mounted() {
    this.$store.dispatch('fetchMe')
    if (this.$route.path === '/' && this.$route.name != null) {
      if (this.$store.state.friends.length > 0) {
        this.$router.replace(`/user/${this.$store.state.me}/swipe`)
      } else if (this.$store.state.singles.length > 0) {
        this.$router.replace(`/user/${this.$store.state.singles[0]}/swipe`)
      } else {
        this.$router.replace(`/invite/1`)
      }
    }
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

<style lang="stylus">
@keyframes flip
  50%
    opacity 0
    transform perspective(600px) rotateY(90deg)

  50.01%
    opacity 0
    transform perspective(600px) rotateY(-90deg)

  100%
    transform perspective(600px) rotateY(0deg)

.fade-enter-active 
  transition all .3s ease

.fade-leave-active
  transition all .3s ease

.fade-enter, .fade-leave-to
  opacity 0
</style>

<style lang="stylus" scoped>
@import '../themes/app.variables'

.q-toolbar
  text-align center

.toolbar-button
  margin-left -2px
  fill $tertiary

.layout
  perspective 800px

.animating
  animation flip 0.5s 

</style>
