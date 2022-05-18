import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'


Vue.config.productionTip = false

// 若是没有开启Devtools工具，在开发环境中开启，在生产环境中关闭
Vue.config.devtools = process.env.NODE_ENV === 'development';

// 引入全局配置
import './window'

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
