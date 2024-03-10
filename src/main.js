/**
 * main.js
 *
 * Bootstraps Vuetify and other plugins then mounts the App`
 */

// Plugins
import { registerPlugins } from '@/plugins'

// Components
import App from './App.vue'

import { createPinia } from 'pinia'

import { createApp } from 'vue'

import router from './router/index'

import service from '@/lib/axios'

const app = createApp(App)

// 注册 Pinia 插件
const pinia = createPinia()
app.use(pinia)
app.provide('$axios', service)

registerPlugins(app)

app.use(router)

app.mount('#app')
