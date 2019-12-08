<template>
  <div class="content">
    <!--  -->
    <div class="page-content">
      <div class="goods-swiper">
        <swiper
          class="goods-images"
          @change="currentChange"
          :indicator-dots="false"
          :current="current"
          interval="3000"
          duration="3000"
          :circular="true"
        >
          <block v-for="(item, index) in goodsData.image" :key="index">
            <swiper-item @click="previewImage(goodsData.image,item)">
              <image :src="item" class="slide-image">
              </image>
            </swiper-item>
          </block>
        </swiper>
        <div class="imgs_num">
          <span class="a">{{goodsData.image.length==0?"0":current+1}}</span>
          <span class="b">/{{goodsData.image.length}}</span>
        </div>
      </div>
      <div class="goods-bd G-Plr-15">
        <div class="fl-row-justy top">
          <h2 class="goods-name G-more-cloum G-col-2">{{goodsData.title}}</h2>
          <div class="share-content fl-column-center" @click="setTop()">
            <i :class="['iconfont','icon-shoucang',isTop ? 'active': '' ]"></i>
            <p>收藏</p>
          </div>
        </div>
        <div v-if="goodsData.info!=''" class="promotion-text G-more-cloum G-col-3">{{goodsData.info}}</div>
        <div class="goods-money fl-row-justy">
          <div class="money fl-row-left-base">
            <span>￥{{goodsData.present_price}}</span>
            <span>￥{{goodsData.original_price}}</span>
          </div>
          <div class="coupon">
            <p @click="clickCoupon(goodsData.command)">点击领取<i>{{goodsData.discount_price}}</i>元优惠券</p>
          </div>
        </div>
      </div>
      <div class="comment">
        <div class="goods-tem-top G-Plr-15 fl-row-justy">
          <p class="title">商品介绍</p>
        </div>
        <div class="G-bg-white" v-html="articleDes">
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { apiList, configData, getNoLoad, get, post } from "@/http/api.js";
import { previewImage, showPopup,Login,shareMessage,GetQueryString, exchangeEl } from "@/utils/index";
import store from '@/store/index.js';
import { mapState, mapMutations } from "vuex";
const app = getApp()
export default {
  data() {
    return {
      current: 0, 
      goodsData:{
        image:[],
        details:null
      },
      isTop: false,
    };
  },
  onLoad(res) {
    this.routeData = this.$root.$mp.query;
    if(res.id != ""){
      this.routeData.id = res.id;
    }
    this.getCouponDetails(this.routeData.id);
  },
  onShow(){
  },
  onShareAppMessage: function() {
    let that = this;
    return {
      title: '商品详情',
      path:
        "/pages/goods/details/main?id="+that.id,
      imageUrl: ""
    };
  },
  methods: {
    ...mapMutations([
      "setmallCityDefaults",
    ]),
    getCouponDetails(id){
      let params = {
            url: 'get/coupon/onedetails',
            data: {id:id}
        }
        post(params).then(res => {
          this.goodsData = res.data[0];
        })
    },
      setTop() {
      if(this.isTop){
        return false
      }
      if(wx.getStorageSync('UserInfo').openId == undefined || wx.getStorageSync('UserInfo').openId == ''){
        showPopup('请您先在用户页面进行用户授权~');
        return false;
      }  
      this.goodsData.openId = wx.getStorageSync('UserInfo').openId;
      this.goodsData.collect_id = this.goodsData._id,
      delete this.goodsData._id
      let that = this;
      let params = {
        url: 'collectgoods',
        data:this.goodsData
      };
        post(params).then(res => {
          if (res.code) {
            showPopup(res.message);
            this.isTop = true;
          }else{
            this.isTop = true;
            showPopup(res.message);
          }
        });
    },
    currentChange(e) {
      this.current = e.mp.detail.current;
    },
    previewImage(imgs,src) {
      previewImage(src,imgs);
    },
    clickCoupon(text){
      wx.setClipboardData({
        data: text,
        success: function (res) {
          wx.getClipboardData({
            success: function (res) {
              wx.showToast({
              title: '已复制淘口令'
            })
            }
          })
        }
      })
    },
    setRouter(path, id) {
      this.$router.push({
        path: path,
        query: { id: id, type: 'goods' }
      });
    }
  },
  components: {
  },
  computed:{
    ...mapState({
    }),
    imgUrl(){
      return configData.hostImg + 'minipro/mall/yd.png'
    },
    articleDes() {
      if(this.goodsData.details != null){
        let prefix = this.goodsData.details.replace(
          /\<img src="\//gmi,
          '<img src="'+configData.hostImg
        );
        return exchangeEl(prefix)
      }
    }
  },
};
</script>

<style lang="scss" scoped>
.goods-swiper {
  height: 3.75rem;
  width: 3.75rem;
  position: relative;
  background: #fff;
  .goods-images {
    height: 3.75rem;
    width: 3.75rem;
    .slide-image {
      height: 3.75rem;
      width: 3.75rem;
    }
  }
  .imgs_num {
    position: absolute;
    right: 0.15rem;
    bottom: 0.1rem;
    width: 0.35rem;
    height: 0.35rem;
    line-height: 0.35rem;
    text-align: center;
    background-color: #000000;
    opacity: 0.6;
    border-radius: 50%;
    color: #fff;
    .a {
      color: #fff;
      font-size: 0.14rem;
    }
    .b {
      color: #fff;
      font-size: 0.1rem;
    }
  }
}
.goods-bd {
  background: #fff;
  overflow: hidden;
  .top {
    padding: 10px 0;
  }
  .goods-name {
    font-size: 0.16rem;
    color: #333;
    width: 3.09rem;
    line-height: 1.15;
    height: 0.38rem;
  }
  .share-content {
    position: relative;
    width: .28rem;
    height: .35rem;
    i {
      color: #f13a3a;
      font-size: 0.22rem;
    }
    p {
      margin-top: 2px;
      color: #333;
      font-size: 0.1rem;
    }
    button{
      position: absolute;
      top: 0;
      right: 0;
      width: 100%;
      height: 100%;
      opacity: 0;
      color: #333;
      font-size: 0.1rem;
    }
  }
  .promotion-text {
    color: #81838e;
    font-size: 0.12rem;
    line-height: 1.3;
    margin-bottom: 0.15rem;
  }
  .goods-money {
    margin-bottom: 0.1rem;
    height:.3rem;
    .money {
      span:first-child {
        color: #f13a3a;
        font-size: 0.18rem;
        &:first-letter {
          font-size: 0.18rem;
        }
        margin-right: 0.1rem;
      }
      span:last-child {
        color: #999;
        font-size: 0.12rem;
        text-decoration: line-through;
      }
    }
    .coupon{
      padding:5px;
      background:#333;
      border-radius:.03rem;
      p{
        color:#fff;
        font-size:.14rem;
      }
      i{
        color:Yellow;
        display:inline-block;
        padding:0 3px;
      }
    }
  }
}
.comment{
  margin-top: 0.1rem;
  height:auto;
  background:#fff;
  padding: 0 .1rem;
}
.goods-tem-top {
  height: 0.44rem;
  width: 100%;
  background: #fff;
  .title {
    font-size: 0.15rem;
    color: #333;
    font-weight: 700;
  }
  .more {
    font-size: 0.13rem;
    color: #666;

    i {
      font-size: 0.13rem;
      color: #666;
      line-height: 1;
    }
  }
}

.goods-assist-temp {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    width: 100%;
    padding: .3rem 0;
    margin: 0 auto;
    i {
        font-size: .2rem;
        color: #e54343;
        margin-right: 5px;
    }
    p {
        text-align: center;
        font-size: .16rem;
        color: #666;
    }
}
.toolbar{
  position: fixed;
  bottom: 0;
  left: 0;
  z-index: 2;
  div{
    width: 3.75rem;
    height: 0.5rem;
    background:linear-gradient(0deg,rgba(243,110,32,1) 0%,rgba(255,159,35,1) 100%);
    color: #fff;
    font-size: .18rem;
    i{
      font-size: .22rem;
      margin: 0 5px;
    }
  }
}
</style>
