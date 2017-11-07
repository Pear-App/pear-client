<template v-if="currentRoom != null">
  <div class="chat-bg">
    <div class="row chat-header">
      <q-btn v-if="isDaterChat" @click="$router.push(`/user/${id}/chat`)" class="col-2" icon="arrow back"/>
      <q-btn v-else class="col-2" icon="blank"/>
      <div class="col-8 row flex-center">{{ currentRoom.otherPerson.facebookName }}</div>
      <q-btn class="col-2" icon="more horiz" @click="openChatActions"/>
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
    <q-btn v-if="isBlocked" color="primary" class="full-width unblock-button" @click="openUnblockModal">Unblock</q-btn>
    <q-input v-else class="message-input"
      v-model.trim="message"
      type="textarea"
      placeholder="Enter your message"
      :min-rows="1"
      clearable
      align="center"
      color=""
      @keydown.enter="sendMessage"
      :after="[
                {
                  icon: 'send',
                  color: 'black',
                  handler: sendMessage
                }
              ]"
    />
  </div>
</template>

<script>
import { Dialog, ActionSheet } from 'quasar'
import { mapState } from 'vuex'
import { get, post, log } from '../../util'

export default {
  data() {
    return {
      message: '',
    }
  },

  created() {
    if (!this.currentRoom || this.isBlocked) {
      return
    }
    this.enterRoom()
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
    openUnblockModal() {
      Dialog.create({
        title: 'Confirm',
        message: `Unblock ${this.currentRoom.otherPerson.facebookName}?`,
        buttons: [
          'No',
          {
            label: 'Yes',
            handler: () => {
              this.$store
                .dispatch('unblockPerson', parseInt(this.otherPersonId, 10))
                .then(() => this.enterRoom())
            },
          },
        ],
      })
    },
    openBlockModal() {
      Dialog.create({
        title: 'Confirm',
        message: `Block ${this.currentRoom.otherPerson.facebookName}?`,
        buttons: [
          'No',
          {
            label: 'Yes',
            handler: () => {
              this.$store
                .dispatch('blockPerson', parseInt(this.otherPersonId, 10))
                .then(() =>
                  this.$socket.emit('unsubscribe', [this.currentRoom.id])
                )
            },
          },
        ],
      })
    },
    enterRoom() {
      this.$socket.emit('subscribe', [this.currentRoom.id])
      this.$store.dispatch('getRoomMessages', this.currentRoom.id)
    },
    openChatActions() {
      ActionSheet.create({
        actions: [
          {
            label: 'Block User',
            icon: 'block',
            handler: this.openBlockModal,
          },
        ],
        dismiss: {
          label: 'Cancel',
        },
      })
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
    isBlocked: function() {
      return this.$store.state.blockedIds.includes(
        parseInt(this.otherPersonId, 10)
      )
    },
    isDaterChat: function() {
      return parseInt(this.id, 10) === this.$store.state.me
    },
  },

  props: ['id', 'otherPersonId'],
}
</script>

<style lang="stylus" scoped>
@import '~src/themes/app.variables'

.message-input
  margin: 0
  background-color: $chatHeader
  height: 40px
  padding-top: 6px
  padding-left: 8px
  padding-right: 8px
.message-input::before
  content: none
.message-input::after
  content: none
.message-input i
  color: black
.chat-bg
  background-color: $chatBg
.chat-header
  padding-top:1.5vh
  padding-bottom:1.5vh
  background-color: $chatHeader
.chat-size
  height: calc(97vh - 230px)
  padding:1.5vw 3vw
.chat-event-bg
  background-color: $primary
  border-radius: 20px
  font-weight: 500
  width: 90%
  margin-left: 5%
.unblock-button
  height: 40px
</style>
