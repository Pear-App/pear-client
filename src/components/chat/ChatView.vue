<template v-if="currentRoom != null">
  <div class="chat-bg">
    <div class="row justify-center chat-header">
      <!-- <q-btn class="col-2" icon="arrow back"/> -->
      {{ currentRoom.otherPerson.facebookName }}
    </div>
     <q-scroll-area class="chat-size" v-chat-scroll>
       <template v-for="(msg, index) in this.$store.state.roomMessages[currentRoom.id]">
         <q-chat-message
           v-if ="msg.isEvent"
           :key="index"
           :label="$escapeHtml(msg.text)"
           class="chat-event-bg text-grey-9"
         />
         <q-chat-message
           v-if ="!msg.isEvent"
           :key="index"
           :sent="msg.ownerId === parseInt(me.id, 10)"
           text-color="grey-8"
           bg-color="brown-1"
           :avatar="avatarUrl(msg.ownerId)"
           :text="[$escapeHtml(msg.text)]"
         />
       </template>
    </q-scroll-area>
    <q-input class="message-input"
      v-model.trim="message"
      type="textarea"
      placeholder="Enter your message"
      :min-rows="1"
      clearable
      inverted
      align="center"
      color="primary"
      @keydown.enter="sendMessage"
      @click=""
      :after="[
                {
                  icon: 'send',
                  handler: sendMessage
                }
              ]"
    />
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { get, post, log } from '../../util'

export default {
  data() {
    return {
      message: '',
      // Example for adding labels in the future
      // messages: [
      //   {
      //     label: 'Sunday, 19th',
      //   },
      //   {
      //     name: 'Vladimir',
      //     text: ['How are you?'],
      //     avatar: 'statics/quasar-logo.png',
      //     stamp: 'Yesterday 13:34',
      //   },
      // ],
    }
  },

  created() {
    if (!this.currentRoom) {
      return
    }
    this.$socket.emit('subscribe', [this.currentRoom.id])
    this.$store.dispatch('getRoomMessages', this.currentRoom.id)
  },

  sockets: {
    message: function(message) {
      const roomId = this.currentRoom.id
      this.$store.commit('patchRoomMessage', { roomId, message })
    },
  },

  methods: {
    async sendMessage() {
      if (this.message === '') {
        return
      }
      const [_, err] = await post(`/room/${this.currentRoom.id}/messages`, {
        message: this.message,
      })
      if (err != null) {
        log(err)
        Toast.create.negative({
          html:
            'Sorry, something went wrong with sending out your message. Try entering the chat again.',
        })
      } else {
        this.message = ''
      }
    },
    avatarUrl(userId) {
      const facebookId =
        userId === parseInt(this.me.id, 10)
          ? this.me.facebookId
          : this.currentRoom.otherPerson.facebookId
      return `https://graph.facebook.com/${facebookId}/picture?type=large`
    },
  },

  computed: {
    currentRoom: function() {
      return this.$store.state.rooms.find(
        room => room.otherPerson.id === parseInt(this.otherPersonId, 10)
      )
    },
    ...mapState({
      me: ({ users, me }) => users[me],
    }),
  },

  props: ['otherPersonId'],
}
</script>

<style lang="stylus" scoped>
@import '~src/themes/app.variables'

.message-input
  margin: 0
.chat-bg
  background-color: $chatBg
.chat-header
  padding-top:1.5vh
  padding-bottom:1.5vh
  background-color: rgb(250,235,187)
.chat-size
  height: calc(97vh - 200px)
  padding:1.5vw 3vw
.chat-event-bg
  background-color: $primary
  border-radius: 20px
  font-weight: 500
  width: 90%
  margin-left: 5%
</style>
