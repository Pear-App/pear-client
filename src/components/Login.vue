<template>
  <!-- if you want automatic padding use "layout-padding" class -->
  <div class="layout-padding">
    <q-btn class="facebook-login is-centered" loader color="blue" icon="fa-facebook" @click="login">
      Sign in with Facebook
    </q-btn>
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
.facebook-login
  background-color #3B5998 !important
</style>
