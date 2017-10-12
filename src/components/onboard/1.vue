<template>
  <!-- if you want automatic padding use "layout-padding" class -->
  <div class="layout-padding justify-center">
    <p>Find a Pear for</p>
    <q-btn class="full-width" big color="blue" @click="friend">A Friend</q-btn>
    <q-btn class="full-width" big color="blue" @click="me">Me</q-btn>
  </div>
</template>

<script>
import {
  QBtn
} from 'quasar'

export default {
  components: {
    QBtn
  },

  data () {
    return {}
  },

  methods: {
    friend () {
      this.$router.push('2')
    },

    me () {
      this.$router.push('2')
    }
  }
}
</script>

<style lang="stylus" scoped>
.q-btn
  margin 5px
  border-radius 4px
</style>
