<template>
  <div class="layout-padding login">
    <div v-if="isInvited && inviter != null">
      <img class="intro" src="~assets/intro.png" width="347" height="237">
      <p class="tagline">
        <strong>{{ inviter.facebookName }}</strong><br>
        set you up!
      </p>
      <q-btn class="facebook-login" big color="blue" icon="fa-facebook-official" @click="login">
        Login with Facebook
      </q-btn>
    </div>

    <div v-else class="centered">
      <img class="intro" src="~assets/intro.png" width="347" height="237">
      <p class="tagline">
        Let us help you find<br>
        your perfect <strong class="text-bold">Pear</strong>!
      </p>
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
      return this.$route.path.slice(0, 5) === '/join'
    },
    hash() {
      return this.$route.path.slice(6)
    },
    inviter() {
      if (this.$store.state.invitationHashes[this.hash] == null) return null
      return this.$store.state.invitationHashes[this.hash].inviter
    },
  },

  watch: {
    isInvited(isInvited) {
      if (this.isInvited) {
        this.$store.dispatch('fetchInvitation', this.hash)
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
  background-color $secondary
  padding-top 20vh
  height 100vh
  text-align center

.intro
  display block
  padding-right 20px
  margin 0 auto
  max-width calc(90vw - 60px)
  height auto

.tagline
  font-size 1.4em
  margin 2em

.facebook-login
  background-color #3B5998 !important
  padding 10px 12px 10px 12px
</style>
