<template>
  <!-- if you want automatic padding use "layout-padding" class -->
  <div class="layout-padding">
    <q-btn class="facebook-login" color="blue" icon="fa-facebook" @click="login">
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
    return {} },

  methods: {
    login () {
      /* global FB */
      FB.login(res => this.$store.dispatch('facebookLogin', res))
    }
  }
}
</script>

<style lang="stylus" scoped>
.facebook-login
  background-color #3B5998 !important
  position absolute
  top 50%
  left 50%
  transform translateX(-50%) translateY(-50%)
</style>
