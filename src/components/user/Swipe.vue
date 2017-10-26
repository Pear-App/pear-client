<template>
  <!-- if you want automatic padding use "layout-padding" class -->
  <loader v-if="matches == null"/>
  <div v-else-if="matches.length === 0">
    There's nothing here...
  </div>
  <div v-else>
    <vue-swing @dragmove="dragmove" @dragend="dragend" @throwoutleft="reject" @throwoutright="accept" :config="swingConfig" class="swipe">
      <transition name="scale">
        <div v-if="matches.length !== 0" class="person" :data-id="matches[0].id" :key="matches[0].id">
          <div class="picture" :style="{ 'background-image': `url(https://graph.facebook.com/${matches[0].facebookId}/picture?type=large)` }"></div>
          <div class="profile">
            <span class="title">{{ matches[0].facebookName }}, {{ matches[0].age }}</span>
            <span class="subtitle">{{ matches[0].desc }}</span>
          </div>
        </div>
      </transition>
    </vue-swing>
    <div class="like" :style="{ opacity: offset > 0 ? offset / 2 : 0 }"></div>
    <div class="unlike" :style="{ opacity: offset < 0 ? -offset / 2 : 0 }"></div>
  </div>
</template>

<script>
import VueSwing from 'vue-swing'

import Loader from '../Loader'

export default {
  components: {
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
    if (this.matches == null || this.matches.length === 0) {
      this.$store.dispatch('fetchMatches', this.id)
    }
  },

  watch: {
    id(id) {
      if (this.matches == null || this.matches.length === 0) {
        this.$store.dispatch('fetchMatches', id)
      }
    },
  },

  methods: {
    dragmove({ throwDirection, throwOutConfidence }) {
      if (throwDirection === VueSwing.Direction.LEFT) {
        this.offset = -throwOutConfidence
      } else if (throwDirection === VueSwing.Direction.RIGHT) {
        this.offset = throwOutConfidence
      }
    },
    dragend() {
      this.offset = 0
    },
    reject(e) {
      const candidateId = e.target.dataset.id
      this.$store.dispatch('rejectMatch', { id: this.id, candidateId })
    },
    accept(e) {
      const candidateId = e.target.dataset.id
      this.$store.dispatch('acceptMatch', { id: this.id, candidateId })
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

.scale-enter-active
  transition all .3s ease

.scale-leave-active
  transition all .8s cubic-bezier(1.0, 0.5, 0.8, 1.0)

.scale-enter, .scale-leave-to
  transform scale(0.8)
  opacity 0
</style>
