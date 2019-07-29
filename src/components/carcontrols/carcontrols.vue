<template>
  <div class="carcontrols">
    <div class="choice">
      <transition>
        <span class="reduce icon-remove_circle_outline" @click="reduce" v-show="count"></span>
      </transition>
      <span class="num" v-show="count">{{count}}</span>
      <span class="add icon-add_circle" @click="add($event)"></span>
    </div>
  </div>
</template>
<script>
import { setTimeout, clearTimeout, clearInterval } from 'timers';
import { timingSafeEqual } from 'crypto';
export default {
  data() {
    return {
      flag: true,
      count: 0
    }
  },
  props: {
    animateover: {
      type: Boolean
    },
    foodName: {
      type: String
    },
    foodPrice: {
      type: Number
    }
  },
  methods: {
    reduce() {
      if(this.count > 0) {
        this.count--;
        this.$store.commit('reduceFood', {name:this.foodName, price: this.foodPrice})
      } else {
        this.count = 0;
      }
      this.$emit('reduce');
    },
    add(e) {
      if (this.flag && this.animateover) {
        this.$emit('add');
        this.flag = false;
        this.count++;
        this.$store.commit('addFood', {name:this.foodName, price: this.foodPrice})
        this.$emit('toggle',[e.target.getBoundingClientRect().left, e.target.getBoundingClientRect().top]);
        let that = this;
        let timeId = setTimeout(function () {
          that.flag = true;
        }, 600)
      }
    }
  }, 
  created () {
    let that = this;
    this.$store.commit('getCount', {name: this.foodName, fun: fn});
    function fn (num) {
      that.count = num;
    }
  }
}
</script>
<style lang="less" scoped>
  .v-enter {
    transform: translateX(50px) rotate(180deg);    
  }
  .v-leave-to {
    transform: translateX(50px) rotate(180deg);
  }
  .v-enter-active,.v-leave-active {
    transition: all 0.5s;
  }
  .carcontrols {
    position: relative;
    .choice { 
      .reduce {
        position: absolute;
        top: 0;
        right: 50px;
        font-size: 20px;
        color: rgb(0,160,220);
        line-height: 24px;
        vertical-align: middle;
      }
      .num {
        display: inline-block;
        margin: 0 12px;
        font-size: 10px;
        color: rgb(147,153,159);
        line-height: 24px;
      }
      .add {
        display: inline-block;
        font-size: 20px;
        color: rgb(0,160,220);
        line-height: 24px;
        vertical-align: middle;
      }
    }
  }
</style>
