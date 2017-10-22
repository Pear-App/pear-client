<template>
  <div class="layout-padding login">
    <div v-if="isInvited" class="row justify-center">
      {{ inviter.facebookName }} set you up!
      <img class="intro" src="~assets/intro.png" width="347" height="237">
    </div>
    <div v-else class="row justify-center">
      <img class="intro" src="~assets/intro.png" width="347" height="237">
    </div>
    <div class="row justify-center text-center">
      <p class="tagline">
        Let us help you find<br>
        your perfect <strong class="text-bold">Pear</strong>!
      </p>
    </div>
    <div class="row justify-center">
      <q-btn class="facebook-login" big color="blue" icon="fa-facebook-official" @click="login">
        Login with Facebook
      </q-btn>
    </div>
  </div>
</template>

<script>
import { QBtn } from 'quasar'
import { promisify } from '../util'

export default {
  components: {
    QBtn,
  },

  computed: {
    isInvited() {
      console.log(this.$route.path)
      return this.$route.path.slice(0, 5) === '/join'
    },
    me() {
      return this.$store.state.users[this.$store.state.me]
    },
    inviter() {
      return this.$store.state.users[this.me.inviter.id]
    },
  },

  watch: {
    isInvited(isInvited) {
      if (this.isInvited) {
        this.$store.dispatch('fetchMyInvitation', this.$route.params.id)
      }
    },
  },

  methods: {
    async login() {
      /* global FB */
      this.$store.dispatch('facebookLogin', {
        ...(await promisify(FB.login)),
      })
    },
  },
}
</script>

<style lang="stylus" scoped>
@import '../themes/app.variables'

.login
  background-color $primary
  padding-top 20vh
  height 100vh

.intro
  display block
  margin-left 10px
  margin-right 50px
  max-width calc(90vw - 60px)
  height auto

.tagline
  font-size 1.4em
  margin 2em

.facebook-login
  background-color #3B5998 !important
  padding 10px 12px 10px 12px
</style>
