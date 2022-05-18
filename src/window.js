/**
 * 挂载全局方法
 */

import Vue from 'vue'

// 样式初始化
import '@/assets/css/reset.css'
import '@/assets/css/minx.less'

// 引入字体图标
import '@/assets/iconfont/iconfont.css'
import '@/assets/iconfont/iconfont.js'

/* 引入elementUI */
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
Vue.use(ElementUI)

/* 引入Vant */
import Vant from 'vant'
import 'vant/lib/index.css'
Vue.use(Vant)
