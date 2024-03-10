<template>
  <div class="login">
    <v-img
      class="mx-auto my-6"
      max-width="228"
      src="https://cdn.vuetifyjs.com/docs/images/logos/vuetify-logo-v3-slim-text-light.svg"
    />

    <v-card
      class="mx-auto pa-12 pb-8"
      elevation="8"
      min-width="448"
      rounded="lg"
    >
      <div class="text-subtitle-1 text-medium-emphasis">
        Username
      </div>

      <v-text-field
        v-model="username"
        density="compact"
        placeholder="请输入您的用户名"
        prepend-inner-icon="mdi-account"
        variant="outlined"
        :rules="[requiredRule]"
      />

      <div class="text-subtitle-1 text-medium-emphasis d-flex align-center justify-space-between">
        Password

        <a
          class="text-caption text-decoration-none text-blue"
          href="#"
          rel="noopener noreferrer"
          target="_blank"
        >
          忘记登录密码？
        </a>
      </div>

      <v-text-field
        v-model="password"
        :append-inner-icon="visible ? 'mdi-eye-off' : 'mdi-eye'"
        :type="visible ? 'text' : 'password'"
        density="compact"
        placeholder="请输入密码"
        :rules="[requiredRule]"
        prepend-inner-icon="mdi-lock-outline"
        variant="outlined"
        @click:append-inner="visible = !visible"
      />

      <v-btn
        block
        class="mb-8"
        color="blue"
        size="large"
        variant="tonal"
        @click="login"
      >
        登陆
      </v-btn>

      <v-card-text class="text-center">
        <span
          class="text-blue text-decoration-none cursor-pointer"
          @click="$router.push('/register')"
        >
          还没有账号？现在注册 <v-icon icon="mdi-chevron-right" />
        </span>
      </v-card-text>
    </v-card>
  </div>
</template>
<script setup>
import { inject, ref } from 'vue'
import { useRouter } from 'vue-router'
const $axios = inject('$axios')
const router = useRouter()

const visible = ref(false)
const showSnackbar = ref(false)
const username = ref('')
const password = ref('')
const message = ref('')
const color = ref('success')
const requiredRule = v => !!v || '此项为必填项'
const login = () => {
  const params = {
    username: username.value,
    password: password.value
  }
  $axios.post('/api/v1/user/login', params).then(res => {
    message.value = res.message
    showSnackbar.value = true
    setTimeout(() => {
      showSnackbar.value = false
      router.push('/')
    }, 2000)
  }).catch((err) => {
    message.value = err.message
    color.value = 'error'
    console.log(err)
  })
}
</script>

<style lang="scss" scoped>
.login{
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
</style>
