<template>
  <div class="layout-padding">
    <div v-if="isInvited" class="row justify-center">
      {{ inviter.facebookName }} set you up!
      <img class="block" src="~assets/logo.png" width="200" height="200">
    </div>
    <div v-else class="row justify-center">
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
.login
  padding-top 20vh

.facebook-login
  background-color #3B5998 !important
</style>
