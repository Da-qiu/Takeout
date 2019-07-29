<template>
  <div class="detail-car">
    <div class="content">
      <div class="head">
        <div class="title">
          <span class="name">购物车</span>
          <span class="text" @click="clear">清空</span>
        </div>
      </div>
      <ul ref='ul'>
        <li v-if='lishow' v-for="(item, i) in foodList" :key="i">
          <span class="name">{{item.name}}</span>
          <div class="controls">
            <span class="ico">￥</span>
            <span class="price">{{item.price * item.count}}</span>
            <!-- carcontrols控件 -->
            <div class="ctrl">
              <span class="reduce icon-remove_circle_outline" @click='reduce(i)'></span>
              <span class="count">{{item.count}}</span>
              <span class="add icon-add_circle" @click='add(i)'></span>
            </div>
          </div>
        </li>
      </ul>
    </div>
  </div>  
</template>
<script>
export default {
  data () {
    return {
      lishow: true,
      foodList: []
    }
  },
  computed: {
    foodChange () {
      return this.$store.state.change;
    }
  },
  watch: {
    foodChange () {
      this.foodList = this.$store.state.foods;
      this.reloade();
    }
  },
  methods: {
    reloade () {
      this.lishow = false;
      this.$nextTick(() => {
        this.lishow = true;
      })
    },
    reduce (i) {
      if (this.foodList[i].count <= 0) {
        let ul = this.$refs.ul;
        let li = ul.children[i];
        ul.removeChild(li);
      }
      this.$store.commit('reduceFood', this.foodList[i]);
      this.$store.state.change = !this.$store.state.change
    },
    add (i) {
      this.$store.commit('addFood', this.foodList[i]);
      this.$store.state.change = !this.$store.state.change
    },
    clear () {
      let ul = this.$refs.ul;
      let lis = ul.children;
      this.$store.commit('clearFood');
      this.$store.state.change = !this.$store.state.change
      for (let i=lis.length - 1; i >= 0; i--) {
        ul.removeChild(lis[i])
      }
    }
  },
  created () {
    this.foodList = this.$store.state.foods;
  }
}
</script>
<style lang="less" scoped>
  ul,li {
    margin: 0;
    padding: 0;
    list-style: none;
  }
  .detail-car {
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    z-index: 888;
    background-color: rgba(7,17,27,0.6);
    .content {
      width: 100%;
      position: absolute;
      left: 0;
      bottom: 0;
      padding-bottom: 46px;
      max-height: 305px;
      overflow: auto;
      // 清除滚动条
      &::-webkit-scrollbar {
        display: none;
      }
      .head {
        background-color: #f3f5f7;
        border-bottom: 1px solid rgba(7,17,27,0.1);
        .title {
          height: 40px;
          margin: 0 18px;
          position: relative;
          .name {
            font-size: 14px;
            font-weight: 200;
            color: rgb(7,17,27);
            line-height: 40px;
          }
          .text {
            height: 40px;
            position: absolute;
            top: 0;
            right: 0;
            font-size: 12px;
            color: rgb(0,160,220);
            line-height: 40px;
          }
        }
      }
      >ul {
        background-color: #fff;
        padding: 0 18px;
        >li {
          box-sizing: border-box;
          height: 48px;
          padding: 12px 0;
          border-bottom: 1px solid rgba(7,17,27,0.1);
          position: relative;
          &:last-child {
            border: none;
          }
          .name {
            font-size: 14px;
            color: rgb(7,17,27);
            line-height: 24px;
          }
          .controls {
            position: absolute;
            top: 12px;
            right: 0;
            .ico {
              font-size: 10px;
              font-weight: normal;
              color: rgb(240,20,20);
              line-height: 24px;
              margin-left: 18px;
            }
            .price {
              font-size: 14px;
              font-weight: 700;
              color: rgb(240,20,20);
              line-height: 24px;
              margin-right: 12px;
            }
            .ctrl {
              display: inline-block;
              font-size: 24px;
              color: rgb(0,160,220);
              line-height: 24px;
              vertical-align: middle;
              .count {
                font-size: 10px;
                color: rgb(147,153,159);
                margin: 0 12px;
                line-height: 24px;
                vertical-align: top;
              }
            }
          }
        }
      }
    }
  }
</style>
