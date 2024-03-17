<template>
  <v-app id="inspire">
    <Header />
    <v-main class="bg-grey-lighten-3">
      <v-container>
        <v-row>
          <LeftCard />
          <v-col>
            <router-view />
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script setup>
import Header from '@/components/header-area.vue'
import LeftCard from '@/components/home-left-card.vue'

</script>
