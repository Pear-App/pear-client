<template>
  <div class="layout-padding">
    <img :src="`//graph.facebook.com/${user.facebookId}/picture?type=large`" />
    {{ user.facebookName }}, {{ user.age }}
    {{ user.desc }}
    <router-link :to="`/user/${user.id}/swipe`">Swipe</router-link>
    <router-link :to="`/user/${user.id}/matches`">Matches</router-link>
  </div>
</template>

<script>
export default {
  name: 'profile',

  props: ['id'],

  computed: {
    user () { return this.$store.state.users[this.id] }
  }
}
</script>

<style lang="stylus">
</style>
