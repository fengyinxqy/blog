<template>
  <v-menu
    min-width="200px"
    rounded
  >
    <template #activator="{ props }">
      <v-btn
        class="123"
        icon
        v-bind="props"
      >
        <v-avatar
          color="grey-darken-1"
          size="45"
        >
          <v-img
            :src="avatar"
            alt="John"
          />
        </v-avatar>
      </v-btn>
    </template>
    <v-card>
      <v-card-text>
        <div
          class="mx-auto text-center"
        >
          <v-avatar
            color="brown"
          >
            <v-img
              :src="avatar"
              alt="avatar"
            />
          </v-avatar>
          <h3>{{ user.fullName||'xiaoming' }}</h3>
          <p class="text-caption mt-1">
            {{ user.email||'123456789@qq.com' }}
          </p>
          <v-divider class="my-3" />
          <div v-if="hasUserInfo">
            <v-btn
              rounded
              variant="text"
            >
              编辑账户
            </v-btn>
            <v-divider class="my-3" />
            <v-btn
              rounded
              variant="text"
            >
              退出登录
            </v-btn>
          </div>
          <div v-else>
            <v-btn
              rounded
              variant="text"
              @click="$router.push('/login')"
            >
              去登录
            </v-btn>
            <v-divider class="my-3" />
            <v-btn
              rounded
              variant="text"
              @click="$router.push('/register')"
            >
              去注册
            </v-btn>
          </div>
        </div>
      </v-card-text>
    </v-card>
  </v-menu>
</template>

<script setup>
import avatar from '@/assets/img/avatar.jpg'
const user = {
  fullName: '',
  email: ''
}

const userInfo = {

}

const hasUserInfo = Object.keys(userInfo).length > 0
</script>
