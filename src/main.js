import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import '@/vant/index'
import 'amfe-flexible'
import 'vant/lib/index.less'
import '@/styles/reset.less'

Vue.config.productionTip = false

new Vue({
  beforeCreate () {
    Vue.prototype.$bus = this
  },
  router,
  store,
  render: h => h(App)
}).$mount('#app')
