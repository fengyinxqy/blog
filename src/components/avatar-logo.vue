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
                >
                  退出登录
                </v-btn>
              </template>

              <template #default="{ isActive }">
                <v-card title="编辑账户">
                  <v-card-text>
                    <div class="text-subtitle-1 text-medium-emphasis">
                      用户名
                    </div>

                    <v-text-field
                      density="compact"
                      placeholder="Email address"
                      prepend-inner-icon="mdi-email-outline"
                      variant="outlined"
                    />
                    <div class="text-subtitle-1 text-medium-emphasis">
                      旧密码
                    </div>

                    <v-text-field
                      density="compact"
                      placeholder="Email address"
                      prepend-inner-icon="mdi-email-outline"
                      variant="outlined"
                    />
                    <div class="text-subtitle-1 text-medium-emphasis">
                      新密码
                    </div>

                    <v-text-field
                      density="compact"
                      placeholder="Email address"
                      prepend-inner-icon="mdi-email-outline"
                      variant="outlined"
                    />
                    <div class="text-subtitle-1 text-medium-emphasis">
                      头像
                    </div>

                    <v-text-field
                      density="compact"
                      placeholder="Email address"
                      prepend-inner-icon="mdi-email-outline"
                      variant="outlined"
                    />
                  </v-card-text>

                  <v-card-actions>
                    <v-spacer />

                    <v-btn
                      text="确认修改"
                      @click="isActive.value = false"
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
  </v-menu>
</template>

<script setup>
import avatar from '@/assets/img/avatar.jpg'
import { useUserStore } from '@/store'

const userStore = useUserStore()
const user = userStore.userInfo
const isLogin = userStore.isLogin
</script>
