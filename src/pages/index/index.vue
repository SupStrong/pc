<template>
  <div class="content">
      <div class="swiper">
            <swiper class="swipers" :autoplay="false" :current="currentSwiper" @change="swiperChange">  
              <swiper-item v-for="(item,index) in banner" :key="index">
                <image  class="posts-swiper-img" :src='item'></image>
              </swiper-item>
            </swiper>
            <view class="dots">  
                <block v-for="(item,index) in banner" :key="index">  
                    <view :class="['dot',index == currentSwiper ? ' active' : '']"></view>  
                </block>  
            </view>  
      </div>
      <div class="bg-fff tip-list fl-row-justy">
          <div class="item">
              <img class="home-icon fl-column-center" src="http://n.sinaimg.cn/news/transform/700/w1000h500/20190905/6c5f-ieftthx1425370.jpg" alt="">
              <span>赚零花钱</span>
          </div>
          <div class="item">
              <img class="home-icon fl-column-center" src="http://n.sinaimg.cn/photo/transform/700/w1000h500/20190903/85f9-ieaiqii5789841.jpg" alt="">
              <span>网赚攻略</span>
          </div>
          <div class="item">
              <img class="home-icon fl-column-center" src="http://n.sinaimg.cn/news/700/w1000h500/20190904/f15c-ieaiqii9666581.png" alt="">
              <span>领优惠券</span>
          </div>
          <div class="item">
              <img class="home-icon fl-column-center" src="http://n.sinaimg.cn/news/transform/700/w1000h500/20190902/8f1d-ieaiqii0044002.jpg" alt="">
              <span>虚拟资源</span>
          </div>
      </div>
      <div class="hot-goods G-Mb-10" v-if="hotGoods.length !=0"> 
          <div class="title fl-row-leftNowrap">
            <div class="text">每日任务</div>
          </div>
          <div class="main">
              <div class="kitchen-main">
                <div class="main_list" flex="main:justify">
                    <div class="main_list_image">
                        <img src="https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=3647170051,871438825&fm=26&gp=0.jpg" alt="">
                    </div>
                    <div class="main_list_info">
                        <div class="text">
                            <span>地中海风格的厨卫家电系统解决方案地中海风格的厨卫家电系统解决方案地中海风格的厨卫家电系统解决方案</span>
                        </div>

                        <div class="price" flex="dir:left">
                              <p class="price_info">学习交流</p>
                              <p class="iconShow"><i class="iconfont icon-iconset0207"></i><span>100</span></p>
                        </div>
                    </div>
                </div>
                <div class="main_list" flex="main:justify">
                    <div class="main_list_image">
                        <img src="https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=3647170051,871438825&fm=26&gp=0.jpg" alt="">
                    </div>
                    <div class="main_list_info">
                        <div class="text">
                            <span>地中海风格的厨卫家电系统解决方案地中海风格的厨卫家电系统解决方案地中海风格的厨卫家电系统解决方案</span>
                        </div>

                        <div class="price" flex="dir:left">
                              <p class="price_info">网赚项目</p>
                              <p class="iconShow"><i class="iconfont icon-iconset0207"></i><span>100</span></p>                              
                        </div>
                    </div>
                </div>
                <div class="main_list" flex="main:justify">
                    <div class="main_list_image">
                        <img src="https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=3647170051,871438825&fm=26&gp=0.jpg" alt="">
                    </div>
                    <div class="main_list_info">
                        <div class="text">
                            <span>地中海风格的厨卫家电系统解决方案地中海风格的厨卫家电系统解决方案地中海风格的厨卫家电系统解决方案</span>
                        </div>

                        <div class="price" flex="dir:left">
                              <p class="price_info">优惠券</p>
                              <p class="iconShow"><i class="iconfont icon-iconset0207"></i><span>100</span></p>                              
                        </div>
                    </div>
                </div>
            </div>
          </div>
      </div>
  </div>
</template>

<script>
import { apiList, configData, getNoLoad, get, post } from "@/http/api.js";
import { mapState, mapMutations } from "vuex";
import { getUrlHistory,sendFormId,showPopup,exchangeEl  } from "@/utils/index.js";
export default {
  onLoad(res) {

  },
  components: {
  },
  data() {
    return {
      currentSwiper:0,
      banner:[
        "http://n.sinaimg.cn/news/transform/700/w1000h500/20190905/6c5f-ieftthx1425370.jpg",
        "http://n.sinaimg.cn/photo/transform/700/w1000h500/20190903/85f9-ieaiqii5789841.jpg",
        "http://n.sinaimg.cn/news/700/w1000h500/20190904/f15c-ieaiqii9666581.png",
        "http://n.sinaimg.cn/news/transform/700/w1000h500/20190902/8f1d-ieaiqii0044002.jpg"
      ]
    };
  },
  methods:{
    swiperChange: function (e) {
      this.currentSwiper= e.mp.detail.current
    },
  },
  watch: {}
};
</script>

<style lang="scss" scoped>
.content{
  // background-color:white;
}
// 轮播图
.swiper{
  padding: 0.15rem;
  background: #fff;
  position: relative;
  swiper{
    max-width: 3.45rem;
    height: 1.75rem;
    border-radius: 0.04rem;
    image{
      width: 3.45rem;
      max-width: 3.45rem;
      height: 1.75rem;
      border-radius: 0.04rem;
    }
  }
  .dots {
    width: 156rpx;
    position: absolute;
    bottom: 0.25rem;
    width: 100%;
    left: 0;
    right: 0;
    text-align: center;
    margin: auto;
    display: flex;
    justify-content: center;
  }
  /*未选中时的小圆点样式 */
  .dot {
    width: 0.04rem;
    height: 0.04rem;
    background-color: #ffffff;
    opacity: 0.74;
    margin-right: .08rem;
    border-radius: 50%;
    &.active {
      width: 0.12rem;
      height: 0.04rem;
      background-color: #ffffff;
      border-radius: 0.02rem;
      opacity: 0.74;
    }
  }
}
.tip-list{
    padding: 0.1rem 0.15rem;
    margin-top:.1rem;
    background-color:#fff;
    .item{
      display: flex;
      width: 0.86rem;
      height: 0.775rem;
      flex-direction: column;
      align-items: center;
      padding: 0.1rem 0 0 0;
      position: relative;
      .home-icon{
        width: .45rem;
        height: 0.45rem;
        display: flex;
        align-items: center;
        justify-content: center;
      }
      span{
        color: #333;
        padding-top: 0.08rem;
        font-size: 0.12rem;
      }
    }
}
.hot-goods,.news{
  margin-top:.1rem;
  width: 3.75rem;
  background-color: #fff;
  padding-bottom: .15rem;
  .title{
    padding: .16rem .15rem .14rem;
    .text{
      font-size: .2rem;
      color: #333;
      display: inline;
      font-weight: bold;
    }
    .tips{
      font-size: .12rem;
      color: #f13a3a;
      margin-left:.1rem;
      border: solid 0.01rem #f13a3a;
      padding: 1px 2px;
      background-color: #fff3f3;
      border-radius: 0.02rem;
    }
  }
}
   .kitchen-main{
       width: 100%;
       background-color: #fff;
       overflow: hidden;
       .main_list{
           height: 1rem;
           padding: .1rem .15rem;
           display:flex;
           justify-content: space-between;
       }
       .main_list_image{
           width: 0.8rem;
           height: 0.8rem;
           img{
               width: 100%;
               height: 100%;
           }
       }
       .main_list_info{
           width: 2.55rem;
           margin-bottom:-.1rem;
           border-bottom: 0.02rem solid #ececec;
           .text{
               overflow: hidden;
               text-overflow: ellipsis;
               display: -webkit-box;
               -webkit-line-clamp: 2;
               -webkit-box-orient: vertical;
               line-height: 0.2rem;
               i{
                   color: #fff;	
                   background-color: #f36e20;
                   border-radius: 0.02rem;
                   padding: 0.02rem 0.03rem;
                   font-size: .1rem;
               }
               span{
                   font-size: .14rem;
                   color: #333;
               }
           }
           .price{
               margin-top: .15rem;
               display:flex;
               justify-content: space-between;
               align-items:center;
               .price_info{
                   font-size: .12rem;
                    color: #f13a3a;
                    border: solid 0.01rem #f13a3a;
                    padding: 1px 2px;
                    background-color: #fff3f3;
                    border-radius: 0.02rem;
                    display:flex;
                    align-items:center;
                   span{
                       font-size: 0.12rem;
                   }
                   i{
                       font-size: 0.16rem;
                   }
                   b{
                       font-size: 0.15rem;
                   }
               }
               .iconShow{
                 font-size:12px;
                 color:#999;
                 display: flex;
                 i{
                   font-size:14px;
                 }
               }
           }
           .price_btn{
               font-size: 0;
               padding-left: 0.115rem;
               i{
                   font-style: normal;
                   padding: .015rem .015rem;
                   float: left; 
                   font-size: .11rem;
                   border-radius: .015rem;
               }
               i.sell-sel-active-col{
                   color: white;
                   background-color: red;
                   border: .01rem solid red;
                   margin-right: .04rem;
               }
               i.sell-sel-active-bgc{
                   color: red;
                   background-color: #fff;
                   box-sizing: border-box;
                   border: .01rem solid red;
                   margin-right: .04rem;
               }
           }
       }
   }
   .kitchen-main:last-child{
    .main_list_info{
        border-bottom:0;
    }
   }

</style>
