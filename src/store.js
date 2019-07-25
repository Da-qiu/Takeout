import Vue from 'vue'
import Vuex from 'vuex'
import VueResource from 'vue-resource'

Vue.use(VueResource)
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    foods: {}
  },
  mutations: {
    storeInit (state, info) {
      state.foods = info
    },
    getInfo (state) {
      return state.foods
    }
  },
  actions: {

  }
})
