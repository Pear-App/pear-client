<script>
export default {
  mounted() {
    if (store.state.friends.length > 0) {
      this.$router.replace(`/user/${store.state.me}/swipe`)
    } else if (store.state.singles.length > 0) {
      this.$router.replace(`/user/${store.state.singles[0]}/swipe`)
    } else if (store.state.invitations.length > 0) {
      this.$router.replace(`/user/${store.state.invitations[0]}/profile`)
    } else {
      this.$router.replace('/invite/1')
    }
  },
}
</script>