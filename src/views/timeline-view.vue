<template>
  <v-timeline align="start">
    <v-timeline-item
      v-for="(item, i) in items"
      :key="i"
      :dot-color="item.color"
      :icon="item.icon"
      fill-dot
    >
      <v-card>
        <v-card-title :class="['text-h6', `bg-${item.color}`]">
          {{ item.title }}
        </v-card-title>
        <v-card-text class="bg-white text--primary">
          <p class="timeline-content">
            {{ item.content }}
          </p>
        </v-card-text>
      </v-card>
    </v-timeline-item>
  </v-timeline>
</template>

<script setup>
const items = [
  {
    title: '创建网站',
    content: '今天是2024年2月24日，创建了第一行代码',
    color: 'red-lighten-2',
    icon: 'mdi-star'
  },
  {
    title: '实现登录注册功能',
    content: '今天是2024年3月17日，实现登录注册功能',
    color: 'purple-lighten-2',
    icon: 'mdi-book-variant'
  }
]
</script>

<style lang="scss" scoped>
.timeline-content{
  padding: 10px 0;
  font-size: 14px;
}
</style>
