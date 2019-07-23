<template>
  <div class="rating-wrapper">
    <div class="rating-header">
      <!-- 综合评价 -->
      <div class="header-left">
        <div class="content">
          <span class="score">{{seller.score}}</span>
          <span class="title">综合评分</span>
          <span class="info">高于周边商家{{seller.rankRate}}%</span>
        </div>
      </div>
      <!-- 服务评价 -->
      <div class="header-right">
        <div class="food-score">
          <span class="text">食物评分</span>
          <Star :size='36' :score='seller.foodScore' class='star'></Star>
          <span class="score">{{seller.foodScore}}</span>
        </div>
        <div class="service-score">
          <span class="text">服务态度</span>
          <Star :size='36' :score='seller.serviceScore' class='star'></Star>
          <span class="score">{{seller.serviceScore}}</span>
        </div>
        <div class="delivery-time">
          <span class="text">送达时间</span>
          <span class="time">{{seller.deliveryTime}}分钟</span>
        </div>
      </div>
    </div>
    <!-- 评价下面的分割条 -->
    <div class="split"></div>
    <!-- 用户评价组件 -->
    <Comment :ratings='ratings' :rateTime="rateTime"></Comment>
  </div>
</template>
<script>
import Star from '../../components/star/star.vue'
import Comment from '../../components/userComment/userComment.vue'
export default {
  data () {
    return {
      ratings: [],
      rateTime: []
    }
  },
  props:{
    seller: {
      type: Object
    }
  },
  components: {
    Star,
    Comment
  },
  created () {
    this.$http.get('/api/ratings').then((result) => {
      result = result.body;
      if (result.errno === 0) {
        this.ratings = result.data;
        // console.log(this.ratings)
        for (let i=0; i < this.ratings.length; i++) {
          let time = this.ratings[i].rateTime;
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
      }
    })
  }
}
</script>
<style lang="less" scoped>
  .rating-wrapper {
    width: 100%;
    .rating-header {
      width: 100%;
      display: flex;
      padding: 18px 0;
      .header-left {
        flex: 2;
        border-right: 1px solid #ECEDED;
        .content {
          .score {
            display: block;
            text-align: center;
            font-size: 24px;
            color: rgb(255,153,0);
            line-height: 28px;
          }
          .title {
            display: block;
            text-align: center;
            font-size: 12px;
            color: rgb(7,17,27);
            line-height: 16px;
          }
          .info {
            display: block;
            text-align: center;
            font-size: 10px;
            color: #A8ADB1;
            line-height: 20px;
          }
        }
      }
      .header-right {
        flex: 3;
        >div {
          margin: 0 24px;
          .text {
            font-size: 12px;
            color: rgb(7,17,27);
            line-height: 20px;
            margin-right: 10px;
          }
          .star {           
            vertical-align: top;           
            padding-right: 12px;
          }
          .score {
            font-size: 12px;
            color: rgb(255,153,0);
            line-height: 20px;
          }
          .time {
            flex: 2;
            font-size: 12px;
            color: rgb(147,153,159);
            line-height: 20px
          }
        }
      }      
    }
    .split {
      width: 100%;
      height: 18px;
      border-top: 1px solid #E7E8E9;
      border-bottom: 1px solid #E7E8E9;
      background-color: #F3F5F7;
    }
  }
</style>

