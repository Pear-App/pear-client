<template>
  <q-tabs v-if="user != null" align="justify" color="tertiary" inverted>
    <q-route-tab icon="person" :to="`/user/${id}/profile`" exact slot="title" />
    <q-route-tab v-if="user.isSingle || user.isMe" icon="people" :to="`/user/${id}/swipe`" exact slot="title" />
    <q-route-tab v-if="user.isSingle" icon="chat" :to="`/user/${id}/chat/${id}`" exact slot="title" />
    <q-route-tab v-else icon="chat" :to="`/user/${id}/chat`" exact slot="title" />
  </q-tabs>
</template>

<script>
export default {
  name: 'user-tabs',

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
