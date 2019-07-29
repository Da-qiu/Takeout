<template>
  <div class="footer">
    <div class="left">
      <div class="car">
        <div class="logo">
          <span class="icon icon-shopping_cart" :class='{active: totalNumber}' @click="showCar"></span>
          <span class="count" v-show='totalNumber'>{{totalNumber}}</span>
        </div>
        <span class="totalPrices" :class='{active: totalNumber}'>￥{{totalPrice}}</span>
      </div>
      <span class="info">另需配送费￥{{seller.deliveryPrice}}元</span>
    </div>
    <div class="right">
      <span class="startPrice" v-if='totalPrice<20'>￥{{seller.minPrice}}起送</span>
      <span class="pay" v-else>结算</span>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      totalPrice: 0
    }
  },
  props: {
    seller: {
      type: Object
    }
  },
  methods: {
    showCar () {
      this.$emit("showDetailcar");
    }
  },
  computed: {
    totalNumber () {
      return this.$store.state.totalNumber;
    }
  },
  watch: {
    totalNumber () {
      this.$store.commit('getTotalPrice');
      this.totalPrice = this.$store.state.totalPrice;
    }
  },
  created () {
    this.totalPrice = this.$store.state.totalPrice;
  }
}
</script>
<style lang="less" scoped>
  .footer {
    width: 100%;
    height: 46px;
    background-color: #141d27;
    position: fixed;
    z-index: 999;
    bottom: 0;
    left: 0;
    display: flex;
    .left {
      flex: 1;
      .car {
        display: inline-block;
        .logo {
          display: inline-block;
          width: 58px;
          height: 58px;
          margin: 0 12px;
          position: relative;
          left: 0;
          top: -10px;
          background-color: #141d27;
          border-radius: 50%;
          .icon {
            display: block;
            width: 44px;
            height: 44px;
            border-radius: 50%;
            background-color: #2B343C;
            font-size: 24px;
            color: rgba(255,255,255,0.4);
            line-height: 44px;
            position: absolute;
            top: 6px;
            left: 6px;
            text-align: center;
            &.active {
              color: #fff;
              background-color: rgb(0,160,220);
            }
          }
          .count {
            width: 24px;
            height: 16px;
            position: absolute;
            top: 0;
            right: 0;
            font-size: 9px;
            font-weight: 700;
            color: #fff;
            line-height: 16px;
            background-color: rgb(240,20,20);
            border-radius: 8px;
            text-align: center;
          }
        }
        .totalPrices {
          display:inline-block;
          font-size: 16px;
          color: rgba(255,255,255,0.4);
          font-weight: 700;
          line-height: 24px;
          vertical-align: top;
          margin-top: 12px;
          padding-right: 12px;
          border-right: 1px solid rgba(255,255,255,0.1);
          &.active {
            color: #fff;
          }
        }
      }
      .info {
        display: inline-block;
        font-size: 12px;
        color: rgba(255,255,255,0.4);
        font-weight: 700;
        line-height: 24px;
        vertical-align: top;
        margin-left: 12px;
        margin-top: 12px;
      }
    }
    .right {
      flex: 0 0 105px;
      width: 105px;
      span {
        height: 100%;
        display: block;
        padding-top: 12px;
        text-align: center;
        font-size: 16px;
        font-weight: 700;
        line-height: 24px;
      }
      .startPrice {
        background-color: #2B333B;
        color: rgba(255,255,255,0.4);
      }
      .pay {
        background-color: green;
        color: #fff;
      }
    }
  }
</style>
