import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vueResource from 'vue-resource'

// 导入 normalize.css 和 fontStyle.css
import './assets/css/normalize.css'
import './assets/css/fontStyle.css'

Vue.use(vueResource)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
