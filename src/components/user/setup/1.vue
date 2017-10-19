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

    <q-btn class="pull-right" color="primary" big @click="submit">Next</q-btn>

  </div>
</template>

<script>
import { QBtn, QField, QInput, QLayout, QRange } from 'quasar'

export default {
  name: 'user-setup-1',

  components: { QBtn, QField, QInput, QLayout, QRange },

  props: ['id'],

  data() {
    return {
      sex: this.$store.state.users[this.id].sex,
      sexualOrientation: this.$store.state.users[this.id].sexualOrientation,
      ageRange: this.$store.state.users[this.id].ageRange,
    }
  },

  methods: {
    submit() {
      const { sex, sexualOrientation, ageRange } = this
      this.$store.dispatch('setUser', {
        id: this.id,
        sex,
        sexualOrientation,
        ageRange,
      })
      this.$router.push(`/user/${this.id}/setup/2`)
    },
  },
}
</script>

<style lang="stylus" scoped>
.q-btn
  margin 5px
  border-radius 4px
</style>
