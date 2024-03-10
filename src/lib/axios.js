import axios from 'axios'
import Cookie from 'js-cookie'

axios.defaults.withCredentials = true

const token = Cookie.get('token')

const service = axios.create({
  baseURL: '',
  timeout: 5000,
  headers: {
    Authorization: 'Bearer ' + token
  }
})

// 请求拦截
service.interceptors.request.use(
  config => {
    return config
  },
  error => {
    // 对请求错误做些什么
    return Promise.reject(error)
  }
)

// 响应拦截
service.interceptors.response.use(
  response => {
    return response.data
  },
  error => {
    // 对响应错误做点什么
    if (error.response.status === 401) {
      // 例如，如果响应状态码为401，跳转到登录页面
      window.location.href = '/login'
    }
    return Promise.reject(error.response.data)
  }
)

const axiosPlugin = {
  install: (app) => {
    app.config.globalProperties.$axios = service
  }
}

export default axiosPlugin
