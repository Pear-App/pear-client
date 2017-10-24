<template>
  <router-view :id="id" />
</template>

<script>
export default {
  name: 'user-index',

  props: ['id'],
}
</script>

<style lang="stylus">
</style>
