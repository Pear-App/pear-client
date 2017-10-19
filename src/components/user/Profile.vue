<template>
  <loader v-if="user == null"/>
  <div v-else class="layout-padding">
    <img :src="`//graph.facebook.com/${user.facebookId}/picture?type=large`" />
    {{ user.facebookName }}, {{ user.age }}
    {{ user.desc }}
    <router-link :to="`/user/${user.id}/swipe`">Swipe</router-link>
    <router-link :to="`/user/${user.id}/matches`">Matches</router-link>
  </div>
</template>

<script>
import Loader from '../Loader'

export default {
  name: 'profile',

  components: { Loader },

  props: ['id'],

  computed: {
    user() {
      return this.$store.state.users[this.id]
    },
  },

  watch: {
    id(id) {
      this.$store.dispatch('fetchMatches', id)
    },
  },
}
</script>

<style lang="stylus">
</style>
