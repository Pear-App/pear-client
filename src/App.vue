<template>
  <!-- Don't drop "q-app" class -->
  <div id="q-app">
    <index v-if="isLoggedIn" />
    <login v-else />
  </div>
</template>

<script>
import Login from './components/Login'
import Index from './components/Index'

export default {
  name: 'app',

  components: { Login, Index },

  computed: {
    isLoggedIn () { return this.$store.state.isLoggedIn }
  }
}
</script>

<style lang="stylus">
</style>
