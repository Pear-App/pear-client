<template>
  <q-card>
    <q-card-main>
      <q-item multiline>
        <q-item-side>
          <q-item-tile avatar>
            <img :src="`https://graph.facebook.com/${otherPerson.facebookId}/picture?type=large`" />
          </q-item-tile>
        </q-item-side>
        <q-item-main
         :label="otherPerson.facebookName"
         label-lines="1"
        />
        <q-item-side right stamp="" />
      </q-item>
    </q-card-main>
  </q-card>
</template>

<script>
export default {
  props: ['otherPerson'],
  computed: {},
}
</script>

<style>
</style>