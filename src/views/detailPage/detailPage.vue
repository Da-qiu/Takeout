<template>
  <div class="detail-page">
    <div class="picture">
      <img :src="food.image" alt="商品大图" width='100%'>
    </div>
    <!-- 返回按钮 -->
    <span class="fanhui icon-arrow_lift" @click="goback"></span>

    <div class="head">
      <div class="title">{{food.name}}</div>
      <div class="text">
        <span class="sellCount">月售{{food.sellCount}}份</span>
        <span class="rating">好评率{{food.rating}}%</span>
      </div>
      <div class="price">
        <span class="now">￥{{food.price}}</span>
        <span class="old">￥{{food.oldPrice}}</span>
      </div>
      <div class="add-car" @click='addCar($event)' v-if='!show'>加入购物车</div>
      <!-- 控件组件 --> 
      <Carcontrols class='controls' v-else @toggle='toggle' :animateover='animateover'
      :foodName='food.name' :foodPrice='food.price' @reduce='reduce' @add="add"></Carcontrols>
      
    </div>
    <!-- 分割条 -->
    <div class="split"></div>

    <!-- 商品介绍 -->
    <div class="introduce">
      <h3 class="title">商品介绍</h3>
      <p class="text">{{food.info}}</p>
    </div>

    <!-- 商家分割条 -->
    <div class="split"></div>

    <!-- 商品评价 -->
    <div class="comment">
      <h3 class="title">商品评价</h3>
      <UserComment :ratings="food.ratings" :rateTime="rateTime"></UserComment>
    </div>
    <!-- 购物车小球 --> 
    <transition @beforeEnter='beforeEnter' @enter='enter' @afterEnter='afterEnter' @afterLeave='afterLeave'>
      <div class="ball" v-show="ballFlag" ref='ball'></div>
    </transition>
  </div>
</template>
<script>
import UserComment from '../../components/userComment/userComment.vue'
import Carcontrols from '../../components/carcontrols/carcontrols.vue'
import { setInterval, clearInterval } from 'timers';

export default {
  data () {
    return {
      ballFlag: false,
      animateover: true,
      food: {},
      goods: [],
      rateTime: [],
      count: 0,
      i: 0,
      index: 0
    }
  },
  computed: {
    show () {
      if (this.count && this.$store.state.view) {
        return true;
      } else {
        return false;
      }
    },
    change () {
      return this.$store.state.change
    }
  },
  watch: {
    change () {
      let that = this;
      function fn (num) {
        that.count = num;
      }
      this.$store.commit('getCount', {name: this.food.name, fun: fn});
    }
  },
  methods: {
    goback () {
      history.back();
    },
    addCar (e) {
      this.$store.commit('addFood', this.food);
      let that = this;
      function fn (num) {
        that.count = num;
      }
      this.$store.commit('getCount', {name: this.food.name, fun: fn});

      let x = e.target.getBoundingClientRect().left + 10
      let y = e.target.getBoundingClientRect().top - 10
      let pos = [x, y];
      this.toggle(pos);
    },
    add() {
      let that = this;
      function fn (num) {
        that.count = num;
      }
      this.$store.commit('getCount', {name: this.food.name, fun: fn});
    },
    reduce () {
      let that = this;
      function fn (num) {
        that.count = num;
      }
      this.$store.commit('getCount', {name: this.food.name, fun: fn});
    },
    toggle (e) {
      if (this.animateover) {
        this.animateover = false;
        this.ballFlag = true;
        this.ballPosition = e
        this.$refs.ball.style.left = e[0]+'px';
        this.$refs.ball.style.top = e[1]-16 + 'px';
      }
    },
    beforeEnter (el) {
      el.style.transform = 'translate(0, 0)';
    },
    enter (el,done) {
      let x = el.getBoundingClientRect().left;
      let y = el.getBoundingClientRect().top;
      let h = window.innerHeight;
      let a = x - 30;
      let b = h - y - 50;
      this.$nextTick(() => {
        el.style.transform = `translate(-${a}px, ${b}px)`;
        el.style.transition = 'all 0.6s cubic-bezier(.42,-0.19,.64,.47)';
      })
      done() 
    },
    afterEnter (el) {
      this.ballFlag = false;
      el.style.transform = 'translate(0, 0)';
    },
    afterLeave (el) {
      this.animateover = true;
    }
  },
  created () {
    if (sessionStorage.getItem("goods") && sessionStorage.getItem("index")) {
      this.$store.state.goods = JSON.parse(sessionStorage.getItem('goods'))
      this.$store.state.setIndex = JSON.parse(sessionStorage.getItem('index'))
    }
    window.addEventListener('beforeunload', () => {
      sessionStorage.setItem('goods', JSON.stringify(this.$store.state.goods))
      sessionStorage.setItem('index', JSON.stringify(this.$store.state.setIndex))
    })
    this.i = this.$store.state.setIndex[0];
    this.index = this.$store.state.setIndex[1];
    let that = this;
    this.goods = this.$store.state.goods;
    this.food = this.goods[this.i].foods[this.index];
    this.$store.commit('getCount', {name: this.food.name, fun: fn});
    let ratings = this.food.ratings;
    for (let i=0; i < ratings.length; i++) {
      let time = ratings[i].rateTime;
      let date = new Date(time);
      let year = date.getFullYear();
      let month = String((date.getMonth() + 1)).padStart(2,'0');
      let day = String(date.getDate()).padStart(2,'0');
      let hours = String(date.getHours()).padStart(2,'0');
      let minutes = String(date.getMinutes()).padStart(2,'0');
      let seconds = String(date.getSeconds()).padStart(2,'0');
      let newDate = year + "-" + month + "-" + day + " " + hours + ':' + minutes + ':' + seconds;
      this.rateTime.push(newDate);
    }
    function fn (num) {
      that.count = num;
    }
  },
  components: {
    UserComment,
    Carcontrols
  }
}
</script>
<style lang="less" scoped>
  p,h3 {
    padding: 0;
    margin: 0;
  }
  .detail-page {
    position: fixed;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    overflow: auto;
    padding-bottom: 46px;
    background-color: #fff;
    &::-webkit-scrollbar {
      display: none;
    }
    .picture {
      img {
        vertical-align: top;
        border: none;
        outline: none;
      }
    }
    .fanhui {
      font-size: 20px;
      color: #fff;
      position: absolute;
      top: 20px;
      left: 20px;
    }
    .head {
      margin: 0 18px 18px 18px;
      position: relative;
      .title {
        padding-top: 18px;
        padding-bottom: 8px;
        font-size: 14px;
        font-weight: 700;
        color: rgb(7,17,27);
        line-height: 14px;
      }
      .text {
        font-size: 10px;
        color: rgb(147,153,159);
        line-height: 14px;
        margin-bottom: 18px;
        .sellCount {
          margin-right: 12px;
        }
      }
      .price {
        .now {
          font-size: 14px;
          font-weight: 700;
          color: rgb(240,20,20);
          line-height: 24px;
          margin-right: 8px;
        }
        .old {
          font-size: 10px;
          font-weight: normal;
          color: rgb(147,153,159);
          line-height: 24px;
        }  
      }
      .add-car {
        width: 74px;
        height: 24px;
        background-color: rgb(0,160,220);
        border-radius: 12px;
        color: #fff;
        font-size: 10px;
        line-height: 24px;
        text-align: center;
        position: absolute;
        right: 0;
        bottom: 0;
      }
      .controls {
        position: absolute;
        right: 0;
        bottom: 0;
      }
    }
    .split {
      width: 100%;
      height: 18px;
      border-top: 1px solid #E7E8E9;
      border-bottom: 1px solid #E7E8E9;
      background-color: #F3F5F7;
    } 
    .introduce {
      margin: 18px;
      .title {
        font-size: 14px;
        font-weight: 700;
        color: rgb(7,17,27);
        line-height: 14px;
        margin-bottom: 8px;
      }
      .text {
        padding: 0 8px;
        font-size: 12px;
        font-weight: 200;
        color: rgb(77,85,93);
        line-height: 24px;
      }
    }
    .comment {
      .title {
        font-size: 14px;
        font-weight: 700;
        color: rgb(7,17,27);
        line-height: 14px;
        margin: 18px 18px 0 18px;
      }
    }
    .ball {
      position: fixed;
      right: 0;
      top: 0;
      width: 20px;
      height: 20px;
      background-color: rgb(0,160,220);
      border-radius: 50%;
      z-index: 10000;
    }
  }
  
</style>
