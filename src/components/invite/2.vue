<template>
  <!-- if you want automatic padding use "layout-padding" class -->
  <div class="layout-padding">
    <p class="caption">Tell me more about your friend!</p>

    <q-field label="Name" :error="nicknameHasError" :count="50">
      <q-input v-model="nickname" />
    </q-field>

    <q-field label="Describe your friend" :error="descHasError" :count="120">
      <q-input type="textarea" :min-rows="4" v-model="desc" />
    </q-field>

<!--
    <q-field label="Interests">
      <q-btn
        v-for="interest in interests"
        key="interest.name"
        big
        color='primary'
        :flat="!interest.active"
        @click="interest.active = !interest.active"
      >
        {{ interest.name }}
      </q-btn>
    </q-field>
 -->

    <q-btn class="pull-left" color="primary" big @click="$router.push('/invite/1')">Back</q-btn>
    <q-btn class="pull-right" color="primary" big @click="$store.dispatch('addInvitation')">Next</q-btn>

  </div>
</template>

<script>
import { QBtn, QField, QInput, QLayout, QRange } from 'quasar'

export default {
  name: 'user-add-2',

  components: { QBtn, QField, QInput, QLayout, QRange },

  data: () => ({ id: 'new' }),

  computed: {
    nickname: {
      get() {
        return this.$store.state.users[this.id].nickname
      },
      set(nickname) {
        this.$store.dispatch('setUser', { id: this.id, nickname })
      },
    },
    desc: {
      get() {
        return this.$store.state.users[this.id].desc
      },
      set(desc) {
        this.$store.dispatch('setUser', { id: this.id, desc })
      },
    },
    nicknameHasError() {
      return this.nickname.length > 50
    },
    descHasError() {
      return this.desc.length > 120
    },
  },
}
</script>

<style lang="stylus" scoped>
.q-btn
  margin 5px
  border-radius 4px
</style>
