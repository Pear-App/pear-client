<template>
  <!-- if you want automatic padding use "layout-padding" class -->
  <div class="layout-padding">
    <p class="caption">Tell me more about your friend!</p>
    <q-field
      label="Name"
      :error="nameHasError"
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

  computed: {
    name: {
      get () { return this.$store.state.friend.name },
      set (name) { this.$store.dispatch('updateFriend', { name }) }
    },
    interests: {
      get () { return this.$store.state.friend.interests },
      set (interests) { this.$store.dispatch('updateFriend', { interests }) }
    },
    nameHasError () { return this.name.length === 0 }
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
