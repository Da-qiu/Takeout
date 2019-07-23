<template>
  <div class="carcontrols">
    <div class="choice">
      <span class="reduce icon-remove_circle_outline" @click="reduce"></span>
      <span class="num">{{count}}</span>
      <span class="add icon-add_circle" @click="add"></span>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      count: 0
    }
  },
  methods: {
    reduce() {
      if(this.count > 0) {
        this.count--;
      } else {
        this.count = 0;
      }
    },
    add() {
      this.count++;
    }
  }
}
</script>
<style lang="less" scoped>
  .carcontrols {
    .choice {
      .reduce {
        display: inline-block;
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
