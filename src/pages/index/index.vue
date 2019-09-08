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
</style>
