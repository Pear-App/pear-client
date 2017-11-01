<template>
  <!-- if you want automatic padding use "layout-padding" class -->
  <loader v-if="matches == null"/>
  <div v-else-if="matches.length === 0">
    <div class="header-bg bg-secondary"></div>

    There's nothing here...
  </div>
  <div v-else>
    <div class="header-bg bg-secondary"></div>

    <vue-swing @dragmove="dragmove" @dragend="dragend" @throwoutleft="reject" @throwoutright="accept" :config="swingConfig" class="swipe">
      <transition name="scale">
        <div v-if="matches.length !== 0" class="person" :data-id="matches[0].id" :key="matches[0].id">
          <div class="picture" :class="{ expanded: isProfileExpanded }"
               @click="isProfileExpanded = false"
               :style="{ 'background-image': `url(https://graph.facebook.com/${matches[0].facebookId}/picture?type=large)` }">
          </div>
          <div class="profile" v-touch-swipe="swipe" @click="isProfileExpanded = !isProfileExpanded">
            <span class="title">{{ matches[0].facebookName }}, {{ matches[0].age }}</span>
            <span class="subtitle">{{ matches[0].desc }}</span>
            <transition name="expand-y">
              <div v-show="isProfileExpanded" class="expanded-profile">
                <hr>
                <div class="expanded-profile-content">
                  <p class="caption">About</p>
                  <p>Hello world</p>
                  <p class="caption">What my friends say about me</p>
                  <p>Hello world</p>
                </div>
              </div>
            </transition>
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
import { TouchSwipe } from 'quasar'

import Loader from '../Loader'

export default {
  components: {
    VueSwing,
    Loader,
  },

  directives: { TouchSwipe },

  props: ['id'],

  data() {
    return {
      isProfileExpanded: false,
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
    swipe({ direction }) {
      if (direction === 'up') {
        this.isProfileExpanded = true
      } else if (direction === 'down') {
        this.isProfileExpanded = false
      }
    },
  },
}
</script>

<style lang="stylus" scoped>
@import '../../themes/app.variables'

$padding = 16px

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
  background-color black
  width calc(100% - 20px)
  height calc(100% - 20px)
  border-radius 10px
  box-shadow 0 2px 8px rgba(0, 0, 0, 0.3)
  overflow hidden

  .picture
    position absolute
    top 0
    left 0
    bottom 0
    right 0
    background-size cover
    background-position 50% 50%
    transition all .3s ease-out

  .picture.expanded
    opacity 0.5

  .profile
    background-color white
    border-radius 10px
    padding $padding 0
    bottom 10px
    box-shadow 0 2px 5px rgba(0, 0, 0, 0.1)
    color $tertiary
    position absolute
    width calc(100% - 20px)

    .title
      padding 0 $padding
      display block
      font-size 1.3em
      margin-left -1px
      margin-bottom 0.2em

    .subtitle
      padding 0 $padding
      display block
      font-size 1em

    .caption
      color darken($primary, 10%)
      margin-top 0
      margin-bottom 0.1em

    .content
      margin-bottom 1.5em

.scale-enter-active
  transition all .3s ease

.scale-leave-active
  transition all .8s cubic-bezier(1.0, 0.5, 0.8, 1.0)

.scale-enter, .scale-leave-to
  transform scale(0.8)
  opacity 0

.expanded-profile
  overflow hidden
  height calc(80vh \- 200px)
  max-height calc(80vh \- 200px)

  hr
    margin $padding 0
    border none
    border-top 1px solid alpha($tertiary, 0.1)

  .expanded-profile-content
    padding 0 $padding $padding $padding

.expand-y-enter-active
  transition all .3s ease-out

.expand-y-leave-active
  transition all .3s ease-out

.expand-y-enter, .expand-y-leave-to
  max-height 0

.header-bg
  position fixed
  z-index -100
  top 0
  left -2%
  width 104%
  height 200px
  border-radius 53px
  transition-delay 0.25s

</style>
