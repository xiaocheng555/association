import Vue from 'vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui'
import '@/assets/theme/index.css'
import App from '@pages/app'
// import './assets/styles/variable.less'
require('./assets/styles/variable.less')

Vue.config.productionTip = false

// 引入ElementUI
Vue.use(ElementUI)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
