<template>
  <div class="layout-padding">
    <div v-if="inviter != null" class="row justify-center">
      {{ inviter.facebookName }} has set up a profile for you!
      <q-btn big color="primary" @click="accept">Accept</q-btn>
      <q-btn big flat color="primary" @click="reject">Reject</q-btn>
    </div>
  </div>
</template>

<script>
export default {
  props: ['hash'],

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
    accept() {
      this.$store.dispatch('acceptInvitation', this.hash)
    },
    reject() {
      this.$store.dispatch('rejectInvitation', this.hash)
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
