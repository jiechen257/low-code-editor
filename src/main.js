import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'


Vue.config.productionTip = false

// 引入全局配置
import './window'

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
