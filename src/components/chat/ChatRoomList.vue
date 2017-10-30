<template>
  <div class="chat-bg">
    <q-scroll-area class="chat-list-size">
      <router-link v-for="room in rooms" :key="room.id" :to="`/user/${me.id}/chat/${room.otherPerson.id}`">
        <chat-room :otherPerson="room.otherPerson"/>
      </router-link>
    </q-scroll-area>
  </div>
</template>

<script>
import ChatRoom from '@/chat/ChatRoom'
import { mapState } from 'vuex'

export default {
  components: {
    ChatRoom,
  },

  data() {
    return {}
  },

  methods: {},

  computed: {
    ...mapState({
      me: ({ users, me }) => users[me],
      isMatchmakerMode: ({ isMatchmakerMode }) => isMatchmakerMode,
      rooms: ({ rooms }) => rooms,
    }),
  },

  props: ['id'],
}
</script>

<style lang="stylus" scoped>
@import '~src/themes/app.variables'

.chat-bg
  background-color: $chatBg
.chat-list-size
  height: calc(97vh - 110px)
  padding:1.5vw 1.5vw
</style>
