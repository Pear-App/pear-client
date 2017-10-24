<template>
  <loader v-if="user == null"/>
  <div v-else class="layout-padding">
    <div v-if="user.isInvitation" class="person">
      <div class="picture" :style="{ 'background-image': `url(https://graph.facebook.com/${user.facebookId}/picture?type=large)` }"></div>
      <div class="profile">
        <span class="title">{{ user.facebookName }}, {{ user.age }}</span>
        <span class="subtitle">blahblah {{ user.desc }}</span>
      </div>
    </div>
    <div v-else class="person">
      <div class="picture" :style="{ 'background-image': `url(https://graph.facebook.com/${user.facebookId}/picture?type=large)` }"></div>
      <div class="profile">
        <span class="title">{{ user.nickname }}, {{ user.age }}</span>
        <span class="subtitle">blahblah {{ user.desc }}</span>
      </div>
    </div>
    <div v-if="user.isSingle || user.isMe">
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
    async shareInvitationLink() {
      const url = `${window.location.host}/#/join/${this.user.id}`
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

.person
  padding 10px
  width 100%
  position absolute
  top 10px
  left 10px
  background white
  width calc(100% - 20px)
  height calc(100% - 20px)
  border-radius 10px
  box-shadow 0 5px 8px rgba(0, 0, 0, 0.1)
  overflow hidden

  .picture
    position absolute
    top 0
    left 0
    bottom 0
    right 0
    background-size cover
    background-position 50% 50%

  .profile
    background-color white
    border-radius 10px
    bottom 10px
    box-shadow 0 2px 5px rgba(0, 0, 0, 0.1)
    color $tertiary
    padding 10px
    position absolute
    width calc(100% - 20px)

    .title
      display block
      font-weight 500
      font-size 1.3em
      margin-bottom 0.1em

    .subtitle
      display block
      font-size 1em
</style>
