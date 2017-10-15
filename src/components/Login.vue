<template>
  <div class="layout-padding">
    <div class="row justify-center">
      <img class="block" src="~assets/logo.png" width="200" height="200">
    </div>
    <div class="row justify-center">
      <q-btn class="facebook-login" big loader color="blue" icon="fa-facebook" @click="login">
        Continue with Facebook
      </q-btn>
    </div>
  </div>
</template>

<script>
import {
  QBtn
} from 'quasar'

export default {
  components: {
    QBtn
  },

  data () {
    return {}
  },

  methods: {
    login () {
      /* global FB */
      FB.login(res => this.$store.dispatch('facebookLogin', {
        ...res,
        redirect: this.$route.query.redirect
      }))
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
