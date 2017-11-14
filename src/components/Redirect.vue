<template>
  <div></div>
</template>

<script>
import Vue from 'vue'

export default {
  mounted() {
    if (this.$store.state.friends.length > 0) {
      this.$router.replace(`/user/${this.$store.state.me}/swipe`)
    } else if (this.$store.state.singles.length > 0) {
      this.$router.replace(`/user/${this.$store.state.singles[0]}/profile`)
    } else if (this.$store.state.invitations.length > 0) {
      this.$router.replace(`/user/${this.$store.state.invitations[0]}/profile`)
    } else {
      this.$router.replace('/invite/1')
    }
  },
}
</script>