<template>
  <!-- Don't drop "q-app" class -->
  <div id="q-app">
    <login v-if="!isLoggedIn" />
    <tutorial v-else-if="!hasSeenTutorial" />
    <index v-else />
  </div>
</template>

<script>
import { mapState } from 'vuex'
import Login from './components/Login'
import Tutorial from './components/Tutorial'
import Index from './components/Index'

export default {
  name: 'app',

  components: { Login, Tutorial, Index },

  computed: mapState(['isLoggedIn', 'hasSeenTutorial']),
}
</script>

<style lang="css">
@font-face {
  font-family: Montserrat;
  src: url(~assets/font/Montserrat-Regular.ttf);
}

@font-face {
  font-family: Montserrat;
  font-weight: 500;
  src: url(~assets/font/Montserrat-Medium.ttf);
}

@font-face {
  font-family: Montserrat;
  font-weight: 700;
  src: url(~assets/font/Montserrat-Bold.ttf);
}
</style>

<style lang="stylus">
@import 'themes/app.variables'

body
  font-family Montserrat, sans-serif

.layout-header
.layout-footer
  border none
  box-shadow none

.q-item-avatar
  box-shadow 0 2px 5px rgba(0, 0, 0, 0.1)

.text-medium
  font-weight 500 !important

.q-toast
  border-radius 10px

.q-toast a
  padding: 10px 0 10px 30px

.q-toast-container
  top -100px
  bottom unset

.q-toast-container.active
  transform translateY(100px)
  -webkit-transform translateY(100px)

.text-primary-light
  color $primary-light

.bg-primary-light
  background-color $primary-light

big
  font-size 130%
</style>
