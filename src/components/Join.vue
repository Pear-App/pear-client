<template>
  <div class="layout-padding">
    <div class="row justify-center">
      You're invited
    </div>
  </div>
</template>

<script>
import { QBtn } from 'quasar'
import { promisify } from '../util'

export default {
  components: {
    QBtn,
  },

  props: ['id'],

  mounted() {
    this.$store.dispatch('fetchInvitation', this.id)
  },

  watch: {
    id(id) {
      this.$store.dispatch('fetchInvitation', id)
    },
  },
}
</script>

<style lang="stylus" scoped>
.login
  padding-top 20vh

.facebook-login
  background-color #3B5998 !important
</style>
