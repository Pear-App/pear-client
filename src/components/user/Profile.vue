<template>
  <loader v-if="user == null" />
  <invitation :id="id" v-else-if="user.isInvitation" />
  <q-card v-else class="person no-margin">
    <q-card-media v-if="user.isMe">
      <div v-if="user.photos != null" class="row photos">
        <div v-for="(photo, i) in user.photos" :key="photo" class="photo"
          :style="{ 'background-image': `url(https://s3-ap-southeast-1.amazonaws.com/pear-server/album${photo})` }"
          @click="choosePhotos(i)"
        ></div>
        <div v-if="user.photos.length < 6" class="photo" @click="choosePhotos(user.photos.length)">
          <img class="photo" src="~assets/add-photo.png">
        </div>
      </div>
    </q-card-media>
    <q-card-media v-else>
      <div v-if="user.photos != null" class="row photos">
        <div v-for="(photo, i) in user.photos" :key="photo" class="photo"
          :style="{ 'background-image': `url(https://s3-ap-southeast-1.amazonaws.com/pear-server/album${photo})` }"
        ></div>
      </div>
    </q-card-media>
    <q-card-title>
      <p v-if="user.isMe">
        <span class="name">{{ user.facebookName }}, {{ user.age }}</span>
        <q-input class="school" v-model="school" placeholder="School"></q-input>
        <q-input class="major" v-model="major" placeholder="Major"></q-input>
      </p>

      <p v-else>
        <span class="name">{{ user.facebookName }}, {{ user.age }}</span>
        <span class="school" v-if="user.school != null"><br>{{ user.school }}</span>
        <span class="major" v-if="user.major != null"><br>{{ user.major }}</span>
      </p>
    </q-card-title>

    <q-card-main>
      <p v-if="user.isMe">
        <small class="caption text-primary">About</small><br>
        <q-input v-model="desc" placeholder="Write something about yourself!"></q-input>
      </p>

      <p v-else-if="user.desc != null && user.desc !== ''">
        <small class="caption text-primary">About</small><br>
        {{ user.desc }}
      </p>

      <p v-if="user.friend != null && user.friend.length !== 0">
        <small class="caption text-primary">What my friends say about me</small><br>
        <q-list no-border sparse>
          <q-item v-for="friend in user.friend" :key="friend.id" class="no-padding">
            <q-item-side :avatar="`https://graph.facebook.com/${friend.facebookId}/picture?type=large`" />
            <q-item-main>{{ friend.Friendships.review }}</q-item-main>
          </q-item>
        </q-list>
      </p>
    </q-card-main>
  </q-card>
</template>

<script>
import Loader from '../Loader'
import Invitation from './Invitation'
import { Toast, ActionSheet } from 'quasar'
import { mapState } from 'vuex'

export default {
  name: 'profile',

  components: { Invitation, Loader },

  props: ['id'],

  computed: {
    ...mapState({
      user({ users }) {
        return users[this.id]
      },
      photos: ({ photos }) => photos,
    }),
    desc: {
      get() {
        return this.user.desc
      },
      set(desc) {
        this.$store.dispatch('setUser', { ...this.user, desc })
      },
    },
    school: {
      get() {
        return this.user.school
      },
      set(school) {
        this.$store.dispatch('setUser', { ...this.user, school })
      },
    },
    major: {
      get() {
        return this.user.major
      },
      set(major) {
        this.$store.dispatch('setUser', { ...this.user, major })
      },
    },
  },

  methods: {
    choosePhotos(i) {
      const actions = this.photos.map(photo => ({
        avatar: `https://s3-ap-southeast-1.amazonaws.com/pear-server/album${photo}`,
        handler: () => {
          const photos = [...this.user.photos]
          photos[i] = photo
          this.$store.dispatch('choosePhotos', photos)
        },
      }))
      if (this.user.photos[i] != null) {
        actions.push({
          icon: 'delete',
          handler: () => {
            const photos = [...this.user.photos]
            photos.splice(i, 1)
            this.$store.dispatch('choosePhotos', photos)
          },
        })
      }
      ActionSheet.create({
        title: 'Pick a Photo',
        actions,
        gallery: true,
        dismiss: { label: 'Cancel' },
      })
    },
  },

  mounted() {
    if (this.user.isMe) {
      this.$store.dispatch('getProfilePictures')
    }
  },
}
</script>

<style lang="stylus" scoped>
@import '../../themes/app.variables'

.photos
  padding 20px
  width 99vw
  .photo
    margin 5px
    width calc(33vw - 25px)
    height calc(33vw - 25px)
    border-radius 100%
    background-position 50% 50%
    background-size cover
    box-shadow 0 2px 5px rgba(0, 0, 0, 0.1)
    img
      margin 0

.name
  font-weight 500
  font-size 1.3em

.major
  color grey
</style>
