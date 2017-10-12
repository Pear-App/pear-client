<template>
  <!-- Don't drop "q-app" class -->
  <div id="q-app">
    <router-view />
  </div>
</template>

<script>
/*
 * Root component
 */
export default {}
</script>

<style lang="stylus">
.is-centered
  position absolute
  top 50%
  left 50%
  transform translateX(-50%) translateY(-50%)
</style>
