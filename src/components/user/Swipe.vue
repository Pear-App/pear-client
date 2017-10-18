<template>
  <!-- if you want automatic padding use "layout-padding" class -->
  <loader v-if="matches == null"/>
  <div v-else-if="matches.length === 0">
    There's nothing here...
  </div>
  <div v-else class="layout-padding">
    <vue-swing @throwoutleft="reject" @throwoutright="accept" :config="swingConfig" class="row justify-center">
      <q-card class="card" v-for="person in matches" :data-id="person.id" :key="person.id">
        <q-card-media>
          <img class="no-select" :src="`//graph.facebook.com/${person.facebookId}/picture?type=large`">
        </q-card-media>
        <q-card-title>
          {{ person.facebookName }}
        </q-card-title>
        <q-card-separator />
        <q-card-main>
          {{ person.desc }}
        </q-card-main>
      </q-card>
    </vue-swing>
  </div>
</template>

<script>
import {
  QBtn,
  QCard,
  QCardActions,
  QCardMedia,
  QCardTitle,
  QCardSeparator,
  QCardMain,
  QIcon
} from 'quasar'
import VueSwing from 'vue-swing'
import Loader from '../Loader'

export default {
  components: {
    QBtn,
    QCard,
    QCardActions,
    QCardMedia,
    QCardTitle,
    QCardSeparator,
    QCardMain,
    QIcon,
    VueSwing,
    Loader
  },

  props: ['id'],

  data () {
    return {
      counter: 0,
      swingConfig: {
        isThrowOut: (x, y, el, confidence) => confidence > 0.3,
        minThrowOutDistance: 200,
        maxThrowOutDistance: 300
      }
    }
  },

  computed: {
    matches () {
      const user = this.$store.state.users[this.id]
      return user != null && user.matches
    }
  },

  mounted () { this.$store.dispatch('fetchMatches', this.id) },

  watch: {
    id (id) { this.$store.dispatch('fetchMatches', id) }
  },

  methods: {
    reject (e) {
      const candidateId = e.target.dataset.id
      this.$store.dispatch('rejectMatch', { id: this.id, candidateId })
    },
    accept (e) {
      const candidateId = e.target.dataset.id
      this.$store.dispatch('acceptMatch', { id: this.id, candidateId })
    }
  }
}
</script>

<style lang="stylus" scoped>
.card
  max-width 400px
  position absolute
  background white

.no-select
  user-select none
  pointer-events none
</style>
