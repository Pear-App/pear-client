<template>
  <!-- if you want automatic padding use "layout-padding" class -->
  <div class="layout-padding">
    <vue-swing @throwoutleft="reject" @throwoutright="accept" class="row justify-center">
      <q-card class="card" v-for="person in persons.queue" key="person.name">
        <q-card-media>
          <img class="person-picture no-select" :src="person.picture">
        </q-card-media>
        <q-card-title>
          {{ person.name }}
        </q-card-title>
        <q-card-separator />
        <q-card-main>
          Age: a billion<br />
          Likes: nothing
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

  computed: {
    persons: {
      get () { return this.$store.state.persons },
      set (persons) { this.$store.dispatch('updatePersons', persons) }
    }
  },

  data () {
    return {
      counter: 0
    }
  },

  mounted () {
    this.$store.dispatch('fetchPerson')
  },

  methods: {
    reject () {
      const person = this.persons.queue.pop()
      this.persons.rejected.push(person)
      if (++this.counter >= 5) return this.$router.push('/sort')
      this.$store.dispatch('fetchPerson')
    },
    accept () {
      const person = this.persons.queue.pop()
      this.persons.accepted.push(person)
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

.person-picture
  width 90vw
</style>
