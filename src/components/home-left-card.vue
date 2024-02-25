<template>
  <v-col cols="2">
    <v-sheet rounded="lg">
      <v-list rounded="lg">
        <v-list-item
          v-for="item in cardLink"
          :key="item"
          link
          :title="`${item}`"
        />

        <v-divider class="my-2" />

        <v-list-item
          color="grey-lighten-4"
          link
          title="Refresh"
        />
      </v-list>
    </v-sheet>
  </v-col>
</template>

<script setup>
const cardLink = [
  '去写一篇'
]
</script>
