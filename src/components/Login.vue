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
      <q-btn class="facebook-login" big color="blue" icon="fa-facebook-official" @click="isOpen = true">
        Login with Facebook
      </q-btn>
    </div>

    <q-modal minimized v-model="isOpen" minimized content-classes="policy">
      <p>
        <big>Important!</big>
      </p>
      <p>
        While Pear is free, we want to keep the experience fun and positive for everyone.
        We do not tolerate objectionable content or abusive users.
      </p>
      <p>
        By continuing, you agree to our <router-link to="/terms" @click="isOpen = false">Terms of Service</router-link> and <router-link to="/privacy" @click="isOpen = false">Privacy Policy</router-link>
      </p>
      <q-btn class="finish-tutorial pull-right text-black" big color="secondary" @click="login">Ok, I understand</q-btn>
    </q-modal>
  </div>
</template>

<script>
import { promisify } from '../util'

export default {
  name: 'login',

  data() {
    return {
      isOpen: false,
    }
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
      this.isOpen = false
      /* global FB */
      this.$store.dispatch('facebookLogin', {
        ...(await promisify(FB.login, {
          scope: ['public_profile', 'user_photos'],
        })),
      })
    },
  },
}
</script>

<style lang="stylus" scoped>
@import '../themes/app.variables'

.login
  background-color #fed960
  padding-top 20vh
  height 100vh
  text-align center

.intro
  display block
  padding 0 20px
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

<style lang="stylus">
.policy
  padding 20px
</style>