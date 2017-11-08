<template>
  <!-- if you want automatic padding use "layout-padding" class -->
  <div class="layout-padding text-center">

    <div class="fields">
      <big class="title">Share something interesting about {{ pronoun }}!</big>

      <q-field :error="reviewHasError" :count="120">
        <q-input type="textarea" :min-rows="6" v-model="review"
          :placeholder="`What makes ${pronoun} a good friend?                                                                                                    A surprising fact about ${pronoun}?                                                                                                    Your fondest memory of ${pronoun}?`"/>
      </q-field>

      <q-btn class="pull-left" color="secondary text-black text-medium" big @click="$router.push('/invite/1')">Back</q-btn>
      <q-btn class="pull-right" color="secondary text-black text-medium" big @click="addInvitation">Next</q-btn>
    </div>

  </div>
</template>

<script>
import { Toast } from 'quasar'

export default {
  name: 'user-add-2',

  data: () => ({ id: 'new' }),

  computed: {
    pronoun() {
      const sex = this.$store.state.users[this.id].sex
      return sex === 'M' ? 'him' : sex === 'F' ? 'her' : 'them'
    },
    review: {
      get() {
        return this.$store.state.users[this.id].review
      },
      set(review) {
        this.$store.dispatch('setUser', { id: this.id, review })
      },
    },
    reviewHasError() {
      return this.review.length > 120 || this.review.length < 30
    },
  },

  methods: {
    addInvitation() {
      if (this.reviewHasError) {
        if (this.review.length > 120) {
          Toast.create.negative({
            html: 'Keep it short and sweet.',
          })
        } else {
          Toast.create.negative({
            html: 'Write more good things about your friend!',
          })
        }
      } else {
        this.$store.dispatch('addInvitation')
      }
    },
  },
}
</script>

<style lang="stylus" scoped>
.q-btn
  margin 5px
  border-radius 4px

.title
  display block
  margin-bottom 1.5em

.fields
  padding 0 30px
</style>
