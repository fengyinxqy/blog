<template>
  <v-app-bar flat>
    <v-container class="mx-auto d-flex align-center justify-center">
      <AvatarLogo />
      <div class="ml-5">
        <v-btn
          v-for="item in links"
          :key="item.link"
          :text="item.title"
          variant="text"
          class="text-body-1"
          :color="setNavColor(item.link)"
          :class="setNavColor(item.link)"
          @click="handleRouter(item.link)"
        />
      </div>

      <v-spacer />
    </v-container>
  </v-app-bar>
</template>

<script setup>
import AvatarLogo from './avatar-logo.vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const links = [
  {
    title: '首页',
    link: '/timeline'
  },
  {
    title: '文章',
    link: '/article'
  },
  {
    title: '分类',
    link: '/'
  },
  {
    title: '更新记录',
    link: '/'
  }
]
const handleRouter = (link) => {
  // 跳转到对应路由
  router.push(link)
}

const setNavColor = (link) => {
  return router.currentRoute.value.path === link ? 'primary' : ''
}

</script>

<style lang="scss" scoped>
.primary{
  font-weight: 700;
  background-color: #eee;
}
</style>
