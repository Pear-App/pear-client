<template>
  <!-- if you want automatic padding use "layout-padding" class -->
  <loader v-if="id == null" />
  <div v-else class="layout-padding text-center" color="secondary">

    <div class="fields" v-if="isSingle">
      <p class="caption">I am a</p>
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

      <p class="caption">My age is:</p>
      <q-input class="age" suffix="years old" :error="ageHasError" type="number" v-model="age" :min="18" :max="80" label-always />

      <p class="caption">I am interested in:</p>
      <q-field>
        <q-btn
          class="men" big color="primary"
          :class="{ 'is-active': sexualOrientation === 'M' }"
          :flat="sexualOrientation !== 'M'"
          @click="sexualOrientation = 'M'"
        >
          Men
        </q-btn>
        <q-btn class="women" big color="primary"
          :class="{ 'is-active': sexualOrientation === 'F' }"
          :flat="sexualOrientation !== 'F'"
          @click="sexualOrientation = 'F'"
        >
          Women
        </q-btn>
        <q-btn
          class="both" big color="primary"
          :class="{ 'is-active': sexualOrientation === 'B' }"
          :flat="sexualOrientation !== 'B'"
          @click="sexualOrientation = 'B'"
        >
          Both
        </q-btn>
      </q-field>

      <p class="caption">Age range:</p>
      <q-field>
        <q-range v-model="ageRange" :min="18" :max="80" label-always />
      </q-field>

    </div>

    <div class="footer">
      <p>
        <router-link to="/terms">Terms and Conditions</router-link>
      </p>
      <p>
        <router-link to="/privacy">Privacy Policy</router-link>
      </p>
    </div>

    <q-btn color="primary" big @click="done">Done</q-btn>

  </div>
</template>

<script>
import Loader from './Loader'

export default {
  name: 'settings',

  components: { Loader },

  computed: {
    id() {
      return this.$store.state.me
    },
    isSingle() {
      return this.$store.state.users[this.id].isSingle
    },
    pronoun() {
      return this.sex === 'M' ? 'He is' : 'She is'
    },
    user() {
      return this.$store.state.users[this.id]
    },
    sex: {
      get() {
        return this.user.sex
      },
      set(sex) {
        this.$store.dispatch('setUser', { id: this.id, sex })
      },
    },
    age: {
      get() {
        return this.user.age
      },
      set(age) {
        this.$store.dispatch('setUser', { id: this.id, age })
      },
    },
    sexualOrientation: {
      get() {
        return this.user.sexualOrientation
      },
      set(sexualOrientation) {
        this.$store.dispatch('setUser', { id: this.id, sexualOrientation })
      },
    },
    ageRange: {
      get() {
        return { min: this.user.minAge || 18, max: this.user.maxAge || 80 }
      },
      set(ageRange) {
        this.$store.dispatch('setUser', {
          id: this.id,
          minAge: ageRange.min,
          maxAge: ageRange.max,
        })
      },
    },
    ageHasError() {
      return this.age < 18 || this.age > 80
    },
  },

  methods: {
    async done() {
      await this.$store.dispatch('fetchMe')
      this.$router.replace(`/user/${this.$store.state.me}/profile`)
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

.footer
  margin 50px 0

.age
  max-width 120px
  margin-left auto
  margin-right auto
</style>
