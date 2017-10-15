<template>
  <!-- if you want automatic padding use "layout-padding" class -->
  <div class="layout-padding">
    <vue-swing @throwout="throwout" class="row justify-center">
      <q-card class="card" v-for="person in persons" key="person.name">
        <q-card-media>
          <img class="person-picture no-select" :src="person.picture">
        </q-card-media>
        <q-card-title>
          {{ person.name }}
        </q-card-title>
        <q-card-separator />
        <q-card-main>
          Card Content
        </q-card-main>
        <q-card-actions align="around">
          <q-btn flat round small color="red" @click="throwout"><q-icon name="favorite" /></q-btn>
          <q-btn flat round small color="faded"><q-icon name="bookmark" /></q-btn>
          <q-btn flat round small color="primary"><q-icon name="share" /></q-btn>
        </q-card-actions>
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
      persons: []
    }
  },

  mounted () {
    this.fetchPerson()
  },

  methods: {
    throwout () {
      this.persons.pop()
      this.fetchPerson()
    },
    async fetchPerson () {
      const res = await fetch('https://randomuser.me/api/?inc=gender,name,picture')
      const data = await res.json()
      const person = data.results[0]
      this.persons.push({
        picture: person.picture.large,
        name: `${person.name.first} ${person.name.last}`,
        gender: person.gender === 'male' ? 1 : 0
      })
    }
  }
}
</script>

<style lang="stylus" scoped>
.card
  max-width 400px

.no-select
  user-select none
  pointer-events none

.person-picture
  width 80vw
</style>
