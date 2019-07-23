<template>
  <div id="app">
    <Header :seller="seller"></Header>
    <nav class="navbar">
      <!-- 商品 -->
      <router-link class="product" to="/goods" tag='div'>商品</router-link>
      <!-- 评价 -->
      <router-link class="evaluate" to="/ratings" tag='div'>评价</router-link>
      <!-- 商家 -->
      <router-link class="merchant" to="/shops" tag='div'>商家</router-link>
    </nav>
    <router-view :seller="seller"></router-view>
  </div>
</template>
<script>
import Header from './components/header/header.vue'

const ERR_OK = 0;

export default {
  data(){
    return {
      seller: {},
      goodsInfo: {}
    }
  },
  created() {
    this.$http.get('/api/seller').then((res) => {
      res = res.body;
      if (res.errno === ERR_OK) {
        this.seller = res.data;
        // console.log(this.seller);
      }
    })
    let info = localStorage.getItem('goodsInfo');
    if(info) {
      this.$store.commit('storeInit', JSON.parse(info));
    }
  },
  components:{
    Header
  }
}
</script>

<style lang="less" scoped>
  #app {
    .navbar {
      width: 100%;
      height: 40px;
      background-color: #fff;
      display: flex;
      align-items: center;
      border-bottom: 1px solid rgba(7,17,27,0.1);
      position: relative;
      div {
        flex: 1;
        line-height: 14px;
        text-align: center;
        font-size: 14px;
        color: rgb(77,85,93);
        &.active {
          color: rgb(240, 20, 20)
        }
      }
    }
  }
</style>
