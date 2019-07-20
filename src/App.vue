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
    <Nav></Nav>
    <Content></Content>
  </div>
</template>
<script>
import Header from './components/header/header.vue'
import Nav from './components/nav/nav.vue'
import Content from './components/content/content.vue'
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
        console.log(this.seller);
      }
    })
  },
  components:{
    Header,
    Nav,
    Content
  }
}
</script>

<style lang="less" scoped>
  #app {
    .navbar {
      width: 100%;
      height: 40px;
      display: flex;
      align-items: center;
      border-bottom: 1px solid red;
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
