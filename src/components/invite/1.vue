<template>
  <!-- if you want automatic padding use "layout-padding" class -->
  <div class="layout-padding" color="secondary">

    <p class="caption">My friend's name is:</p>
    <q-field :error="nicknameHasError" :count="50">
      <q-input v-model="nickname" />
    </q-field>

    <p class="caption">I refer to them by:</p>
    <q-field>
      <q-btn
        class="men full-width" big color="primary"
        :class="{ 'is-active': sex === 'M' }"
        :flat="sex !== 'M'"
        @click="sex = 'M'"
      >
        He
      </q-btn>
      <q-btn class="women full-width" big color="primary"
        :class="{ 'is-active': sex === 'F' }"
        :flat="sex !== 'F'"
        @click="sex = 'F'"
      >
        She
      </q-btn>
      <q-btn
        class="both full-width" big color="primary"
        :class="{ 'is-active': sex === 'B' }"
        :flat="sex !== 'B'"
        @click="sex = 'B'"
      >
        Depends
      </q-btn>
    </q-field>

    <p class="caption">{{ pronoun }} interested in:</p>
    <q-field>
      <q-btn class="women full-width" big color="primary"
        :class="{ 'is-active': sexualOrientation === 'F' }"
        :flat="sexualOrientation !== 'F'"
        @click="sexualOrientation = 'F'"
      >
        Men
      </q-btn>
      <q-btn
        class="men full-width" big color="primary"
        :class="{ 'is-active': sexualOrientation === 'M' }"
        :flat="sexualOrientation !== 'M'"
        @click="sexualOrientation = 'M'"
      >
        Women
      </q-btn>
      <q-btn
        class="both full-width" big color="primary"
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

    <q-btn class="pull-right" color="primary" big @click="$router.push('/invite/2')">Next</q-btn>

  </div>
</template>

<script>
export default {
  name: 'user-setup-1',

  data: () => ({ id: 'new' }),

  computed: {
    pronoun() {
      return this.sex === 'M'
        ? 'He is'
        : this.sex === 'F' ? 'She is' : 'They are'
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
    sexualOrientation: {
      get() {
        return this.$store.state.users[this.id].sexualOrientation
      },
      set(sexualOrientation) {
        this.$store.dispatch('setUser', { id: this.id, sexualOrientation })
      },
    },
    ageRange: {
      get() {
        return {
          min: this.$store.state.users[this.id].minAge,
          max: this.$store.state.users[this.id].maxAge,
        }
      },
      set(ageRange) {
        this.$store.dispatch('setUser', {
          id: this.id,
          minAge: ageRange.min,
          maxAge: ageRange.max,
        })
      },
    },
    nicknameHasError() {
      return this.nickname.length > 50
    },
  },
}
</script>

<style lang="stylus" scoped>
.q-btn
  margin 5px
  border-radius 4px
</style>
