<template>
  <div class="header">
        <div class="content-wrapper">
            <div class="avatar">
                <img :src="seller.avatar" alt="顶部图片" width="64" height="64">
            </div>
            <div class="content">
                <div class="title">
                    <span class="brand"></span>
                    <span class="name">{{seller.name}}</span>
                </div>
                <div class="description">
                    {{seller.description}}/{{seller.deliveryTime}}分钟送达
                </div>
                <div class="support" v-if="seller.supports">
                    <span class="icon"></span>
                    <span class="text">{{seller.supports[0].description}}</span>
                </div>
            </div>
      <!-- 右边点击显示浮层区域 -->
			<div class="right" v-if="seller.supports" @click="showDetail">
				<span>{{seller.supports.length}}个</span>
				<span class="icon-keyboard_arrow_right"></span>
			</div>				
      </div>
      <!-- 下边的公告 -->
      <div class="announcement" @click="showDetail">
			  <span class="announcement-title"></span>
			  <span class="announcement-tex">{{seller.bulletin}}</span>
			  <i class="icon-keyboard_arrow_right"></i>
		  </div>
    <div class="backgroud-ig">
      <img :src="seller.avatar" alt="背景模糊图" width="100%">
    </div>
    <!-- 浮层 -->
    <transition>
      <div class="detail" v-show="detailShow">
        <div class="detail-wrapper">
          <div class="detail-main">
            <span class="title">{{seller.name}}</span>
            <!-- 引入星星组件 -->
            <div class="star-wrapper">
              <Star :size="48" :score="seller.score"></Star>
            </div>
            <!-- 优惠信息 -->
            <div class="ytitle">
              <div class="line"></div>
              <div class="text">优惠信息</div>
              <div class="line"></div>
            </div>
            <ul class="main-info" v-if="seller.supports">
              <li class="support-item" v-for="(item, index) in seller.supports" :key="index">
                <span class="icon" :class="classMap[item.type]"></span>
                <span class="text">{{item.description}}</span>
              </li>
            </ul>
            <!-- 商家公告 -->
            <div class="ytitle">
              <div class="line"></div>
              <div class="text">商家公告</div>
              <div class="line"></div>
            </div>
            <div class="content">{{seller.bulletin}}</div>
          </div>
        <div class="detail-close icon-close" @click="detailHidden"></div>
      </div>
     </div>
    </transition>
  </div>
</template>
<script>
import Star from '../star/star.vue'
export default {
  data() {
    return {
      detailShow: false,
      classMap: ['decrease','discount','special','invoice','guarantee']
    }
  },
  props: {
      seller: {
          type: Object
      }
  },
  methods: {
    showDetail() {
      this.detailShow = true;
    },
    detailHidden() {
      this.detailShow = false;
    }
  },
  components: {
    Star
  }
}
</script>
<style lang="less" scoped>
  .v-enter,.v-leave-to {
    opacity: 0;
  }
  .v-enter-active,.v-leave-active {
    transition: opacity .5s ease;
  }
	.header {
    height: px;
    padding-top: 24px;
    background-color: rgba(7,17,27,0.5);
    position: relative;
		.content-wrapper {
      margin: 0 12px 18px 24px;
      position: relative;
      margin-bottom: 18px;
			>div {
				display: inline-block;
				vertical-align: top;
			}
			.avatar {
				margin-right: 16px;
				img {
					border-radius: 4px;
				}
			}
			.content {
				.title {
					margin: 2px 0 8px 0;
					.brand {
						display: inline-block;
						width: 30px;
						height: 18px;
						background: url('../../assets/images/brand@2x.png') no-repeat center;
						background-size: 30px 18px;
						margin-right: 6px;
					}
					.name {
						display: inline-block;
						height: 18px;
						font-size: 16px;
						color: rgb(255,255,255);
						font-weight: bold;
						line-height: 18px;
						vertical-align: top;
					}
				}
				.description {
					font-size: 12px;
					color: rgb(255,255,255);
					font-weight: 200;
					line-height: 12px;
					margin-bottom: 10px;
				}
				.support {
					height: 12px;
					.icon {
						vertical-align: top;
						display: inline-block;
						width: 12px;
						height: 12px;
						background: url('../../assets/images/decrease_1@2x.png') no-repeat center;
						background-size: 12px 12px;
						margin-right: 4px;
					}
					.text {
						vertical-align: top;
						height: 12px;
						font-size: 10px;
						color: #fff;
						font-weight: 200;
						line-height: 12px;
					}
				}
			}
			.right {
				position: absolute;
				top: 46px;
				right: 12px;
				font-size: 10px;
				color: #fff;
				font-weight: 200;
				height: 24px;
				width: 50px;
				border-radius: 14px;
				background-color: rgba(0,0,0,0.2);
				line-height: 24px;
				text-align: center;
				.icon-keyboard_arrow_right {
					display: inline-block;
					margin-left: 2px;
				}
			}
		}
		.announcement {
      position: relative;
      color: #fff;
      font-size: 10px;
      font-weight: 200;
      height: 28px;
      line-height: 28px;
      padding: 0 20px 0 12px;
      white-space: nowrap;
      overflow: hidden;
      background-color: rgba(7,17,27,0.2);
      text-overflow: ellipsis;
			.announcement-title {
        display: inline-block;
        width: 22px;
        height: 12px;
        background: url('../../assets/images/bulletin@2x.png') center;
        background-size: 22px 12px;
        margin-right: 4px;
        vertical-align: top;
        margin-top: 7px;
			}
			.announcement-text {

      }
      .icon-keyboard_arrow_right {
        font-size: 14px;
        position: absolute;
        top: 7px;
        right: 10px;
      }
    }
    .backgroud-ig {
      width: 100%;
      height: 100%;
      position: absolute;
      left: 0;
      top: 0;
      z-index: -100;
      filter: blur(10px);
      overflow: hidden;
    }
    .detail {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: rgba(7, 17, 27, 0.8);
      z-index: 999;
      overflow: auto;
      .detail-wrapper {
        min-height: 100%;
        position: relative;
        .detail-main {
          padding-bottom: 64px;
          padding-top: 64px; 
          .title {
            display: block;
            font-size: 16px;
            font-weight: 700;
            color: #fff;
            line-height: 16px;
            width: 100%;
            text-align: center;
          }
          .star-wrapper {
            height: 24px;
            margin-top: 18px;
            padding: 2px 0;
            text-align: center;
          }
          .ytitle {
            display: flex;
            width: 80%;
            margin: 28px auto 24px auto;
            align-items: center;
            .line {
              flex: 1;
              height: 2px;
              background-color: rgba(255,255,255,0.2);
            }
            .text {
              color: #fff;
              margin: 0 12px 0 12px;
              font-weight: 700;
            }
          }
          .main-info {
            width: 80%;
            margin: 0 auto;
            padding-left: 12px;
            .support-item {
              padding: 0 12px;
              margin-bottom: 14px;
              font-size: 0;
              &:last-child {
                margin-bottom: 0;
              }
              .icon {
                display: inline-block;
                width: 16px;
                height: 16px;
                vertical-align: top;
                margin-right: 6px;
                background-size: 16px 16px;
                background-repeat: no-repeat;
                &.decrease {
                  background-image: url('../../assets/images/decrease_4@2x.png')
                }
                &.discount {
                  background-image: url('../../assets/images/discount_4@2x.png')
                }
                &.guarantee {
                  background-image: url('../../assets/images/guarantee_4@2x.png')
                }
                &.invoice {
                  background-image: url('../../assets/images/invoice_4@2x.png')
                }
                &.special {
                  background-image: url('../../assets/images/special_4@2x.png')
                }
              }
              .text {
                display: inline-block;
                line-height: 16px;
                font-size: 12px;
                color: #fff;
                font-weight: 200;
                height: 16px;
              }
            }
          }
          .content {
            width: 80%;
            margin: 0 auto;
            font-size: 12px;
            font-weight: 200;
            color: #fff;
            line-height: 24px;
          }
        }
        .detail-close {
          width: 32px;
          height: 32px;
          font-size: 32px;
          color: rgba(255,255,255,0.5);
          position: absolute;
          left: 50%;
          margin-left: -16px;
          bottom: 32px;
        }
      }

    }
	}
</style>
