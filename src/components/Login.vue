<template>
  <!-- if you want automatic padding use "layout-padding" class -->
  <div class="layout-padding login">
    <div class="row justify-center">
      <img src="~assets/logo.png">
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
