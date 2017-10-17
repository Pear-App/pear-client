<template>
  <!-- if you want automatic padding use "layout-padding" class -->
  <div class="layout-padding">
    <vue-swing @throwoutleft="reject" @throwoutright="accept" :config="swingConfig" class="row justify-center">
      <q-card class="card" v-for="person in persons" :data-id="person.id" :key="person.id">
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
    VueSwing
  },

  data () {
    return {
      counter: 0,
      swingConfig: {
        isThrowOut: (x, y, el, confidence) => confidence > 0.3,
        minThrowOutDistance: 200,
        maxThrowOutDistance: 300
      },
      persons: this.$store.state.persons
    }
  },

  mounted () {
    this.$store.dispatch('setPersons', [])
    this.$store.dispatch('fetchPerson')
    this.$store.dispatch('fetchPerson')
  },

  methods: {
    reject (e) {
      const person = this.persons.find(p => p.id === parseInt(e.target.dataset.id))
      person.accepted = false
      this.$store.dispatch('setPerson', person)
      if (++this.counter >= 5) return this.$router.push('/sort')
      this.$store.dispatch('fetchPerson')
    },
    accept (e) {
      const person = this.persons.find(p => p.id === parseInt(e.target.dataset.id))
      person.accepted = true
      this.$store.dispatch('setPerson', person)
      if (++this.counter >= 5) return this.$router.push('/sort')
      this.$store.dispatch('fetchPerson')
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
