<template>
  <!-- if you want automatic padding use "layout-padding" class -->
  <div class="layout-padding">
    <p class="caption">Share something interesting about {{ pronoun }}!</p>

    <q-field :error="descHasError" :count="120">
      <q-input type="textarea" :min-rows="4" v-model="desc" />
    </q-field>

    <q-btn class="pull-left" color="primary" big @click="$router.push('/invite/1')">Back</q-btn>
    <q-btn class="pull-right" color="primary" big @click="$store.dispatch('addInvitation')">Next</q-btn>

  </div>
</template>

<script>
import { QBtn, QField, QInput, QLayout, QRange } from 'quasar'

export default {
  name: 'user-add-2',

  components: { QBtn, QField, QInput, QLayout, QRange },

  data: () => ({ id: 'new' }),

  computed: {
    pronoun() {
      const sex = this.$store.state.users[this.id].sex
      return sex === 'M' ? 'him' : sex === 'F' ? 'her' : 'them'
    },
    desc: {
      get() {
        return this.$store.state.users[this.id].desc
      },
      set(desc) {
        this.$store.dispatch('setUser', { id: this.id, desc })
      },
    },
    descHasError() {
      return this.desc.length > 120
    },
  },
}
</script>

<style lang="stylus" scoped>
.q-btn
  margin 5px
  border-radius 4px
</style>
