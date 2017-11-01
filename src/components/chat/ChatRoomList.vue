<template>
  <div>
    <div class="header-padding"></div>
    <q-scroll-area class="chat-list-size">
      <q-list class="chat-list-bg" no-border highlight inset-separator>
        <q-list-header>Matchmaker Squad</q-list-header>
        <chat-room v-for="room in matchmakerRooms" :key="room.id" :id="id" :otherPerson="room.otherPerson"/>
        <q-list-header>Daters</q-list-header>
        <chat-room v-for="room in daterRooms" :key="room.id" :id="id" :otherPerson="room.otherPerson"/>
      </q-list>
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

  computed: mapState({
    rooms: ({ rooms }) => rooms,
    daterRooms: ({ rooms }) => rooms.filter(room => room.isMatch),
    matchmakerRooms: ({ rooms, friends }) =>
      rooms.filter(
        room => !room.isMatch && friends.includes(room.otherPerson.id)
      ),
  }),

  props: ['id'],
}
</script>

<style lang="stylus" scoped>
@import '~src/themes/app.variables'

.chat-list-size
  height: calc(97vh - 160px)
  padding: 1.5vw 0vw
  background-color: $chatBg
.chat-list-bg
  padding: 0px
// .header-padding
//   height: 6vh
//   background-color: $primary
</style>
