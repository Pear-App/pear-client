<template>
  <div class="chat-bg">
    <div class="row justify-center chat-header">
      Person Name {{roomId}}
    </div>
     <q-scroll-area class="chat-size" v-chat-scroll>
        <q-chat-message
          v-for="msg in messages"
          :key="msg"
          :label="msg.label"
          :sent="true"
          text-color="grey-8"
          bg-color="brown-1"
          :avatar="msg.avatar"
          :text="msg.text"
          class="chat-message-bg"
        />
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
export default {
  data() {
    return {
      message: '',
      messages: [
        {
          label: 'Sunday, 19th',
        },
        {
          name: 'Vladimir',
          text: ['How are you?'],
          avatar: 'statics/quasar-logo.png',
          stamp: 'Yesterday 13:34',
        },
        {
          name: 'Jane',
          text: ["I'm good, thank you!", 'And you?'],
          sent: true,
          avatar: 'statics/quasar-logo.png',
          stamp: 'Yesterday at 13:50',
        },
        {
          name: 'Jane',
          text: ['And you?'],
          sent: true,
          avatar: 'statics/quasar-logo.png',
          stamp: 'Yesterday at 13:51',
        },
        {
          label: 'Sunday, 19th',
        },
        {
          name: 'Vladimir',
          text: ['Fine. Nice weather today, right?', 'Hmm...'],
          avatar: 'statics/quasar-logo.png',
          stamp: '13:55',
        },
      ],
    }
  },

  methods: {
    sendMessage() {
      if (this.message == '') {
        return
      }
      this.messages.push({
        name: 'Si Kai',
        text: [this.message],
        avatar: 'statics/quasar-logo.png',
        stamp: 'Today now',
      })
      this.message = ''
    },
  },

  computed: {
    roomId() {
      const user = this.$store.state.users[this.id]
      if (!user) {
        return ''
      }
      return user.rooms[0].id
    },
  },

  props: ['id'],
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
  height: calc(97vh - 170px)
  padding:1.5vw 3vw
</style>
