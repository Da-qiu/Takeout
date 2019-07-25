import Vue from 'vue'
import Router from 'vue-router'
import Goods from './views/goods/goods.vue'
import Ratings from './views/ratings/ratings.vue'
import Shops from './views/shops/shops.vue'
import Detail from './views/detailPage/detailPage.vue'

Vue.use(Router)

export default new Router({
  linkActiveClass: 'active',
  routes: [
    {
      path: '/',
      name: 'home',
      redirect: '/goods'
    },
    {
      path: '/goods',
      name: 'goods',
      component: Goods
    },
    {
      path: '/ratings',
      name: 'ratings',
      component: Ratings
    },
    {
      path: '/shops',
      name: 'shops',
      component: Shops
    },
    {
      path: '/detail',
      name: 'detail',
      component: Detail
    }
  ]
})
