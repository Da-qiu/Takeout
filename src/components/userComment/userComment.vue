<template>
  <div class="user-comment">
    <!-- 评价分类 -->
    <div class="classify">
      <button class="all">
        <span class="text">全部</span>
        <span class="num">57</span>
      </button>
      <button class="satisfy">
        <span class="text">满意</span>
        <span class="num">47</span>
      </button>
      <button class="dissatisfy">
        <span class="text">不满意</span>
        <span class="num">10</span>
      </button>
    </div>
    <!-- 看有内容的评价 -->
    <div class="iscontent">
      <span class="icon icon-check_circle" @click='add' :class="{active: flag}"></span>
      <span class="desc">只看有内容的评价</span>
    </div>
    <!-- 用户评价内容列表 -->
    <div class="comment-list">
      <ul>
        <li v-for="(user, i) in ratings" :key='i'>
          <img :src="user.avatar" alt="用户头像" width="28">
          <div class="content-wrapper">
            <div class="name">{{user.username}}</div>
            <!-- Star 组件 -->
            <Star :size="24" :score="user.score" class='star'></Star>
            <span class="time">{{user.deliveryTime}}分钟送达</span>
            <div class="comment-text">{{user.text}}</div>
            <div class="foot">
              <span class="icon" :class="[user.rateType?'icon-thumb_down':'icon-thumb_up']"></span>
              <span class="recommend" v-for="(item, index) in user.recommend" :key='index'>
                {{item}}
              </span>
            </div>
          </div>
          <div class="rate-time">{{rateTime[i]}}</div>
        </li>
      </ul>
    </div>
  </div>  
</template>
<script>
import Star from '../star/star.vue'
export default {
  data () {
    return {
      flag: false
    }
  },
  props: {
    ratings: {
      type: Array
    },
    rateTime: {
      type: Array
    }
  },
  methods: {
    add () {
      this.flag = !this.flag;
    }
  },
  components: {
    Star
  }
}
</script>
<style lang="less" scoped>
  ul {
    padding: 0;
    margin: 0;
    list-style: none;
  }
  .user-comment {
    .classify {
      padding: 18px 0;
      margin: 0 18px;
      border-bottom: 1px solid rgba(7,17,27,0.1);
      >button {
        outline: none;
        border: none;
        -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
        display: inline-block;
        padding: 8px 12px;
        border-radius: 2px;
        line-height: 16px;
        margin-right: 10px;
        .text {
          font-size: 14px;
          margin-right: 2px;
        }
        .num {
          font-size: 8px;
        }
      }
      .all {
        background-color: rgb(0,160,220);
        color: #fff;
      }
      .satisfy {
        background-color: rgba(0,160,220,0.2);
        color: rgb(77,85,93);
      }
      .dissatisfy {
        background-color: rgba(77,85,93,0.2);
        color: rgb(77,85,93);
      }
    }
    .iscontent {
      padding: 12px 18px;
      border-bottom: 1px solid rgba(7,17,27,0.1);
      .icon {
        font-size: 24px;
        color: rgb(147,153,159);
        line-height: 24px;
        margin-right: 4px;
        vertical-align: middle;
        &.active {
          color: #00A0DC;
        }
      }
      .desc {
        font-size: 12px;
        color: rgb(147,153,159);
        line-height: 24px;
        vertical-align: middle;
      }
    }
    .comment-list{
      width: 100%;
      >ul {
        padding: 0 18px;
        >li {
          position: relative;
          border-bottom: 1px solid rgba(7,17,27,0.1);
          padding-bottom: 18px;
          margin-top: 18px;
          img {
            display: inline-block;
            border-radius: 50%;
            margin-right: 12px;
            vertical-align: top;
          }
          .content-wrapper {
            max-width: 260px;
            display: inline-block;
            .name {
              font-size: 10px;
              color: rgb(7,17,27);
              line-height: 12px;
            }
            .time {
              font-size: 10px;
              font-weight: 200;
              color: rgb(147,153,159);
              line-height: 18px;
              margin-left: 6px;
            }
            .comment-text {
              font-size: 12px;
              color: rgb(7,17,27);
              line-height: 18px;
            }
            .foot {
              .icon {
                display: inline-block;
                font-size: 12px;
                line-height: 16px;
                margin-right: 8px;
                margin-top: 8px;
                &.icon-thumb_up {
                  color: rgb(0,160,220);
                }
                &.icon-thumb_down {
                  color: rgb(183,187,191);
                }
              }
              .recommend {
                display: inline-block;
                margin-right: 8px;
                margin-top: 8px;
                padding: 0 6px;
                border: 1px solid rgba(7,17,27,0.1);
                border-radius: 2px;
                background-color: #fff;
                font-size: 9px;
                color: rgb(147,153,159);
                line-height: 16px;
              }
            }
          }
          .rate-time {
            position: absolute;
            top: 0;
            right: 0;
            font-size: 8px;
            font-weight: 200;
            color: rgb(147,153,159);
            line-height: 12px;
          }
        }
      }
    }
  }
</style>
