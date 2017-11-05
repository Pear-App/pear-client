<template>
  <loader v-if="user == null" />
  <invitation :id="id" v-else-if="user.isInvitation" />
  <q-card v-else class="person no-margin">
    <q-card-media v-if="user.isMe">
      <div v-if="user.photos != null" class="row photos">
        <div v-for="(photo, i) in user.photos" :key="photo" class="photo col-4">
          <img :src="`https://s3-ap-southeast-1.amazonaws.com/pear-server/album${photo}`" @click="choosePhotos(i)">
        </div>
        <div v-if="user.photos.length < 6" class="photo col-4" @click="choosePhotos(user.photos.length)">
          <img src="~assets/add-photo.png">
        </div>
      </div>
    </q-card-media>
    <q-card-media v-else>
      <div v-if="user.photos != null" class="row photos">
        <div v-for="(photo, i) in user.photos" :key="photo" class="photo col-4">
          <img :src="`https://s3-ap-southeast-1.amazonaws.com/pear-server/album${photo}`">
        </div>
      </div>
    </q-card-media>
    <q-card-title>{{ user.facebookName }}, {{ user.age }}</q-card-title>
    <q-card-main>
      <span class="school">{{ user.school }}</span>
      <span class="major">{{ user.major }}</span>

      <p v-if="user.desc != null && user.desc !== ''">
        <small class="caption text-primary">About</small><br>
        <span class="major">{{ user.desc }}</span>
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

  components: { Invitation },

  props: ['id'],

  computed: {
    ...mapState({
      user({ users }) {
        return users[this.id]
      },
      photos: ({ photos }) => photos,
    }),
  },

  methods: {
    choosePhotos(i) {
      ActionSheet.create({
        title: 'Pick a Photo',
        // specify ONLY IF you want gallery mode:
        gallery: true,
        actions: this.photos.map(photo => ({
          avatar: `https://s3-ap-southeast-1.amazonaws.com/pear-server/album${photo}`,
          handler: () => {
            const photos = [...this.user.photos]
            photos[i] = photo
            this.$store.dispatch('choosePhotos', photos)
          },
        })),
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
  padding 10px
  .photo
    padding 10px
    img
      width 100%
      border-radius 100%
      box-shadow 0 2px 5px rgba(0, 0, 0, 0.1)
</style>
