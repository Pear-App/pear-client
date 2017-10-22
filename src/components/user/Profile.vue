<template>
  <loader v-if="user == null"/>
  <div v-else class="layout-padding">
    <img :src="`https://graph.facebook.com/${user.facebookId}/picture?type=large`" />
    {{ user.isInvitation ? user.nickname : user.facebookName }}, {{ user.age }}
    {{ user.desc }}
    <div v-if="user.isSingle">
      <router-link :to="`/user/${user.id}/swipe`">Swipe</router-link>
      <router-link :to="`/user/${user.id}/matches`">Matches</router-link>
    </div>
    <div v-if="user.isInvitation">
      <q-btn color="primary" @click="shareInvitationLink">Share</q-btn>
    </div>
  </div>
</template>

<script>
import Loader from '../Loader'
import { QBtn, Toast } from 'quasar'

export default {
  name: 'profile',

  components: { Loader, QBtn },

  props: ['id'],

  computed: {
    user() {
      return this.$store.state.users[this.id]
    },
  },

  methods: {
    shareInvitationLink() {
      const url = `${window.location.host}/#/join/${this.user.id}`
      if (navigator.share) {
        navigator
          .share({
            title: 'Find your perfect Pear!',
            text: '',
            url,
          })
          .then(() => console.log('Successful share'))
          .catch(error => console.log('Error sharing', error))
      } else {
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
      }
    },
  },
}
</script>

<style lang="stylus">
</style>
