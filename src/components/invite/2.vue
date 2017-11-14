<template>
  <!-- if you want automatic padding use "layout-padding" class -->
  <div class="layout-padding text-center">

    <div class="fields">
      <big class="title">Share something interesting about {{ pronoun }}!</big>

      <q-field :error="reviewHasError"></q-field>
        <q-input type="textarea" :min-rows="6" v-model="review" :count="500"
          :placeholder="`What makes ${pronoun} a good friend?                                                                                                    A surprising fact about ${pronoun}?                                                                                                    Your fondest memory of ${pronoun}?`"/>
      </q-field>

      <q-btn class="pull-left" color="secondary text-black text-medium" big @click="$router.push('/invite/1')">Back</q-btn>
      <q-btn class="pull-right" v-model="isLoading" color="secondary text-black text-medium" big @click="addInvitation">Next</q-btn>
    </div>

  </div>
</template>

<script>
import { Toast } from 'quasar'

export default {
  name: 'user-add-2',

  data() {
    return {
      id: 'new',
      isLoading: false,
    }
  },

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
      return this.review.length > 500 || this.review.length < 30
    },
  },

  methods: {
    async addInvitation() {
      this.isLoading = true
      if (this.reviewHasError) {
        if (this.review.length > 500) {
          Toast.create.negative({
            html: 'Keep it short and sweet.',
          })
        } else {
          Toast.create.negative({
            html: 'Write more good things about your friend!',
          })
        }
      } else {
        await this.$store.dispatch('addInvitation')
      }
      this.isLoading = false
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
