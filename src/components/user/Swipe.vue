<template>
  <!-- if you want automatic padding use "layout-padding" class -->
  <loader v-if="matches == null"/>
  <div v-else-if="matches.length === 0">
    There's nothing here...
  </div>
  <div v-else>
    <vue-swing @dragmove="dragmove" @dragend="dragend" @throwoutleft="reject" @throwoutright="accept" :config="swingConfig" class="swipe">
      <div class="person" v-for="person in matches" :data-id="person.id" :key="person.id">
        <div class="picture" :style="{ 'background-image': `url(https://graph.facebook.com/${person.facebookId}/picture?type=large)` }"></div>
        <div class="profile">
          <span class="title">{{ person.facebookName }}, {{ person.age }}</span>
          <span class="subtitle">blahblah {{ person.desc }}</span>
        </div>
      </div>
    </vue-swing>
    <div class="like" :style="{ opacity: offset > 0 ? offset / 2 : 0 }"></div>
    <div class="unlike" :style="{ opacity: offset < 0 ? -offset / 2 : 0 }"></div>
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
  QIcon,
} from 'quasar'
import VueSwing from 'vue-swing'

import Loader from '../Loader'
import { normalise } from '../../util'

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
    Loader,
  },

  props: ['id'],

  data() {
    return {
      offset: 0,
      counter: 0,
      swingConfig: {
        isThrowOut: (x, y, el, confidence) => confidence > 0.4,
        minThrowOutDistance: document.body.clientWidth + 400,
        maxThrowOutDistance: document.body.clientWidth + 500,
        allowedDirections: [VueSwing.Direction.LEFT, VueSwing.Direction.RIGHT],
        transform: (element, coordinateX, coordinateY, rotation) => {
          element.style['transform'] =
            'translate3d(0, 0, 0) translate(' +
            coordinateX +
            'px, ' +
            coordinateX / 100 +
            'px) rotate(' +
            rotation +
            'deg)'
        },
        rotation: (coordinateX, coordinateY, element, maxRotation) => {
          const horizontalOffset = Math.min(
            Math.max(coordinateX / element.offsetWidth, -1),
            1
          )
          const rotation = horizontalOffset * maxRotation

          return rotation
        },
      },
    }
  },

  computed: {
    matches() {
      const user = this.$store.state.users[this.id]
      return user != null && user.matches
    },
  },

  mounted() {
    this.$store.dispatch('fetchMatches', this.id)
  },

  watch: {
    id(id) {
      this.$store.dispatch('fetchMatches', id)
    },
  },

  methods: {
    dragmove({ offset, throwDirection }) {
      if (
        throwDirection !== VueSwing.Direction.LEFT &&
        throwDirection !== VueSwing.Direction.RIGHT
      )
        return
      this.offset = normalise(offset, -100, 100)
    },
    dragend() {
      this.offset = 0
    },
    reject(e) {
      const candidateId = e.target.dataset.id
      // this.$store.dispatch('rejectMatch', { id: this.id, candidateId })
    },
    accept(e) {
      const candidateId = e.target.dataset.id
      // this.$store.dispatch('acceptMatch', { id: this.id, candidateId })
    },
  },
}
</script>

<style lang="stylus" scoped>
@import '../../themes/app.variables'

.like,
.unlike
  position fixed
  width 100vw
  height 100vh
  user-select none
  pointer-events none

.like
  background-color green

.unlike
  background-color red

.swipe
  overflow hidden

.person
  padding 10px
  width 100%
  position absolute
  top 10px
  left 10px
  background white
  width calc(100% - 20px)
  height calc(100% - 20px)
  border-radius 10px
  box-shadow 0 5px 8px rgba(0, 0, 0, 0.1)
  overflow hidden

  .picture
    position absolute
    top 0
    left 0
    bottom 0
    right 0
    background-size cover
    background-position 50% 50%

  .profile
    background-color white
    border-radius 10px
    bottom 10px
    box-shadow 0 2px 5px rgba(0, 0, 0, 0.1)
    color $tertiary
    padding 10px
    position absolute
    width calc(100% - 20px)

    .title
      display block
      font-weight 500
      font-size 1.3em
      margin-bottom 0.1em

    .subtitle
      display block
      font-size 1em
</style>
