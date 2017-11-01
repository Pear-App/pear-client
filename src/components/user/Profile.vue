<template>
  <loader v-if="user == null" />
  <invitation :id="id" v-else-if="user.isInvitation" />
  <q-card v-else class="person no-margin">
    <q-card-media>
      <img :src="`https://graph.facebook.com/${user.facebookId}/picture?type=large`">
    </q-card-media>
    <q-card-title>{{ user.facebookName }}, {{ user.age }}</q-card-title>
    <q-card-main>
      <span class="school">{{ user.school }}</span>
      <span class="major">{{ user.major }}</span>

      <p>
        <small class="caption text-primary">About</small><br>
        <span class="major">{{ user.desc }}</span>
      </p>

      <p>
        <small class="caption text-primary">What my friends say about me</small><br>
        <q-list no-border sparse>
          <q-item v-for="friend in user.friend" class="no-padding">
            <q-item-side :avatar="`https://graph.facebook.com/${friend.facebookId}/picture?type=large`" />
            <q-item-main>{{ friend.Friendships.review }}</q-item-main>
          </q-item>
        </q-list>
      </p>
    </q-card-main>
  </q-card>
</template>

<script>
import Loader from '../Loader'
import Invitation from './Invitation'
import { Toast } from 'quasar'

export default {
  name: 'profile',

  components: { Invitation },

  props: ['id'],

  computed: {
    user() {
      return this.$store.state.users[this.id]
    },
  },
}
</script>

<style lang="stylus" scoped>
@import '../../themes/app.variables'

</style>
