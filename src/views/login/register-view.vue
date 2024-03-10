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
        :rules="[requiredRule]"
        density="compact"
        required
        placeholder="请输入您的用户名"
        prepend-inner-icon="mdi-account"
        variant="outlined"
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
        :rules="[requiredRule]"
        :append-inner-icon="visible ? 'mdi-eye-off' : 'mdi-eye'"
        :type="visible ? 'text' : 'password'"
        density="compact"
        placeholder="请输入密码"
        prepend-inner-icon="mdi-lock-outline"
        variant="outlined"
        required
        @click:append-inner="visible = !visible"
      />

      <v-btn
        block
        class="mb-8"
        color="blue"
        size="large"
        variant="tonal"
        @click="register"
      >
        注册
      </v-btn>

      <v-card-text class="text-center">
        <span
          class="text-blue text-decoration-none cursor-pointer"
          @click="$router.push('/login')"
        >
          已有账号？现在登陆 <v-icon icon="mdi-chevron-right" />
        </span>
      </v-card-text>
    </v-card>
    <v-snackbar
      v-model="showSnackbar"
      :timeout="3000"
      :color="color"
      location="top"
    >
      {{ message }}
    </v-snackbar>
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
const register = () => {
  const params = {
    username: username.value,
    password: password.value
  }
  $axios.post('/api/v1/user/register', params).then(res => {
    message.value = res.message
    showSnackbar.value = true
    setTimeout(() => {
      showSnackbar.value = false
      router.push('/login')
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
