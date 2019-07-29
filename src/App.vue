<template>
  <div id="app">
    <Header :seller="seller"></Header>
    <nav class="navbar">
      <!-- 商品 -->
      <div @click="addFooter">
        <router-link class="product" to="/goods" tag='div'>商品</router-link>
      </div>
      
      <!-- 评价 -->
      <div @click="delFooter">
        <router-link class="evaluate" to="/ratings" tag='div'>评价</router-link>
      </div>
      
      <!-- 商家 -->
      <div @click="delFooter">
        <router-link class="merchant" to="/shops" tag='div'>商家</router-link>
      </div>
      
    </nav>
    <!-- 路由跳转组件 -->
    <router-view :seller="seller"></router-view>

    <transition>
      <Detailcar v-if='show'></Detailcar>
    </transition>
    <Footer :seller="seller" v-show="flag" @showDetailcar="showDetailcar"></Footer>
  </div>
</template>
<script>
import Header from './components/header/header.vue'
import Footer from './components/footer/footer.vue'
import Detailcar from './components/detailCar/detailCar.vue'

const ERR_OK = 0;

export default {
  data(){
    return {
      flag: true,
      show: false,
    }
  },
  computed: {
    seller () {
      return this.$store.state.seller;
    }
  },
  created() {
    this.$store.dispatch('initSeller')
  },
  methods: {
    reload () {
      this.show = false;
      this.$nextTick(() => {
        this.show = true
      })
    },
    delFooter () {
      this.flag = false;
    },
    addFooter () {
      this.flag = true;
    },
    showDetailcar () {
      this.show = !this.show;
      if (this.show) {
        this.$store.state.reloade = false;
        this.$store.state.view = false;
      } else {
        this.$store.state.reloade = true;
        this.$store.state.view = true;
      }
    }
  },
  components:{
    Header,
    Footer,
    Detailcar
  }
}
</script>

<style lang="less" scoped>
  #app {
    .v-enter,.v-leave-to {
      transform: translateY(100%);
    }
    .v-enter-active,.v-leave-active {
      transition: all 0.5s;
    }
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
        line-height: 40px;
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
