<template>
  <div class="layout-padding">
    <div class="profile">
      <span class="name">{{ user.nickname }}, {{ user.age }}</span>
      <span class="school">{{ user.school }}</span>
      <span class="major">{{ user.major }}</span>
    </div>
    <div>
      <q-btn color="primary" @click="shareInvitationLink">Share</q-btn>
    </div>
  </div>
</template>

<script>
import { Toast } from 'quasar'

export default {
  name: 'invitation',

  props: ['id'],

  computed: {
    user() {
      return this.$store.state.users[this.id]
    },
  },

  methods: {
    async shareInvitationLink() {
      const url =
        window.cordova == null
          ? `${window.location.host}/#/join/${this.user.id}`
          : `https://pear.netlify.com/invite/${this.user.id}`
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
@import '../../themes/app.variables'
</style>
