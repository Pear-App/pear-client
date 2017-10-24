<template>
  <q-tabs align="justify" color="tertiary" inverted>
    <q-route-tab icon="person" :to="`/user/${id}/profile`" exact slot="title" />
    <q-route-tab v-if="user.isSingle || user.isMe" icon="people" :to="`/user/${id}/swipe`" exact slot="title" />
    <q-route-tab v-if="user.isSingle || user.isMe" icon="chat" :to="`/user/${id}/matches`" exact slot="title" />
  </q-tabs>
</template>

<script>
import { QTabs, QRouteTab } from 'quasar'

export default {
  name: 'user-tabs',

  components: { QTabs, QRouteTab },

  props: ['id'],

  computed: {
    user() {
      return this.$store.state.users[this.id]
    },
  },
}
</script>

<style lang="stylus">
</style>
