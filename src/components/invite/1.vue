<template>
  <!-- if you want automatic padding use "layout-padding" class -->
  <div class="layout-padding text-center" color="secondary">

    <div class="fields">
      <big class="title">Tell us more about your friend!</big>

      <p class="caption">My friend's name is</p>
      <q-field :error="nicknameHasError" :count="50">
        <q-input v-model="nickname" />
      </q-field>

      <p class="caption">I refer to my friend by</p>
      <q-field>
        <q-btn
          class="men" big color="primary"
          :class="{ 'is-active': sex === 'M' }"
          :flat="sex !== 'M'"
          @click="sex = 'M'"
        >
          Him
        </q-btn>
        <q-btn class="women" big color="primary"
          :class="{ 'is-active': sex === 'F' }"
          :flat="sex !== 'F'"
          @click="sex = 'F'"
        >
          Her
        </q-btn>
      </q-field>

      <p class="caption">{{ pronoun }}</p>
      <q-input class="age" suffix="years old" :error="ageHasError" type="number" v-model="age" :min="18" :max="80" label-always />

      <q-btn class="pull-right" color="secondary text-black text-medium" big @click="next">Next</q-btn>
    </div>

  </div>
</template>

<script>
import { Toast } from 'quasar'

export default {
  name: 'user-setup-1',

  data: () => ({ id: 'new' }),

  computed: {
    pronoun() {
      return this.sex === 'M' ? 'He is' : 'She is'
    },
    whose() {
      return this.sex === 'M' ? 'his' : 'her'
    },
    nickname: {
      get() {
        return this.$store.state.users[this.id].nickname
      },
      set(nickname) {
        this.$store.dispatch('setUser', { id: this.id, nickname })
      },
    },
    sex: {
      get() {
        return this.$store.state.users[this.id].sex
      },
      set(sex) {
        this.$store.dispatch('setUser', { id: this.id, sex })
      },
    },
    age: {
      get() {
        return this.$store.state.users[this.id].age
      },
      set(age) {
        this.$store.dispatch('setUser', { id: this.id, age })
      },
    },
    nicknameHasError() {
      return this.nickname.length === 0 || this.nickname.length > 50
    },
    ageHasError() {
      return this.age < 18 || this.age > 80
    },
  },

  methods: {
    next() {
      if (this.nicknameHasError) {
        if (this.nickname.length === 0) {
          Toast.create.negative({
            html: 'Your friend needs a name!',
          })
        } else {
          Toast.create.negative({
            html: `Your friend's name is too long. Use ${this
              .whose} nickname instead!`,
          })
        }
      } else if (this.ageHasError) {
        Toast.create.negative({
          html: 'Sorry, we only allow users above 18 years old.',
        })
      } else {
        this.$router.push('/invite/2')
      }
    },
  },
}
</script>

<style lang="stylus" scoped>
.q-btn
  margin 5px
  border-radius 4px

.title
  display block
  margin-bottom 1.5em

.fields
  padding 0 30px

.age
  max-width 100px
  margin-left auto
  margin-right auto
</style>
