<template>
  <!-- if you want automatic padding use "layout-padding" class -->
  <div class="layout-padding">

    <q-field label="Your friend is a">
      <q-btn
        class="men full-width" big color="cyan" icon="fa-mars"
        :class="{ 'is-active': sex === 'M' }"
        :flat="sex !== 'M'"
        @click="sex = 'M'"
      >
        Male
      </q-btn>
      <q-btn class="women full-width" big color="pink" icon="fa-venus"
        :class="{ 'is-active': sex === 'F' }"
        :flat="sex !== 'F'"
        @click="sex = 'F'"
      >
        Female
      </q-btn>
      <q-btn
        class="both full-width" big color="yellow-8" icon="fa-genderless"
        :class="{ 'is-active': sex === 'B' }"
        :flat="sex !== 'B'"
        @click="sex = 'B'"
      >
        Others
      </q-btn>
    </q-field>

    <q-field label="Looking for">
      <q-btn class="women full-width" big color="pink" icon="fa-venus"
        :class="{ 'is-active': sexualOrientation === 'F' }"
        :flat="sexualOrientation !== 'F'"
        @click="sexualOrientation = 'F'"
      >
        Women
      </q-btn>
      <q-btn
        class="men full-width" big color="cyan" icon="fa-mars"
        :class="{ 'is-active': sexualOrientation === 'M' }"
        :flat="sexualOrientation !== 'M'"
        @click="sexualOrientation = 'M'"
      >
        Men
      </q-btn>
      <q-btn
        class="both full-width" big color="yellow-8" icon="fa-genderless"
        :class="{ 'is-active': sexualOrientation === 'B' }"
        :flat="sexualOrientation !== 'B'"
        @click="sexualOrientation = 'B'"
      >
        Either
      </q-btn>
    </q-field>

    <q-field label="Age Range" >
      <q-range v-model="ageRange" :min="18" :max="80" label-always />
    </q-field>

    <q-btn class="pull-left" color="primary" big @click="back">Back</q-btn>
    <q-btn class="pull-right" color="primary" big @click="submit">Next</q-btn>

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

  data () {
    return {
      sex: this.$store.state.friend.sex,
      sexualOrientation: this.$store.state.friend.sexualOrientation,
      ageRange: this.$store.state.friend.ageRange
    }
  },

  methods: {
    back () {
      const { sex, sexualOrientation, ageRange } = this
      this.$store.dispatch('setFriend', { sex, sexualOrientation, ageRange })
      this.$router.push('1')
    },
    submit () {
      const { sex, sexualOrientation, ageRange } = this
      this.$store.dispatch('setFriend', { sex, sexualOrientation, ageRange })
      this.$router.push('3')
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
