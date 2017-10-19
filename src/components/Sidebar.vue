<template>
  <loader v-if="me == null || singles == null || friends == null"/>
  <q-list v-else no-border link inset-delimiter>
    <q-list-header>Profile</q-list-header>
    <q-item :key="me.id" @click="$router.push(`/user/${me.id}`)">
      <q-item-side :avatar="`//graph.facebook.com/${me.facebookId}/picture?type=large`" />
      <q-item-main>
        {{ me.facebookName }}
      </q-item-main>
    </q-item>
    <q-list-header>Singles</q-list-header>
    <q-item v-for="person in singles" :key="person.id" @click="$router.push(`/user/${person.id}`)">
      <q-item-side :avatar="`//graph.facebook.com/${person.facebookId}/picture?type=large`" />
      <q-item-main>
        {{ person.facebookName }}
      </q-item-main>
    </q-item>
    <q-item key="addInvitation" @click="$router.push('/invite/1')">
      <q-item-side icon="add" />
      <q-item-main>
        Recommend for a friend!
      </q-item-main>
    </q-item>
    <q-list-header>Friends</q-list-header>
    <q-item v-for="person in friends" :key="person.id" @click="$router.push(`/user/${person.id}`)">
      <q-item-side :avatar="`//graph.facebook.com/${person.facebookId}/picture?type=large`" />
      <q-item-main>
        {{ person.facebookName }}
      </q-item-main>
    </q-item>
    <q-list-header>Invitations</q-list-header>
    <q-item v-for="person in invitations" :key="person.id" @click="$router.push(`/user/${person.id}`)">
      <q-item-side :avatar="`//graph.facebook.com/${person.facebookId}/picture?type=large`" />
      <q-item-main>
        {{ person.nickname }}
      </q-item-main>
    </q-item>
    <q-item key="logout" @click="$store.dispatch('logout')">
      <q-item-main>
        Log out
      </q-item-main>
    </q-item>
  </q-list>
</template>

<script>
import { mapState } from 'vuex'
import { QList, QListHeader, QItem, QItemSide, QItemMain } from 'quasar'
import Loader from './Loader'

export default {
  name: 'sidebar',

  components: { QList, QListHeader, QItem, QItemSide, QItemMain, Loader },

  computed: mapState({
    me: ({ users, me }) => users[me],
    singles: ({ users, singles }) => singles.map(_ => users[_]),
    friends: ({ users, friends }) => friends.map(_ => users[_]),
    invitations: ({ users, invitations }) => invitations.map(_ => users[_]),
  }),
}
</script>

<style>
</style>
