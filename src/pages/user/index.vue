<template>
  <div class="content">
    <div class="users">
      <img :src="imgUrl" alt="" class="user-bg">
      <div class="pa-box">
        <div v-if="!hasWxInfo">
          <img class="userImg" :src="userInfo.avatarUrl" alt>
          <div class="names" v-if="userInfo.nickName ==undefined">
            <span class="userInfo">授权您的微信昵称和头像</span>
            <button class="gets" open-type="getUserInfo" @getuserinfo="getUserInfo($event,'unionid','')"></button>
          </div>
          <div class="names" v-else>{{userInfo.nickName}}</div>
        </div>
        <div v-else>
          <div class="userImg">
            <open-data class="avatar" type="userAvatarUrl"></open-data>
          </div>
          <div class="names fl-column-start">
            <open-data type="userNickName" class="nickName"></open-data>
          </div>
        </div>
        <!-- panel -->
        <div class="inner-box fl-row-around">
          <div class="fl-column-center" 
            v-for="(item,index) in dashboard.panel" :key='index'
            @click="(index<2?!hasWxInfo:!hasUserInfo) ? false : setRouter(pagePath[index].path)">
            <button
              class="number"
              v-if="!hasWxInfo && index<2"
              open-type="getUserInfo"
              @getuserinfo="getUserInfo($event,'unionid',pagePath[index].path)"
            ></button>
            <button
              class="number"
              v-if="!hasUserInfo && index>=2"
              open-type="getPhoneNumber"
              @getphonenumber="authorization($event,'mobile',pagePath[index].path)"
            ></button>
            <span class="title">{{item.number}}</span>
            <p class="fl-row-center">{{item.name}}</p>
            <span class="line" v-if="index!=3"></span>
          </div>
        </div>
      </div>
    </div>

    <div class="single-box">
      <div class="head fl-row-left"><span class="G-Fsize-16 G-Fweight-700 G-color-333">更多</span></div>
      <div class="more fl-row-left">
        <div class="fl-column-center box" @click="!hasWxInfo ? showTips() : setRouter('/pages/userresouse/main')">
          <i class="iconfont iconshoucang- G-color-f13a"></i>
          <p class="fl-row-center">收藏</p>
        </div>
        <div class="fl-column-center box">
          <button
            class="number"
            v-if="!hasUserInfo"
            open-type="getPhoneNumber"
            @getphonenumber="authorization($event,'mobile','/pages/dashboard/ask-answer/main')"
          ></button>
          <i class="iconfont iconwenda G-color-bule1"></i>
          <p class="fl-row-center">问答</p>
        </div>
        <div class="fl-column-center box" @click="!hasUserInfo ? false : setRouter('/pages/dashboard/my-house/main')">
          <button
            class="number"
            v-if="!hasUserInfo"
            open-type="getPhoneNumber"
            @getphonenumber="authorization($event,'mobile','/pages/dashboard/my-house/main')"
          ></button>
          <i class="iconfont iconshafa G-color-f36e"></i>
          <p class="fl-row-center">房屋</p>
        </div>
        <div class="fl-column-center box" @click="!hasWxInfo ? false :setRouter('/pages/dashboard/promote/main')">
          <button
            class="number"
            v-if="!hasWxInfo"
            open-type="getUserInfo"
            @getuserinfo="getUserInfo($event,'unionid','/pages/dashboard/promote/main')"
          ></button>
          <i class="iconfont iconbaifenbi G-color-f13a"></i>
          <p class="fl-row-center">优惠</p>
        </div>
        <div class="fl-column-center box" @click="!hasWxInfo ? false : setRouter('/pages/dashboard/gift/gift-list/main')">
          <button
            class="number"
            v-if="!hasWxInfo"
            open-type="getUserInfo"
            @getuserinfo="getUserInfo($event,'unionid','/pages/dashboard/gift/gift-list/main')"
          ></button>
          <i class="iconfont iconlipin G-color-f36e"></i>
          <p class="fl-row-center">礼品</p>
        </div>
        <div class="fl-column-center box" @click="!hasWxInfo ? false : setRouter('/pages/saled/list/main')">
          <button
            class="number"
            v-if="!hasWxInfo"
            open-type="getUserInfo"
            @getuserinfo="getUserInfo($event,'unionid','')"
          ></button>
          <i class="iconfont iconweixiu G-color-f36e"></i>
          <p class="fl-row-center">售后</p>
        </div>
        <div class="fl-column-center box" @click="!hasWxInfo ? false :setRouter('/pages/partner/my-message/message-list/main')">
          <button
            class="number"
            v-if="!hasWxInfo"
            open-type="getUserInfo"
            @getuserinfo="getUserInfo($event,'unionid','/pages/partner/my-message/message-list/main')"
          ></button>
          <i class="iconfont iconxiaoxitongzhi G-color-f13a"></i>
          <p class="fl-row-center">消息</p>
        </div>
        <div class="fl-column-center box" @click="!hasWxInfo ? false :setRouter('/pages/dashboard/vip-card/list/main')">
          <i class="iconfont iconxinbaniconshangchuan- color-BE8F77 cards-icon"></i>
          <p class="fl-row-center cards-font">会员</p>
        </div>
        <div class="fl-column-center box" @click="!hasWxInfo ? false :setRouter('/pages/dashboard/setting/main')">
          <i class="iconfont iconshezhi G-color-bule1"></i>
          <p class="fl-row-center">设置</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { apiList, configData, getNoLoad, get, post } from "@/http/api.js";
import { mapState, mapMutations } from "vuex";

import {
  showPopup,
  Login,
  outLogin,
  LockunionId,
  shareMessage,
  getLogin
} from "@/utils/index.js";
import { setTimeout } from "timers";
const app = getApp();
export default {
  data() {
    return {
      userInfo: {
        avatarUrl: "/static/images/user/avatar.png"
      },
      cityData: {
        id: "110100",
        name: "北京站"
      },
      partner: { isPartner: 0 },
      storeData: {
        receive_amount:'--',
        amount:'--',
        partner_rate:'--'
      },
      dashboard:{
        'order':[
          {
            'number':'--',
            "name":'店员上传'
          },
          {
            'number':'--',
            "name":'线上订单'
          }
        ],
        'cash':[
          {
            'number':'--',
            "name":'返现单'
          },
          {
            'number':'--',
            "name":'已返现'
          }
        ],
        'panel':[
          {
            'number':'--',
            "name":'优惠券'
          },
          {
            'number':'--',
            "name":'活动'
          },
          {
            'number':'--',
            "name":'日志'
          },
          {
            'number':'--',
            "name":'预约'
          }
        ]
      },
      pagePath:[
        {
          path:'/pages/coupons/list/main'
        },
        {
          path:'/pages/dashboard/activity/main'
        },
        {
          path:'/pages/dashboard/my-log/main'
        },
        {
          path:'/pages/reservation/list/main'
        },
      ],
      withdraw:{
        'balance':'--',
        'used_price': '--'
      },
    };
  },
  onLoad(res) {
    if(wx.getStorageSync('UserInfo') !=""){
      this.userInfo = wx.getStorageSync('UserInfo')
      this.SetUserInfo(wx.getStorageSync('UserInfo'))
    }
  },
  onShow() {
      if(wx.getStorageSync('UserInfo') !=""){
      this.userInfo = wx.getStorageSync('UserInfo')
    }
  },
  onTabItemTap(item) {
    app.aldstat.sendEvent("按钮-厨百底部导航-我的");
  },
  onPullDownRefresh() {
    wx.showNavigationBarLoading();
    this.getDashBoard();
    this.getWithdraw();
    this.checkIsPartner();
    setTimeout(() => {
      wx.hideNavigationBarLoading();
      wx.stopPullDownRefresh();
    }, 1000);
  },
  onShareAppMessage: function() {
    let that = this;
    return {
      title: "厨卫百分百登陆授权",
      path:
        "/pages/user/index/main?cityDataId=" +
        wx.getStorageSync("cityData").id +
        "&cityDataName=" +
        wx.getStorageSync("cityData").name,
      imageUrl: ""
    };
  },
  computed: {
    ...mapState({
      userInfo: state => state.userInfo,
      hasWxInfo: function(state) {
        console.log(wx.getStorageSync('UserInfo').openId,"a/")
        if (state.userInfo.openId) {
          return true;
        }
          return false;
      },
    })
  },
  methods: {
    ...mapMutations(["SetUserInfo"]),
    getUserInfo(e) {
      var that = this;
      if (e.target.errMsg == 'getUserInfo:ok') {
            getLogin(e.target.encryptedData, e.target.iv,function(res){
                wx.setStorageSync('UserInfo',res)
                that.SetUserInfo(res)
            })
        } else {
            setTimeout(function() {
                showPopup('为更好服务您,请同意授权。', 0);
            }, 300)
        }
    },
  showTips(){
    showPopup('请您先进行用户授权~')
  },
  setRouter(path,id){
      this.$router.push({ path: path, query: {}})
  },
  },
  watch: {
  }
};
</script>

<style lang="scss" scoped>
$orange: #f36e20;
page{
  height: unset;
}
.content {
  overflow: hidden;
  width: 100%;
  position: relative;
  padding-bottom: .05rem;
}
.userInfo {
  display: -webkit-flex;
  align-items: center;
  justify-content: center;
  width: 2rem;
  line-height: .4rem;
  background-color: #f36e20;
  border-radius: 4px;
  font-size: 0.16rem;
  color: #fff;
}

.users {
  position: relative;
  height:1.35rem;
  margin-bottom: 0.7rem;
  .user-bg{
    width:100%;
    height:100%;
    display: block;
  }
}

.gets {
  display: block;
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  border-radius: 0.17rem;
  border: solid 1px $orange;
  opacity: 0;
}

.number {
  display: block;
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  border-radius: 0.17rem;
  border: solid 1px $orange;
  opacity: 0;
}
.pa-box{
  width:3.45rem;
  background:rgba(255,255,255,1);
  border-radius:6px;
  position:absolute;
  top:.4rem;
  left:-1.725rem;
  z-index:2;
  margin-left:50%;

  .userImg {
    width: 0.6rem;
    height: 0.6rem;
    border-radius: 50%;
    background-color: #fafafa;
    border: solid 2px #ffffff;
    box-shadow: 0px 1px 5px 0px #FEF3F3;
    overflow: hidden;
    position: absolute;
    top:-.2rem;
    left:.1rem;
    .avatar {
      width: 100%;
      height: 100%;
      border-radius: 50%;
    }
  }
}

.names{
  width:100%;
  height:100%;
  height: .7rem;
  padding-left: .8rem;
  padding-top: .15rem;
  .nickName{
    font-weight: bold;
    margin-bottom: .08rem;
    font-size: .2rem;
  }
  .identity {
    height:.24rem;
    line-height: 0.24rem;
    background:#ECECEC;
    border-radius: .12rem;
    font-size: 0.14rem;
    color: #666;
    padding-left: .3rem;
    padding-right: .1rem;
    position: relative;
    span{
      position: absolute;
      left: 0;
      top: 0;
      border-radius: 50%;
      background: #f36e20;
      width: .24rem;
      height: .24rem;
      i{
        color: #fff;
        font-size: .12rem;
      }
    }
  }
  .tel{
    width:.90rem;
    height:.27rem;
    line-height: .27rem;
    background:rgba(243,110,32,1);
    border-radius:4px;
    color: #fff;
    font-size: .14rem;
    text-align: center;
  }
}
.inner-box {
  width: 3.45rem;
  height: 0.8rem;
  background-color: #ffffff;
  border-radius: 0.04rem;
  .fl-column-center {
    position: relative;
    width: 33%;
    .title {
      font-size: 0.2rem;
      color: #333;
      margin-bottom: 0.1rem;
    }
    p {
      color: #666;
      font-size: 0.12rem;
    }
    .line {
      position: absolute;
      right: 0;
      top: 50%;
      margin-top: -0.08rem;
      width: 0.01rem;
      height: 0.16rem;
      background-color: #ececec;
    }
  }
}
.single-box{
  padding: 0.15rem .1rem 0;
  width: 3.45rem;
  background-color: #ffffff;
  border-radius: 0.04rem;
  margin: 0 auto 0.1rem;
  position: relative;
  .head{
    i{
      color: #f36e20;
      font-size: .18rem;
      margin-right: .07rem;
    }
  }
  .inner-box {
    width: 3.25rem;
    .item{
      width: 1.25rem;
      .title {
        font-size: 0.18rem;
      }
      p{
        color: #999;
        font-size: .12rem;
      }
    }
    .btn{
      width:.75rem;
      height:.3rem;
      line-height: .3rem;
      text-align: center;
      color: #fff;
      font-size: .14rem;
      background:rgba(243,110,32,1);
      border-radius:4px;
    }
  }
  .more{
    width: 3.25rem;
    padding: .2rem .09rem 0;
    .box{
      width: .6rem;
      margin-right: .22rem;
      margin-bottom: .2rem;
      position: relative;
      &:nth-child(4n){
        margin-right: 0;
      }
      i{
        font-size: .24rem;
        margin-bottom: .1rem;
      }
      span{
        font-size: .14rem;
      }
      p{
        font-size: .14rem;
      }
    }

  }
}
.color-BE8F77{
  color: #BE8F77
}
.cards-icon{
  margin-top: -.04rem;
  font-size: .28rem !important;
  margin-bottom: .07rem !important
}
.cards-font{
  font-size: .15rem !important
}
</style>
