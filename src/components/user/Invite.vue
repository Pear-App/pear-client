<template>
  <!-- if you want automatic padding use "layout-padding" class -->
  <div class="layout-padding">
    <a :href="url">{{ url }}</a>
    <q-btn color="primary" big @click="share">Share</q-btn>
  </div>
</template>

<script>
import { QBtn, QField, QInput, QLayout, QRange } from 'quasar'

export default {
  name: 'user-invite',

  components: { QBtn },

  computed: {
    url() {
      return `${window.location.origin}/#/${this.$store.state.lastInvited}`
    },
  },

  methods: {
    share() {},
  },
}
</script>

<style lang="stylus" scoped>
.q-btn
  margin 5px
  border-radius 4px
</style>
