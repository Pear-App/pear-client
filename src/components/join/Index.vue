<template>
  <div class="layout-padding">
    <q-modal v-if="inviter != null" v-model="open" 
      minimized no-backdrop-dismiss no-esc-dismiss
      content-classes="prompt text-tertiary text-center">
      <img class="pear" src="~assets/pear.png">
      <p>
        <big class="title">{{ inviter.facebookName }} has set up a profile for you!</big>
      </p>
      <p>
        <span>We need a few more details before {{ inviter.facebookName }} can begin matchmaking.</span>
      </p>
      <q-btn big v-model="isLoading" color="primary-light" class="text-black" @click="accept">Start</q-btn>
    </q-modal>
  </div>
</template>

<script>
export default {
  name: 'join',

  props: ['hash'],

  data() {
    return {
      open: true,
      isLoading: false,
    }
  },

  computed: {
    inviter() {
      if (this.$store.state.invitationHashes[this.hash] == null) return
      return this.$store.state.invitationHashes[this.hash].inviter
    },
  },

  mounted() {
    this.$store.dispatch('fetchInvitation', this.hash)
  },

  watch: {
    hash(hash) {
      this.$store.dispatch('fetchInvitation', hash)
    },
  },

  methods: {
    async accept() {
      this.isLoading = true
      await this.$store.dispatch('acceptInvitation', this.hash)
      this.isLoading = false
      this.$router.push('/settings?onboard')
    },
    async reject() {
      this.isLoading = true
      await this.$store.dispatch('rejectInvitation', this.hash)
      this.isLoading = false
      this.$router.push('/')
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

<style lang="stylus">
.prompt
  border-radius 20px
  padding 20px

  .pear
    margin-bottom 1em

  .title
    font-weight 500
</style>
