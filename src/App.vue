<template>
  <div id="app">
    <Header :seller="seller"></Header>
    <nav class="navbar">
      <!-- 商品 -->
      <div class="product active">商品</div>
      <!-- 评价 -->
      <div class="evaluate">评价</div>
      <!-- 商家 -->
      <div class="merchant">商家</div>
    </nav>
    <Goods></Goods>
    <Footer></Footer>
  </div>
</template>
<script>
import Header from './components/header/header.vue'
import Goods from './components/goods/goods.vue'
import Footer from './components/footer/footer.vue'

const ERR_OK = 0;

export default {
  data(){
    return {
      seller: {}
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
  },
  components:{
    Header,
    Goods,
    Footer
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
