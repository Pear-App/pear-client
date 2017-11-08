<template>
  <q-layout ref="layout" view="lHr LpR lfr">

    <q-toolbar slot="header" class="text-black bg-white">
      <q-toolbar-title>
        <img class="banner" src="~assets/banner.png" width="86" height="40">
      </q-toolbar-title>
    </q-toolbar>

    <q-carousel arrows dots>
      <div slot="slide" class="slide">
        <div class="tutorial bg-secondary">
          <p class="title">For Matchmakers,</p>
          <img class="image" src="~assets/tutorial-1.png" width="154" height="204">
          <p class="subtitle">Curate potential dates for your BFFs/Bros</p>
          <p class="content">Play cupid for your single and eligible friends!</p>
        </div>
      </div>

      <div slot="slide" class="slide">
        <div class="tutorial bg-secondary">
          <p class="title">For Daters,</p>
          <img class="image" src="~assets/tutorial-2.png" width="154" height="204">
          <p class="subtitle">Find partners recommended by your best friends</p>
          <p class="content">Sometimes, the best matches come from people who know you best.</p>
        </div>
      </div>

      <div slot="slide" class="slide">
        <div class="tutorial bg-secondary">
          <img class="image" src="~assets/tutorial-3.png" width="154" height="204">
          <p class="subtitle">Have friends that should not be single?</p>
          <p class="content">Swipe right to pear them up now!</p>
          <q-btn class="finish-tutorial" color="tertiary" @click="finish">Let's go!</q-btn>
        </div>
      </div>

    </q-carousel>

  </q-layout>

</template>

<script>
import { mapState } from 'vuex'

export default {
  data() {
    return {
      index: 0,
    }
  },

  computed: mapState(['me']),

  methods: {
    finish() {
      this.$store.commit('finishedTutorial')
    },
  },
}
</script>

<style lang="stylus">
.q-carousel-right-button i
.q-carousel-left-button i
  background transparent

.q-carousel-dots
  color #CBD57F
</style>

<style lang="stylus" scoped>
@import '../themes/app.variables'

.slide

  .tutorial
    padding 1.5em 1.5em
    border-radius 20px
    text-align center
    color $tertiary
    height 100%

    .title
      font-weight 500

    .image
      display block
      margin 1.5em auto
      max-width 30vw
      height auto

    .subtitle
      font-weight 500
      font-size 1.2em
    
    .finish-tutorial
      font-size 1.5em
      padding 0.5em 1em
</style>
