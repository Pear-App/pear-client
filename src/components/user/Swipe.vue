<template>
  <!-- if you want automatic padding use "layout-padding" class -->
  <loader v-if="matches == null"/>
  <div v-else>
    <div class="wrapper">
      <div class="header-bg bg-secondary"></div>
    </div>

    <div class="person placeholder"></div>
    <vue-swing @dragmove="dragmove" @dragend="dragend" @throwoutleft="reject" @throwoutright="accept" :config="swingConfig" class="swipe">
      <transition v-if="matches.length !== 0" name="scale">
        <div class="person" :data-id="matches[0].id" :key="matches[0].id">
          <div v-if="matches[0].photos != null" class="photos"
            @click="isProfileExpanded = false"
            :class="{ expanded: isProfileExpanded }"
            v-touch-swipe="swipeImage"
          >
            <div v-for="(photo, i) in matches[0].photos" :key="photo" class="photo"
              :style="{
                'background-image': `url(https://s3-ap-southeast-1.amazonaws.com/pear-server/normal${photo})`,
                transform: `translateY(-${image * 100}%)`
              }"
            ></div>
          </div>
          <div class="pagination">
            <div v-for="(photo, i) in matches[0].photos"
              :class="{ active: !isProfileExpanded && image === i }" :key="photo"
            ></div>
            <div :class="{ active: isProfileExpanded }"></div>
          </div>
          <div class="profile" v-touch-swipe="swipeProfile" @click="isProfileExpanded = !isProfileExpanded">
            <p class="information">
              <span class="name">{{ matches[0].facebookName }}, {{ matches[0].age }}</span>
              <template v-if="matches[0].school != null">
                <br><span class="school">{{ matches[0].school }}</span>
              </template>
              <template v-if="matches[0].major != null">
                <br><span class="major">{{ matches[0].major }}</span>
              </template>
            </p>
            <transition name="expand-y">
              <div v-show="isProfileExpanded" class="expanded-profile">
                <hr>
                <div class="expanded-profile-content">
                  <small class="caption text-primary">About me</small><br>
                  <p>{{ matches[0].desc }}</p>
                  <small class="caption text-primary">What my friends say about me</small><br>
                  <q-list no-border sparse>
                    <q-item v-for="friend in matches[0].friend" :key="friend.id" class="no-padding">
                      <q-item-side :avatar="`https://graph.facebook.com/${friend.facebookId}/picture?type=large`" />
                      <q-item-main>{{ friend.Friendships.review }}</q-item-main>
                    </q-item>
                  </q-list>
                  <div class="text-center">
                    <q-btn @click="openSwipeModal" class="report-button">Report User</q-btn></div>
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
import { TouchSwipe, Dialog, Toast } from 'quasar'
import { post } from '../../util'

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
      image: 0,
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
    swipeImage({ direction }) {
      const max = this.matches[0].photos.length - 1
      if (direction === 'up') {
        if (this.image === max) {
          this.isProfileExpanded = true
        } else {
          this.image++
        }
      } else if (direction === 'down') {
        if (this.isProfileExpanded) {
          this.isProfileExpanded = false
        } else if (this.image > 0) {
          this.image--
        }
      }
    },
    swipeProfile({ direction }) {
      if (direction === 'up') {
        this.isProfileExpanded = true
      } else if (direction === 'down') {
        this.isProfileExpanded = false
      }
    },
    openSwipeModal() {
      Dialog.create({
        title: 'Report User',
        buttons: [
          {
            label: 'Inappropriate Profile',
            color: 'black',
            handler: () => {
              // Not sure how to get current match id? so just put 500
              this.reportUser(500, 1)
            },
          },
          {
            label: 'Inappropriate Messaging',
            color: 'black',
            handler: () => {
              // Not sure how to get current match id? so just put 500
              this.reportUser(500, 2)
            },
          },
          {
            label: 'Fake Profile',
            color: 'black',
            handler: () => {
              // Not sure how to get current match id? so just put 500
              this.reportUser(500, 3)
            },
          },
          {
            label: 'Other',
            color: 'black',
            handler: () => {
              // Not sure how to get current match id? so just put 500
              this.reportUser(500, 4)
            },
          },
          {
            label: 'Cancel',
            color: 'primary',
          },
        ],
        stackButtons: true,
        noBackdropDismiss: true,
      })
    },
    reportUser(flageeId, reason) {
      post(`/flaglist/`, {
        flageeId,
        reason,
      })
      Toast.create({
        html: 'User reported!',
        icon: 'mail',
        bgColor: '#F2C037',
      })
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
  border-radius 25px
  z-index 1
  box-shadow 0 2px 5px rgba(0, 0, 0, 0.2)
  overflow hidden

  &.placeholder
    top 40px
    left 40px
    background-color white
    width calc(100% - 80px)
    height calc(100% - 80px)

  .photos
    position absolute
    top 0
    left 0
    bottom 0
    right 0
    transition all .3s ease-out

    .photo
      width 100%
      height 100%
      background-size cover
      background-position 50% 50%
      transition all .3s ease-out

    &.expanded
      opacity 0.5

  .pagination
    position absolute
    top 30px
    right 12px

    div
      width 8px
      height 8px
      margin-bottom 4px
      margin-left 1px
      background-color rgba(128, 128, 128, 0.5)
      border-radius 100%
      box-shadow 0 2px 5px rgba(0, 0, 0, 0.1)

    div.active
      background-color white
      width 10px
      height 10px
      margin-left 0

    div:last-child
      background-color $secondary

  .profile
    background-color white
    border-radius 25px
    padding $padding 0
    bottom 10px
    box-shadow 0 2px 5px rgba(0, 0, 0, 0.1)
    color $tertiary
    position absolute
    width calc(100% - 20px)

    .information
      margin 0
      padding 0 $padding
      display block
      margin-left -1px
      margin-bottom 0

    .name
      font-weight 500
      font-size 1.3em

    .major
      color grey

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

.wrapper
  position absolute
  top -10vw
  width 100vw
  height 50vw
  overflow-x hidden

  .header-bg
    display inline-block
    z-index -100
    margin-left -20vw
    width 140vw
    height 50vw
    border-radius 0 0 50vw 50vw
    transition-delay 0.25s
    animation slide 0.5s

@keyframes slide
  0%
    transform translateY(-100%)
    border-radius 0

  100%
    transform translateY(0)
    border-radius 0 0 50vw 50vw

.report-button
  background-color: #F4FAF3
  border-radius: 25px
  width: 40vw
  font-weight: 400
  margin-top: 20px

</style>
