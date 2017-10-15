<template>
  <!-- if you want automatic padding use "layout-padding" class -->
  <div class="layout-padding">
    <p class="caption">Tell me more about your friend!</p>
    <q-field
      label="Name"
      :error="nameHasError"
      error-label="We need a name!"
      :count="100"
    >
      <q-input v-model="name" />
    </q-field>
    <q-field
      label="Interests"
    >
      <q-btn
        v-for="interest in interests"
        key="interest.name"
        big
        color='primary'
        :flat="!interest.active"
        @click="interest.active = !interest.active"
      >
        {{ interest.name }}
      </q-btn>
    </q-field>
    <q-btn class="pull-left" color="primary" big @click="back">
      Back
    </q-btn>
    <q-btn class="pull-right" color="primary" big @click="submit">
      Next
    </q-btn>
  </div>
</template>

<script>
import { shuffle } from 'lodash'
import {
  QBtn,
  QField,
  QInput,
  QLayout,
  QRange
} from 'quasar'

export default {
  components: {
    QBtn,
    QField,
    QInput,
    QLayout,
    QRange
  },

  data () {
    return {
      name: '',
      interests: shuffle([
        { name: 'Art', active: false },
        { name: 'Books', active: false },
        { name: 'Dance', active: false },
        { name: 'Movies', active: false },
        { name: 'Music', active: false },
        { name: 'Sports', active: false },
        { name: 'TV Shows', active: false },
        { name: 'Video Games', active: false }
      ])
    }
  },

  computed: {
    nameHasError () { return false }
  },

  methods: {
    back () {
      this.$router.push('2')
    },
    submit () {
      this.$router.push('/swipe')
    }
  }
}
</script>

<style lang="stylus" scoped>
@import '~variables'

.q-btn
  margin 5px
  border-radius 4px
</style>
