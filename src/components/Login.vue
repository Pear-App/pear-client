<template>
  <div class="layout-padding">
    <div class="row justify-center">
      <img class="block" src="~assets/logo.png" width="200" height="200">
    </div>
    <div class="row justify-center">
      <q-btn class="facebook-login" big color="blue" icon="fa-facebook" @click="login">
        Continue with Facebook
      </q-btn>
    </div>
  </div>
</template>

<script>
import { QBtn } from 'quasar'
import { promisify } from '../util'

export default {
  components: {
    QBtn
  },

  mounted () {
    if (this.$store.state.isLoggedIn === true) this.$router.replace('/')
  },

  methods: {
    async login () {
      /* global FB */
      this.$store.dispatch('facebookLogin', await promisify(FB.login))
    }
  }
}
</script>

<style lang="stylus" scoped>
.login
  padding-top 20vh

.facebook-login
  background-color #3B5998 !important
</style>
