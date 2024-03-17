<template>
  <v-app id="inspire">
    <v-main class="bg-grey-lighten-3">
      <router-view />
    </v-main>
  </v-app>
</template>

<script setup>
// 添加获取用户信息逻辑，每次刷新要重新获取
import { inject } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/store'

const router = useRouter()
const userStore = useUserStore()
const $axios = inject('$axios')

const userInfo = localStorage.getItem('userInfo')
if (userInfo) {
  const parsedUserInfo = JSON.parse(userInfo)
  $axios.get('/api/v1/user', { params: { username: parsedUserInfo.username } }).then((res) => {
    userStore.setUserInfo(res.user)
  }).catch(err => {
    console.log(err)
    router.push('/login')
  })
} else {
  router.push('/login')
}

</script>
