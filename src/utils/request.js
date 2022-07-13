import axios from 'axios'
import store from '@/store'
const instance = axios.create({
  baseURL: 'http://liufusong.top:8080/'
})
export default instance

// 请求拦截器
instance.interceptors.request.use(function (config) {
  // 请求发起会经过这里
  // config：本次请求的请求配置对象
  if (store.state.token) {
    config.headers.authorization = store.state.token
  }

  // 注意：这里务必要返回 config 配置对象，否则请求就停在这里出不去了
  return config
}, function (error) {
  // 如果请求出错了（还没有发出去）会进入这里
  return Promise.reject(error)
})
