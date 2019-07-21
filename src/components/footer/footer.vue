<template>
  <div class="footer">
    <div class="left">
      <div class="car">
        <div class="logo">
          <span class="icon icon-shopping_cart"></span>
        </div>
        <span class="totalPrices">￥0</span>
      </div>
      <span class="info">另需配送费￥4元</span>
    </div>
    <div class="right">
      <span class="startPrice">￥20起送</span>
    </div>
  </div>
</template>
<script>
export default {
    
}
</script>
<style lang="less" scoped>
  .footer {
    width: 100%;
    height: 46px;
    background-color: #141d27;
    position: fixed;
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
          span {
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
      background-color: #2B333B;
      .startPrice {
        display: block;
        margin-top: 12px;
        text-align: center;
        font-size: 16px;
        color: rgba(255,255,255,0.4);
        font-weight: 700;
        line-height: 24px;
      }
    }
  }
</style>
