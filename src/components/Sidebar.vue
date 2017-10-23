<template>
  <loader v-if="me == null || singles == null || friends == null"/>
  <q-list v-else no-border link inset-delimiter>
    <q-list-header>Profile</q-list-header>
    <q-side-link item :key="me.id" :to="`/user/${me.id}/profile`">
      <q-item-side :avatar="`https://graph.facebook.com/${me.facebookId}/picture?type=large`" />
      <q-item-main>
        {{ me.facebookName }}
      </q-item-main>
    </q-side-link>
    <q-list-header>Singles</q-list-header>
    <q-side-link item v-for="person in singles" :key="person.id" :to="`/user/${person.id}/profile`">
      <q-item-side :avatar="`https://graph.facebook.com/${person.facebookId}/picture?type=large`" />
      <q-item-main>
        {{ person.facebookName }}
      </q-item-main>
    </q-side-link>
    <q-side-link item key="addInvitation" :to="'/invite/1'">
      <q-item-side icon="add" />
      <q-item-main>
        Recommend for a friend!
      </q-item-main>
    </q-side-link>
    <q-list-header>Friends</q-list-header>
    <q-side-link item v-for="person in friends" :key="person.id" :to="`/user/${person.id}/profile`">
      <q-item-side :avatar="`https://graph.facebook.com/${person.facebookId}/picture?type=large`" />
      <q-item-main>
        {{ person.facebookName }}
      </q-item-main>
    </q-side-link>
    <q-list-header>Invitations</q-list-header>
    <q-side-link item v-for="person in invitations" :key="person.id" :to="`/user/${person.id}/profile`">
      <q-item-side :avatar="`https://graph.facebook.com/${person.facebookId}/picture?type=large`" />
      <q-item-main>
        {{ person.nickname }} ({{ person.status }})
      </q-item-main>
    </q-side-link>
    <q-item key="logout" @click="$store.dispatch('logout')">
      <q-item-main>
        Log out
      </q-item-main>
    </q-item>
  </q-list>
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
  },
}
</script>

<style lang="stylus">
</style>
