<template>
  <!-- if you want automatic padding use "layout-padding" class -->
  <div class="layout-padding justify-center">
    <p class="caption">Tell me more about your friend!</p>
    <form class="personal-information">
      <q-field
        label="Name"
        :error="nameHasError"
        error-label="We need a name!"
        :count="100"
      >
        <q-input v-model="name" />
      </q-field>
      <q-field
        label="Looking for"
      >
        <q-btn
          class="men full-width"
          :class="{ 'is-active': lookingFor === 0 }"
          big
          :color="lookingFor === 0 && 'primary'" icon="fa-mars"
          @click="lookingFor = 0"
        >
          Men
        </q-btn>
        <q-btn
          class="women full-width"
          :class="{ 'is-active': lookingFor === 1 }"
          big
          :color="lookingFor === 1 && 'primary'" icon="fa-venus"
          @click="lookingFor = 1"
        >
          Women
        </q-btn>
        <q-btn
          class="both full-width"
          :class="{ 'is-active': lookingFor === 2 }"
          big
          :color="lookingFor === 2 && 'primary'" icon="fa-genderless"
          @click="lookingFor = 2"
        >
          Either
        </q-btn>
      </q-field>
      <q-field
        label="Age Range"
      />
        <q-range
          v-model="ageRange"
          :min="18"
          :max="80"
          label-always
        />
      </q-field>
      <q-btn class="pull-right" color="primary" big @click="submit">
        Next
      </q-btn>
    </form>
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
      name: '',
      lookingFor: 0,
      ageRange: { min: 18, max: 80 }
    }
  },

  computed: {
    nameHasError () { return false }
  },

  methods: {
    submit () {
      this.$router.push('3')
    }
  }
}
</script>

<style lang="stylus" scoped>
@import '~variables'

.personal-information
  width 500px
  max-width 90vw

  .q-btn
    margin 5px
    border-radius 4px

  .men:not(.is-active)
  .women:not(.is-active)
  .both:not(.is-active)
    background-color white !important
    border 1px solid $grey-4 !important

  .men.is-active
    background-color $cyan !important
  .women.is-active
    background-color $pink !important
  .both.is-active
    background-color $yellow-8 !important
</style>
