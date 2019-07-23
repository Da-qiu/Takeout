<template>
  <div class="goods">
    <!-- 左侧菜单 -->
    <div class="menu-wrapper" ref="menuWrapper">
      <ul class="content">
        <li v-for="(item, i) in goods" :key="i" @click="addActive(i)" :class='{active:active[i]}'>
          <span class="text">{{item.name}}</span>
        </li>
      </ul>
    </div>
    <!-- 右侧食物列表 -->
    <div class="foods-wrapper" ref="foodsWrapper">
      <ul ref="ulWrapper">
        <li class="food-list" v-for="(item, i) in goods" :key='i'>
          <h1 class="title">{{item.name}}</h1>
          <ul>
            <li class="food-item" v-for="(food,index) in item.foods" :key="index">
              <div class="icon">
                <img :src="food.icon" alt="食物图片" width="100%" height="100%">
              </div>
              <div class="content">
                <h2 class="name">{{food.name}}</h2>
                <p class="desc">{{food.description}}</p>
                <div class="extra">
                  <span>月售{{food.sellCount}}份</span>
                  <span>好评率{{food.rating}}%</span>
                </div>
                <div class="price">
                  <span class="nowPrice">￥{{food.price}}</span>
                  <span class="oldPrice" v-show="food.oldPrice">￥{{food.oldPrice}}</span>
                </div>
              </div>
              <Carcontrols class="carcontrols"></Carcontrols>
            </li>
          </ul>
        </li>
      </ul>
    </div>
    <Footer></Footer>
  </div>
</template>
<script>
import Bscroll from 'better-scroll'
import Carcontrols from '../../components/carcontrols/carcontrols.vue'
import Footer from '../../components/footer/footer.vue'
const ERR_OK = 0;
export default {
    data(){
      return {
        goods: [],
        active: [1]
      }
    },
    props: {
      seller: {
        type: Object
      }
    },
    components: {
      Carcontrols,
      Footer
    },
    created() {
      this.$http.get('/api/goods').then(result => {
        result = result.body;
        if (result.errno === ERR_OK) {
          this.goods = result.data;
          // console.log(this.goods);
          this.$nextTick(() => {
            this.menuScroll = new Bscroll(this.$refs.menuWrapper,{mouseWheel: true, click: true, tap: true});
            this.foodScroll = new Bscroll(this.$refs.foodsWrapper,{mouseWheel: true, click: true, tap: true, probeType: 3});
            this.foodScroll.on('scroll', (e) => {
              let height = Math.abs(e.y);
              let lh = 0;
              let index = 0;
              let flis = document.querySelectorAll('.foods-wrapper>ul>li')
              for(let i=0; i < flis.length; i++) {
                lh += flis[i].offsetHeight;
                if (lh > height) {
                  index = i;
                  let lis = document.querySelectorAll('.menu-wrapper ul li');
                  for (let j=0; j < lis.length; j++) {
                    lis[j].classList.remove('active');
                  }
                  lis[index].classList.add('active');
                  break;
                }
              }
            })
          })
        }
      })
    },
    methods: {
      addActive(i) {
        let lis = document.querySelectorAll('.menu-wrapper ul li');
        for (let j=0; j < lis.length; j++) {
          lis[j].classList.remove('active');
        }
        lis[i].classList.add('active');
        let flis = document.querySelectorAll('.foods-wrapper>ul>li');
        // console.log(flis);
        // let scorllHeight = 0;
        // for (let a=0; a < i; a++) {
        //   scorllHeight += flis[a].offsetHeight;
        //   // console.log(scorllHeight);
        // }
        // this.foodScroll.scrollBy(0, scorllHeight);
        this.foodScroll.scrollToElement(flis[i],200);
      }
    }
}
</script>
<style lang="less" scoped>
  ul {
    list-style: none;
  }
  h1,h2,ul,p {
    padding: 0;
    margin: 0;
  }
  .goods {
    position: absolute;
    top: 178px;
    bottom: 46px;
    width: 100%;
    display: flex;
    .menu-wrapper {
      flex: 0 0 80px;
      background-color: #f3f5f7;
      overflow: hidden;
      ul {
        padding-bottom: 20px;
        width: 80px;
        li {
          box-sizing: border-box;
          padding: 0 12px;
          width: 80px;
          height: 54px;
          font-size: 12px;
          color: #0B151F;
          font-weight: 200;
          line-height: 16px;
          display: table;
          position: relative;
          &::after {
            content: '';
            display: block;
            height: 1px;
            width: 56px;
            background-color: rgba(7,17,27,0.1);
            position: absolute;
            left: 12px;
            bottom: 0;
          }
          &.active {
            background-color: #fff;
            &::after {
              display: none;
            }
          }
          .text {
            display: table-cell;
            vertical-align: middle;
            font-weight: 500;
          }
        }
      }
    }
    .foods-wrapper {
      flex: 1;
      overflow: hidden;
      >ul {
        width: 100%;
        .food-list {
          width: 100%;
          >.title {
            box-sizing: border-box;
            width: 100%;
            height: 26px;
            background-color: #f3f5f7;
            border-left: 2px solid #d9dde1;
            font-size: 12px;
            color: rgb(147,153,159);
            line-height: 26px;
            padding-left: 14px;
          }
          ul {
            width: 100%;
            .food-item {
              box-sizing: border-box;
              width: 100%;
              padding: 18px;
              position: relative;
              &:last-child {
                &::after {
                  display: none;
                }
              }
              &::after {
                content: '';
                display: block;
                height: 1px;
                background-color: rgba(7,17,27,0.1);
                position: absolute;
                left: 18px;
                right: 18px;
                bottom: 0;
              }
              .icon {
                display: inline-block;
                width: 57px;
                height: 57px;
                margin-right: 10px;
              }
              .content {
                max-width: 150px;
                display: inline-block;
                vertical-align: top;
                padding-top: 2px;
                .name {
                  font-size: 14px;
                  color: rgb(7,17,27);
                  line-height: 14px;
                  margin-bottom: 6px;
                }
                .desc {
                  font-size: 10px;
                  color: rgb(147,153,159);
                  line-height: 18px;
                }
                .extra {
                  font-size: 10px;
                  color: rgb(147,153,159);
                  line-height: 18px;
                  span {
                    margin-right: 12px;
                  }
                }
                .price {
                  .nowPrice {
                    font-size: 14px;
                    color: #F01515;
                    margin-right: 8px;
                    font-weight: 700;
                    line-height: 24px;
                  }
                  .oldPrice {
                    font-size: 10px;
                    color: rgb(147,153,159);
                    font-weight: 700;
                    line-height: 24px;
                  }
                }
              }
              .carcontrols {
                position: absolute;
                bottom: 10px;
                right: 22px;
              }
            }
          }
        }
      } 
    }
  }
</style>
