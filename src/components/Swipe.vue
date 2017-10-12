<template>
  <!-- if you want automatic padding use "layout-padding" class -->
  <div class="layout-padding justify-center is-centered">
    <vue-swing>
      <q-card class="card">
        <q-card-media>
          <img src="~assets/quasar-logo-full.svg">
        </q-card-media>
        <q-card-title>
          Card Title
        </q-card-title>
        <q-card-separator />
        <q-card-main>
          Card Content
        </q-card-main>
        <q-card-actions align="around">
          <q-btn flat round small color="red"><q-icon name="favorite" /></q-btn>
          <q-btn flat round small color="faded"><q-icon name="bookmark" /></q-btn>
          <q-btn flat round small color="primary"><q-icon name="share" /></q-btn>
        </q-card-actions>
      </q-card>
    </vue-swing>
  </div>
</template>

<script>
import {
  QBtn,
  QCard,
  QCardActions,
  QCardMedia,
  QCardTitle,
  QCardSeparator,
  QCardMain,
  QIcon
} from 'quasar'
import VueSwing from 'vue-swing'

export default {
  components: {
    QBtn,
    QCard,
    QCardActions,
    QCardMedia,
    QCardTitle,
    QCardSeparator,
    QCardMain,
    QIcon,
    VueSwing
  },

  data () {
    return {}
  }
}
</script>

<style lang="stylus" scoped>
.card
  max-width 400px
</style>
