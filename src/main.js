import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// 导入 normalize.css 和 fontStyle.css
import './assets/css/normalize.css'
import './assets/css/fontStyle.css'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
