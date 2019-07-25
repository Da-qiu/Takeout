<template>
  <div class="shops">
    <!-- 商家顶部信息 -->
    <div class="shop-head">
      <div class='up'>
        <div class="title">{{seller.name}}</div>
        <div class="star">
          <Star :size="36" :score="seller.score" class="ico"></Star>
          <span class="ratingCount">({{seller.ratingCount}})</span>
          <span class="sellCount">月售{{seller.sellCount}}单</span>
        </div>
        <div class="collect">
          <span class="icon icon-favorite" :class="{active: !flag}" @click="add"></span>
          <p v-show="flag">收藏</p>
          <p v-show="!flag">已收藏</p>
        </div>
      </div>
      <div class='down'>
        <div class="left">
          <div class="text">起送价</div>
          <div>
            <span class="number">{{seller.minPrice}}</span>
            <span class="danwei">元</span>
          </div>
        </div>
        <div class="middle">
          <div class="text">商家配送</div>
          <div>
            <span class="number">{{seller.deliveryPrice}}</span>
            <span class="danwei">元</span>
          </div>
        </div>
        <div class="right">
          <div class="text">平均配送时间</div>
          <div>
            <span class="number">{{seller.deliveryTime}}</span>
            <span class="danwei">分钟</span>
          </div>
        </div>
      </div>
    </div>
    <!-- 分割条 -->
    <div class="split"></div>
    <!-- 公告与活动 -->
    <div class="announcement">
      <h3 class="title">公告与活动</h3>
      <p class="content">{{seller.bulletin}}</p>
      <ul>
        <li v-for="(item, i) in seller.supports" :key='i'>
          <span class="picture" :class="[img[item.type]]"></span>
          <span class="desc">{{item.description}}</span>
        </li>
      </ul>
    </div>
    <!-- 公告下边的分割条 -->
    <div class="split"></div>
    <!-- 商家实景 -->
    <div class="live-action">
      <h3 class="title">商家实景</h3>
      <ul>
        <li v-for="(img, index) in seller.pics" :key='index'>
          <img :src="img" alt="商家实景图" height='90' width='120'>
        </li>
      </ul>
    </div>
    <!-- 商家实景分割条 -->
    <div class="split"></div>
    <!-- 商家信息 -->
    <div class="store-info">
      <h3 class='title'>商家信息</h3>
      <ul>
        <li v-for="(info, j) in seller.infos" :key='j'>
          <span class="text">{{info}}</span>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
import Star from '../../components/star/star.vue'
export default {
  data () {
    return {
      flag: true,
      img: ['decrease','discount','special','invoice','guarantee']
    }
  },
  props: {
    seller:{
      type: Object
    }
  },
  components: {
    Star
  },
  methods: {
    add () {
      this.flag = !this.flag;
    }
  }    
}
</script>
<style lang="less" scoped>
  p,h2,h3,ul {
    margin: 0;
    padding: 0;
  }
  ul {
    list-style: none;
  }
  .shops {
    width: 100%;
    .shop-head {
      padding: 0 18px;
      .up {
        margin-top: 18px;
        padding-bottom: 18px;
        border-bottom: 1px solid rgba(7,17,27,0.1);
        position: relative;
        .title {
          font-size: 14px;
          color: rgb(7,17,27);
          line-height: 14px;
          margin-bottom: 8px;
        }
        .star {
          span {
            font-size: 10px;
            color: rgb(77,85,93);
            line-height: 18px;
            vertical-align: middle;
          }
          .ratingCount {
            margin-left: 8px;
            margin-right: 12px;
          }
        }
        .collect {
          position: absolute;
          top: 0;
          right: 0;
          text-align: center;
          .icon {
            font-size: 24px;
            line-height: 24px;
            &.active {
              color: rgb(240,20,20);
            }
          }
          p {
            margin-top: 4px;
            font-size: 10px;
            color: rgb(77,85,93);
            line-height: 10px;
          }
        }
      }
      .down {
        margin: 18px 0;
        display: flex;
        >div {
          flex: 1;
          border-right: 1px solid rgba(7,17,27,0.1);
          &:last-child {
            border: none;
          }
          >div {
            text-align: center;
              span {
                font-weight: 200;
                color: rgb(7,17,27);
                line-height: 24px;
              }
              .number {
                font-size: 24px; 
              }
              .danwei {
                font-size: 10px;
              }
          }
          .text {
            font-size: 10px;
            color: rgb(147,153,159);
            line-height: 10px;
            margin-bottom: 6px;
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
    .announcement {
      padding: 0 18px;
      .title {
        padding-top: 18px;
        padding-bottom: 8px;
        font-size: 14px;
        color: rgb(7,17,27);
        line-height: 14px;
        font-weight: 400;
      }
      .content {
        padding: 0 12px 16px 12px;
        font-size: 12px;
        color: rgb(240,20,20);
        font-weight: 200;
        line-height: 24px;
      }
      ul {
        >li {
          padding: 16px 12px;
          border-top: 1px solid rgba(7,17,27,0.1);
          .picture {
            display: inline-block;
            width: 16px;
            height: 16px;
            border-radius: 2px;
            background-size: 16px 16px;
            vertical-align: middle;
            margin-right: 6px;
            &.decrease {
              background-image: url('../../assets/images/decrease_4@2x.png')
            }
            &.discount {
              background-image: url('../../assets/images/discount_4@2x.png')
            }
            &.special{
              background-image: url('../../assets/images/special_4@2x.png')
            }
            &.invoice {
              background-image: url('../../assets/images/invoice_4@2x.png')
            }
            &.guarantee {
              background-image: url('../../assets/images/guarantee_4@2x.png')
            }
          }
          .desc {
            display: inline-block;
            font-size: 12px;
            font-weight: 200;
            color: rgb(7,17,27);
            line-height: 16px;
          }
        }
      }
    }
    .live-action {
      padding: 0px 18px 12px;
      .title {
        padding-top: 18px;
        font-size: 14px;
        color: rgb(7,17,27);
        line-height: 14px;
        font-weight: 400;
        padding-bottom: 12px;
      }
      ul {
        >li {
          display: inline-block;
          margin-right: 6px;
          margin-bottom: 6px;
          img {
            vertical-align: top;
          }
        }
      }
    }
    .store-info {
      padding: 0 18px;
      .title {
        padding-top: 18px;
        font-size: 14px;
        color: rgb(7,17,27);
        line-height: 14px;
        font-weight: 400;
        padding-bottom: 12px;
      }
      ul {
        >li {
          padding: 16px 12px;
          border-top: 1px solid rgba(7,17,27,0.1);
          .text {
            font-size: 12px;
            font-weight: 200;
            color: rgb(7,17,27);
            line-height: 16px;
          }
        }
      }
    }
  }
</style>