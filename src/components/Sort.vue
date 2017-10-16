<template>
  <!-- if you want automatic padding use "layout-padding" class -->
  <div class="layout-padding">
    <p>Rank</p>
    <q-list inset-separator>
      <draggable v-model="persons" :options="dragOptions">
        <transition-group name="sort">
          <q-item class="card sortable" v-for="person in persons" :key="person.name">
            <q-item-side :avatar="person.picture" />
            <q-item-main>
              {{ person.name }}
            </q-item-main>
            <q-item-side right icon="fa-bars" />
          </q-item>
        </transition-group>
      </draggable>
    </q-list>
    <q-btn color="primary" @click="submit">
      Share
    </q-btn>
  </div>
</template>

<script>
import {
  QBtn,
  QList,
  QItem,
  QItemSide,
  QItemMain
} from 'quasar'
import Draggable from 'vuedraggable'

export default {
  components: {
    QBtn,
    QList,
    QItem,
    QItemSide,
    QItemMain,
    Draggable
  },

  data () {
    return {
      dragOptions: {
        delay: 0,
        animation: 150
      },
      persons: []
    }
  },

  mounted () {
    for (let i = 0; i < 5; i++) this.fetchPerson()
  },

  methods: {
    async fetchPerson () {
      const res = await fetch('https://randomuser.me/api/?inc=gender,name,picture')
      const data = await res.json()
      const person = data.results[0]
      this.persons.push({
        picture: person.picture.large,
        name: `${person.name.first} ${person.name.last}`,
        gender: person.gender === 'male' ? 1 : 0
      })
    },

    submit () {
      this.$router.push('/')
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
  width 90vw

.sort
  transition transform 0.5s

.sortable
  cursor pointer

.sortable-ghost
  opacity 0.5
</style>
