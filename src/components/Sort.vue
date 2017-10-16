<template>
  <!-- if you want automatic padding use "layout-padding" class -->
  <div class="layout-padding">
    <p>Rank</p>
    <q-list inset-separator>
      <draggable v-model="persons" :options="dragOptions">
        <transition-group name="sort">
          <q-item class="card sortable" v-for="person in persons.accepted" :key="person.name">
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

  computed: {
    persons: {
      get () { return this.$store.state.persons },
      set (persons) { this.$store.dispatch('updatePersons', persons) }
    }
  },

  data () {
    return {
      dragOptions: {
        delay: 0,
        animation: 150
      }
    }
  },

  methods: {
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
  cursor move

.sortable-ghost
  opacity 0.5
</style>
