<template>
  <v-sheet
    min-height="85vh"
    class=" article-container bg-grey-lighten-3"
    rounded="lg"
  >
    <v-data-iterator
      :items="displayedItems"
      :page="page"
    >
      <!-- eslint-disable-next-line vue/no-template-shadow -->
      <template #default="{ items }">
        <template
          v-for="(item, i) in items"
          :key="i"
        >
          <v-card
            class="mx-auto article-item"
            hover
          >
            <v-card-item>
              <v-card-title>
                {{ item.raw.title }}
              </v-card-title>
              <v-card-subtitle>
                {{ item.raw.subTitle }}
              </v-card-subtitle>
            </v-card-item>

            <v-card-text>
              {{ item.raw.text }}
            </v-card-text>
          </v-card>

          <br>
        </template>
      </template>
    </v-data-iterator>
    <v-pagination
      v-model="page"
      :length="Math.ceil(items.length / rowsPerPage)"
    />
  </v-sheet>
</template>

<script setup>
import { ref, computed, inject } from 'vue'
const $axios = inject('$axios')

const page = ref(1)
const rowsPerPage = ref(5)

const items = ref([])

$axios.get('/api/v1/article').then(res => {
  const result = res.data
  items.value = result.map((item) => {
    const { author, title, content } = item
    const contentHtml = document.createElement('div')
    contentHtml.innerHTML = content
    const contentText = contentHtml.innerText.slice(0, 100)
    return { title, subTitle: author, text: contentText }
  })
}).catch(err => {
  console.log(err)
})

const displayedItems = computed(() => {
  const startIndex = (page.value - 1) * rowsPerPage.value
  const endIndex = startIndex + rowsPerPage.value
  return items.value.slice(startIndex, endIndex)
})
</script>
