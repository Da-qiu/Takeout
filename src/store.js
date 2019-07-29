import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    seller: {},
    foods: [],
    goods: [],
    totalNumber: 0,
    totalPrice: 0,
    reloade: true,
    view: true,
    change: false,
    setIndex: []
  },
  mutations: {
    addSeller (state, data) {
      state.seller = data
    },
    addGoods (state, data) {
      state.goods = data
    },
    reduceFood (state, food) {
      if (state.foods.length === 0) {
        return
      }
      let foodIndex = state.foods.findIndex((el) => {
        return el.name === food.name
      })
      if (foodIndex !== -1) {
        if (state.foods[foodIndex].count === 1) {
          state.foods.splice(foodIndex, 1)
          state.totalNumber--
        } else {
          state.foods[foodIndex].count--
          state.totalNumber--
        }
      }
    },
    addFood (state, food) {
      if (state.foods.length === 0) {
        food.count = 1
        state.totalNumber++
        state.foods.push(food)
        return
      }
      let foodIndex = state.foods.findIndex((el) => {
        return el.name === food.name
      })
      if (foodIndex === -1) {
        food.count = 1
        state.totalNumber++
        state.foods.push(food)
      } else {
        state.foods[foodIndex].count++
        state.totalNumber++
      }
    },
    clearFood (state) {
      state.totalNumber = 0
      for (let i = state.foods.length - 1; i >= 0; i--) {
        state.foods.pop()
      }
    },
    getTotalPrice (state) {
      if (state.foods.length) {
        let total = 0
        for (var i = 0; i < state.foods.length; i++) {
          var price = state.foods[i].price
          var count = state.foods[i].count
          total += price * count
        }
        state.totalPrice = total
      } else {
        state.totalPrice = 0
      }
    },
    getCount (state, getcount) {
      if (state.foods.length === 0) {
        getcount.fun(0)
      }
      let food = state.foods.find((el) => {
        return el.name === getcount.name
      })
      if (food) {
        getcount.fun(food.count)
      } else {
        getcount.fun(0)
      }
    }
  },
  actions: {
    initSeller ({ commit }) {
      Vue.http.get('/api/seller').then((res) => {
        res = res.body
        if (res.errno === 0) {
          commit('addSeller', res.data)
        }
      })
    }
  }
})
