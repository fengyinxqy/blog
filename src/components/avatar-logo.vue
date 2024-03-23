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
          <h3>{{ user.username||'xiaoming' }}</h3>
          <!-- <p class="text-caption mt-1">
            {{ user.email||'123456789@qq.com' }}
          </p> -->
          <v-divider class="my-3" />
          <div v-if="isLogin">
            <v-dialog max-width="500">
              <template #activator="{ props: activatorProps }">
                <v-btn
                  v-bind="activatorProps"
                  text="编辑账户"
                  variant="flat"
                />
                <v-divider class="my-3" />
                <v-btn
                  rounded
                  variant="text"
                  @click="logout"
                >
                  退出登录
                </v-btn>
              </template>

              <template #default>
                <v-card
                  title="编辑账户"
                  @click="isActive = true"
                >
                  <v-card-text>
                    <div class="text-subtitle-1 text-medium-emphasis">
                      用户名
                    </div>

                    <v-text-field
                      :value="user.username"
                      disabled
                      density="compact"
                      placeholder="Email address"
                      prepend-inner-icon="mdi-email-outline"
                      variant="outlined"
                    />
                    <div class="text-subtitle-1 text-medium-emphasis">
                      旧密码
                    </div>

                    <v-text-field
                      v-model="form.oldPassword"
                      density="compact"
                      placeholder="请输入旧的密码"
                      prepend-inner-icon="mdi-email-outline"
                      variant="outlined"
                    />
                    <div class="text-subtitle-1 text-medium-emphasis">
                      新密码
                    </div>

                    <v-text-field
                      v-model="form.newPassword"
                      density="compact"
                      placeholder="请输入新的密码"
                      prepend-inner-icon="mdi-email-outline"
                      variant="outlined"
                    />
                    <div class="text-subtitle-1 text-medium-emphasis">
                      头像
                    </div>

                    <v-file-input
                      v-model="form.avatar"
                      :rules="rules"
                      accept="image/png, image/jpeg, image/bmp"
                      label="Avatar"
                      placeholder="Pick an avatar"
                      prepend-icon="mdi-camera"
                    />
                  </v-card-text>

                  <v-card-actions>
                    <v-spacer />

                    <v-btn
                      text="确认修改"
                      @click="confirmChange"
                    />
                  </v-card-actions>
                </v-card>
              </template>
            </v-dialog>
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
    <v-snackbar
      v-model="showSnackbar"
      :timeout="3000"
      :color="color"
      location="top"
    >
      {{ message }}
    </v-snackbar>
  </v-menu>
</template>

<script setup>
import defaultAvatar from '@/assets/img/avatar.jpg'
import router from '@/router'
import { useUserStore } from '@/store'
import { inject, ref } from 'vue'

const $axios = inject('$axios')
const userStore = useUserStore()
const user = userStore.userInfo
const isLogin = userStore.isLogin
const isActive = ref(false)
const showSnackbar = ref(false)
const color = ref('success')
const avatar = user.avatar || defaultAvatar
const message = ref('')

const form = ref({
  username: user.username,
  oldPassword: '',
  newPassword: '',
  avatar: null
})

const rules = [
  value => {
    return !value || !value.length || value[0].size < 2000000 || '头像大小不能超过2MB'
  }
]

const confirmChange = () => {
  const formData = new FormData()
  const { username, oldPassword, newPassword, avatar } = form.value
  formData.append('username', username)
  if (oldPassword && newPassword) {
    formData.append('oldPassword', oldPassword)
    formData.append('newPassword', newPassword)
  }
  if (avatar.length) {
    formData.append('avatar', avatar[0])
  }
  $axios.post('/api/v1/user', formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  }).then((res) => {
    message.value = res.message
    showSnackbar.value = true
    isActive.value = false
  }).catch(err => {
    message.value = err.message
    showSnackbar.value = true
    color.value = 'error'
  })
}

const logout = () => {
  $axios.post('/api/v1/user/logout', { username: user.username }).then(res => {
    router.push('/login')
  })
}
</script>
