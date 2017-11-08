<template>
  <loader v-if="me == null"/>
  <div v-else>
    <q-list no-border link inset-delimiter>
      <q-list-header>Select a Profile</q-list-header>
      <q-side-link v-if="me.isSingle" item :key="me.id" replace :to="`/user/${me.id}/swipe`">
        <q-item-side :avatar="`https://s3-ap-southeast-1.amazonaws.com/pear-server/album${me.photos[0]}`" />
        <q-item-main>
          {{ me.facebookName }} (You)
        </q-item-main>
      </q-side-link>
      <q-side-link item v-for="person in singles" :key="person.id" replace :to="`/user/${person.id}/swipe`">
        <q-item-side :avatar="`https://s3-ap-southeast-1.amazonaws.com/pear-server/album${person.photos[0]}`" />
        <q-item-main>
          {{ person.facebookName }}
        </q-item-main>
      </q-side-link>
      <q-side-link item v-for="person in invitations" :key="person.id" replace :to="`/user/${person.id}/profile`">
        <q-item-side avatar="https://static.xx.fbcdn.net/rsrc.php/v3/yA/r/gPCjrIGykBe.gif" />
        <q-item-main>
          {{ person.nickname }} ({{ person.status ==='P' ? 'Pending' : 'Declined' }})
        </q-item-main>
      </q-side-link>
      <q-side-link item key="addInvitation" replace :to="'/invite/1'">
        <q-item-side icon="add" />
        <q-item-main>
          Matchmake your friends
        </q-item-main>
      </q-side-link>
      <q-item-separator />
      <q-item item key="shareLink" @click="shareLink">
        <q-item-side icon="share" />
        <q-item-main>
          Invite friends to Pear!
        </q-item-main>
      </q-item>
      <q-side-link item key="settings" to="/settings">
        <q-item-side icon="settings" />
        <q-item-main>
          Settings
        </q-item-main>
      </q-side-link>
      <q-item key="logout" @click="$store.dispatch('logout')">
        <q-item-side icon="exit_to_app" />
        <q-item-main>
          Log out
        </q-item-main>
      </q-item>
    </q-list>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import {
  QList,
  QListHeader,
  QItem,
  QItemSide,
  QItemMain,
  QSideLink,
  Toast,
} from 'quasar'
import Loader from './Loader'

export default {
  name: 'sidebar',

  components: {
    QList,
    QListHeader,
    QItem,
    QItemSide,
    QItemMain,
    QSideLink,
    Loader,
  },

  computed: mapState({
    me: ({ users, me }) => users[me],
    singles: ({ users, singles }) => singles.map(_ => users[_]),
    friends: ({ users, friends }) => friends.map(_ => users[_]),
    invitations: ({ users, invitations }) => invitations.map(_ => users[_]),
  }),

  methods: {
    click(id) {
      $router.push(`/user/${id}`)
      this.$emit('close')
    },
    shareLink() {
      const url = 'https://pear.netlify.com/'
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
      this.$emit('close')
    },
  },
}
</script>

<style lang="stylus" scoped>
.media
  position relative
  width 100%
  height 200px
  background-position 50% 50%
  background-size cover

  &:before
    content: ''
  	position absolute
  	top 0
  	right 0
  	bottom 0
  	left 0
  	background-image linear-gradient(to bottom right,#002f4b,#dc4225)
  	opacity .6

  .name
    position absolute
    bottom 0
    padding 0.3em

.q-item-icon
  padding-top 7px
  padding-bottom 7px
  width 38px
</style>
