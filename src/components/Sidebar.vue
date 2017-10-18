<template>
  <q-list no-border link inset-delimiter>
    <q-list-header>Profile</q-list-header>
    <q-item :key="me.id" @click="$router.push(`/user/${me.id}`)">
      <q-item-side :avatar="`//graph.facebook.com/${me.facebookId}/picture?type=large`" />
      <q-item-main>
        {{ me.facebookName }}
      </q-item-main>
    </q-item>
    <q-list-header>Singles</q-list-header>
    <q-item v-for="single in singles" :key="single.id" @click="$router.push(`/user/${single.id}`)">
      <q-item-side :avatar="`//graph.facebook.com/${single.facebookId}/picture?type=large`" />
      <q-item-main>
        {{ single.facebookName }}
      </q-item-main>
    </q-item>
    <q-list-header>Friends</q-list-header>
    <q-item v-for="friend in friends" :key="friend.id" @click="$router.push(`/user/${friend.id}`)">
      <q-item-side :avatar="`//graph.facebook.com/${friend.facebookId}/picture?type=large`" />
      <q-item-main>
        {{ friend.facebookName }}
      </q-item-main>
    </q-item>
  </q-list>
</template>

<script>
import { mapState } from 'vuex'
import { QList, QListHeader, QItem, QItemSide, QItemMain } from 'quasar'

export default {
  name: 'sidebar',

  components: { QList, QListHeader, QItem, QItemSide, QItemMain },

  computed: mapState({
    me: ({ users, me }) => users[me],
    singles: ({ users, singles }) => singles.map(_ => users[_]),
    friends: ({ users, friends }) => friends.map(_ => users[_])
  })
}
</script>

<style>
</style>
