<template>
  <div class="layout-padding invitaiton text-tertiary text-center">
    <div>
      <img class="pear" src="~assets/pear.png">
      <p>
        <big class="title">Invite {{ user.nickname }} to join Pear!</big>
      </p>
      <p>
        <span>For {{ whom }} to indicate {{ whose }} dating prefernces before your curation begins.</span>
      </p>
      <q-btn big color="primary" @click="shareInvitationLink">Invite</q-btn>
    </div>
  </div>
</template>

<script>
import { Toast } from 'quasar'

export default {
  name: 'invitation',

  props: ['id'],

  data() {
    return {
      open: true,
    }
  },

  computed: {
    user() {
      return this.$store.state.users[this.id]
    },
    whom() {
      return this.user.sex == 'M' ? 'him' : 'her'
    },
    whose() {
      return this.user.sex == 'M' ? 'his' : 'her'
    },
  },

  methods: {
    async shareInvitationLink() {
      const url = `https://pear.netlify.com/#/join/${this.user.id}`
      if (navigator.share) {
        try {
          navigator.share({
            title: 'Find your perfect Pear!',
            text: '',
            url,
          })
          return
        } catch (e) {}
      }
      const dummy = document.createElement('input')
      document.body.appendChild(dummy)
      dummy.setAttribute('value', url)
      dummy.select()
      document.execCommand('copy')
      document.body.removeChild(dummy)
      Toast.create.positive({
        html: 'Copied link!',
        icon: 'clipboard',
      })
    },
  },
}
</script>

<style lang="stylus" scoped>
.invitation
  padding 15%
  display flex
  justify-content center
  align-items center
  height calc(100vh - 106px)

  .pear
    margin-bottom 1em

  .title
    font-weight 500
</style>
