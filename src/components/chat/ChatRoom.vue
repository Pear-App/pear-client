<template>
  <q-item :to="`/user/${id}/chat/${otherPerson.id}`" link>
    <q-item-side class="resize-avatar" :avatar="`https://graph.facebook.com/${otherPerson.facebookId}/picture?type=large`">
    </q-item-side>
    <q-item-main style="margin-left:15px">
      <q-item-tile style="font-size:4vw">
        {{otherPerson.facebookName}}
      </q-item-tile>
    </q-item-main>
    <q-item-side right>
      <q-item-tile icon="chat_bubble" color="grey" />
    </q-item-side>
  </q-item>
</template>

<script>
export default {
  props: ['id', 'otherPerson'],
  computed: {},
}
</script>

<style lang="stylus" scoped>
.resize-avatar img
  height: 50px
  width: 50px
</style>