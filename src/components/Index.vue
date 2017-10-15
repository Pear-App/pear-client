<template>
  <!-- if you want automatic padding use "layout-padding" class -->
  <div class="layout-padding">
    <div class="row justify-center">
      A tutorial should be here
      <q-btn color="primary" @click="next">
        Let's go!
      </q-btn>
    </div>
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
    next () {
      this.$router.push('/onboard/1')
    }
  }
}
</script>

<style lang="stylus" scoped>
</style>
