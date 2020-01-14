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
      <div class="hot-goods G-Mb-10"> 
          <div class="title fl-row-leftNowrap">
            <div class="text">每日任务</div>
          </div>
          <div class="main">
              <div class="kitchen-main">
                <div class="main_list" v-for="(item,index) of goodResouce" :key="index" flex="main:justify" @click="setRouter('/pages/original-details/main',item._id)">
                    <div class="main_list_image">
                        <img :src="item.image[0]" alt="">
                    </div>
                    <div class="main_list_info">
                        <div class="text">
                            <span>{{item.title}}</span>
                        </div>
                        <div class="price" flex="dir:left">
                              <p class="price_info">{{item.interest_name}}</p>
                              <p class="iconShow"><i class="iconfont icon-iconset0207"></i><span>{{item.number}}</span></p>
                        </div>
                    </div>
                </div> 
            </div>
          </div>
      </div>
      <div class="hot-goods">
        <div class="hot-day">
            <div class="title fl-row-leftNowrap">
            <div class="text">今日爆品</div>
          </div>
            <div class="hotday-cont">
                <ul>
                    <li v-for="(item,index) of goodList" :key="index"  @click="setRouter('/pages/goods/details/main',item._id)"><i>{{index + 1}}</i>.<a>{{item.title}}</a></li>
                </ul>
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
      this.getBanner();
      this.getResouce();
      this.getGood();
  },
  onShow(){
    // this.checkLocation();    
  },
  components: {
  },
  data() {
    return {
      currentSwiper:0,
      goodList:[],
      goodResouce:[],
      banner:[
        "http://n.sinaimg.cn/news/transform/700/w1000h500/20190905/6c5f-ieftthx1425370.jpg",
        "http://n.sinaimg.cn/photo/transform/700/w1000h500/20190903/85f9-ieaiqii5789841.jpg",
        "http://n.sinaimg.cn/news/700/w1000h500/20190904/f15c-ieaiqii9666581.png",
        "http://n.sinaimg.cn/news/transform/700/w1000h500/20190902/8f1d-ieaiqii0044002.jpg"
      ]
    };
  },
  methods:{
  showSettingToast: function(e) {
    wx.showModal({
      title: '提示！',
      confirmText: '去设置',
      showCancel: false,
      content: e,
      success: function(res) {
        if (res.confirm) {
          wx.navigateTo({
            url: '../setting/setting',
          })
        }
      }
    })
  },
    getBanner() {
        let params = {
            url: 'get/index/banner',
            data: {}
        }
        get(params).then(res => {
            this.banner = res.data[0].image;
        })
    },
    getResouce(){
        let params = {
            url: 'get/home/resouce',
            data: {}
        }
        post(params).then(res => {
            this.goodResouce = res.data;
        })    
    },
    getGood(){
        let params = {
            url: 'get/hot/goods',
            data: {}
        }
        post(params).then(res => {
            this.goodList = res.data;
        })
    },
    swiperChange: function (e) {
      this.currentSwiper= e.mp.detail.current
    },
    setRouter(path, id, n, t, s) {
      this.$router.push({
        path: path,
        query: { id: id}
      });
    }
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
.hot-day{
    width: 3.75rem;
    margin-top: .1rem;
    overflow: hidden;
    background-color: #fff;
    margin-bottom:15px;
    .hotday-title{
        padding-left: .15rem;
        height: .3rem;
        background-color: #fff;
        p{
            padding-top: .1rem;
        }
        i{
            font-size: .16rem;
            color: rgb(241,58,58)
        }
        img{
            width: .71rem;
            height: .17rem;
            margin-left: .1rem;
        }
    }
    .hotday-cont{
        width: 3.75rem;
        background-color: #fff;
        ul{
            width: 3.45rem;
            margin: 0 auto;
            li{
                width: 100%;
                color:#f01010;
                height: .4rem;
                border-bottom: .01rem solid #eee;
                font-size: .16rem;
                display:flex;
                align-items:center;
                i{
                    font-size: .16rem;
                }
                a{
                    font-size: .16rem;
                    color: #333333;
                    margin-left: .08rem;
                    line-height: 1.29;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    display: -webkit-box;
                    -webkit-line-clamp: 1;
                    -webkit-box-orient: vertical;
                } 
            }
            li:last-child{
                border: 0
            }
        }
    }
}
// 热门
.hot-door{
    width: 3.75rem;
    overflow: hidden;
    background-color: #fff;
    .door-title{
        padding-left: .15rem;
        height: .3rem;
        p{
            padding-top: .1rem;
            i{
                font-size: .18rem;
                color: rgb(243,110,32)
            }
            img{
                width: .71rem;
                height: .17rem;
                margin-left: .06rem;
            }
        }
        i{
            font-size: .18rem;
            color: rgb(243,110,32)
        }
        img{
            width: .71rem;
            height: .17rem;
            margin-left: .06rem;
        }
    }
    .door-cont{
        width: 3.45rem;
        margin: 0 auto;
        margin-top: .1rem;
        overflow: hidden;
        ul{
            width: 3.45rem;
            overflow: hidden;
            height: 1.29rem;
            li{
                margin-right: .1rem;
                margin-bottom: .15rem;
                float: left;
                box-sizing: border-box;
                span{
                    box-sizing: border-box;
                    font-size: .14rem;
                    color: #666666;
                    padding: .07rem .13rem;
                    border: 0.006rem solid #cccccc;
                    border-radius: .18rem;
                    display: inline-block;  
                    a{
                        color: #666;
                    }
                }
            }
        }
        ul.door-start{
            height: auto;
        }
        ul.door-over{
            height: 1.29rem;
        }
        .door-more{
            height: .23rem;
            span{
                font-size: .12rem;
                color: #333333;
            }
            p{
                line-height: 1.29;
            }
            i{
                font-size: .11rem;
                color: #f36e20;
                margin-left: .03rem;
                height: .11rem;
            }
            i.sel{
                transform: rotate(180deg);
            }
        }
    }
}

</style>
