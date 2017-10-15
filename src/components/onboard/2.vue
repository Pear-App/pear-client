<template>
  <!-- if you want automatic padding use "layout-padding" class -->
  <div class="layout-padding">
    <form class="personal-information">
      <q-field
        label="Looking for"
      >
      <q-btn
        class="women full-width"
        :class="{ 'is-active': lookingFor === 0 }"
        :flat="lookingFor !== 0"
        big
        color="pink"
        icon="fa-venus"
        @click="lookingFor = 0"
      >
        Women
      </q-btn>
        <q-btn
          class="men full-width"
          :class="{ 'is-active': lookingFor === 1 }"
          :flat="lookingFor !== 1"
          big
          color="cyan"
          icon="fa-mars"
          @click="lookingFor = 1"
        >
          Men
        </q-btn>
        <q-btn
          class="both full-width"
          :class="{ 'is-active': lookingFor === 2 }"
          :flat="lookingFor !== 2"
          big
          color="yellow-8"
          icon="fa-genderless"
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
      <q-btn class="pull-left" color="primary" big @click="back">
        Back
      </q-btn>
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
      lookingFor: 0,
      ageRange: { min: 18, max: 80 }
    }
  },

  computed: {
    nameHasError () { return false }
  },

  methods: {
    back () {
      this.$router.push('1')
    },
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
</style>
