<template>
    <div class="container">
      <div class="painter_main">
        <painter :customStyle="customStyle" @imgOK="onImgOk" :palette="template" :dirty="true"/>
      </div>
          <div class="save-button G-form" @click="getUserBtn ? false : saveToCarame()"  v-if="authorization == false">
            <button v-if="getUserBtn"
              open-type="getUserInfo"
              @getuserinfo="getImpower($event)" class="get-button">
            </button>
            <form @submit="getFormId" report-submit="true">
              <span>保存二维码至相册
                  <button form-type="submit" class="G-form-btn" ></button>
              </span>
            </form>
          </div>
      <div class="save-button" :class="iphoneModel?'X':''" v-if="authorization == true">
        <span class="setting">
          打开授权设置页
          <button open-type="openSetting"></button>
        </span>
      </div>
    </div>
</template>

<script>
import {
  apiList,
  configData,
  getNoLoad,
  postNoLoad,
  get,
  post
} from "@/http/api.js";
import { showPopup, sendFormId } from "@/utils/index.js";
import { mapState, mapMutations } from "vuex";
import Card from './card';
const card = new Card();
const customStyle = 'margin: 19px 15px 0 15px;'
export default {
  onLoad(res) {
    var _that = this;
    let obj = Object.assign(
      JSON.parse(JSON.stringify({mini_code:'http://www.cw100.com/www/image/wechat.jpg',name:"您好啊小帅哥"})),
      JSON.parse(JSON.stringify(_that.task))
    );
    _that.template = card.do(obj);
  },
  data () {
    return {
      shareImg: '',
      customStyle: customStyle,
      template: {},
      CurrentInfo:{},
      authorization:false,
      task:{
        type: "task",
        bg: "http://api.cw100.cn//minipro/admin-guide/poster/task.png",
        mini_code:"http://www.cw100.com/www/image/wechat.jpg",
        name:"您好啊小帅哥"
      },
      getUserBtn:true,
    }
  },
  onShow() {
    var _that = this;
    _that.routeData = _that.$root.$mp.query;
    wx.getSetting({
      success(res) {
        if ("scope.writePhotosAlbum" in res.authSetting) {
          if (res.authSetting["scope.writePhotosAlbum"] == true) {
            _that.authorization = false;
          } else {
            _that.authorization = true;
          }
        }else if(res.authSetting['scope.userInfo']){
            _that.getUserBtn = false;
          }
        else {
          _that.authorization = false;
        }
      }
    });
  },
  methods: {
    onImgOk (e) {
      this.shareImg = e.mp.detail.path
    },
    saveToCarame() {
      let _this = this;
      wx.showLoading({
        title: "图片保存中..."
      });
      wx.getSetting({
        success(res) {
          if (res.authSetting["scope.writePhotosAlbum"] == true) {
            _this.authorization = false;
            wx.saveImageToPhotosAlbum({
              filePath: _this.shareImg,
              success: function() {
                wx.hideLoading();
                showPopup("已成功保存",1);
              }
            });
          }
          if (!res.authSetting["scope.writePhotosAlbum"]) {
            wx.authorize({
              scope: "scope.writePhotosAlbum",
              success() {
                _this.authorization = false;
                wx.saveImageToPhotosAlbum({
                  filePath: _this.shareImg,
                  success: function() {
                    wx.hideLoading();
                    showPopup("已成功保存", 1);
                  }
                });
              },
              fail(errMsg) {
                _this.authorization = true;
                showPopup("请点击授权按钮", 0);
              }
            });
          }
          if(res.authSetting['scope.userInfo']){
            _this.getUserBtn = false;
          }
        }
      });
    },
    getImpower(e){
      if(e.mp.detail.errMsg == 'getUserInfo:ok'){
        this.getOpenID(e.mp.detail.encryptedData,e.mp.detail.iv)
      }
    },
    getFormId(e) {
      sendFormId(e);
    },
  }
}
</script>
<style lang="scss" scoped>
.container {
  width: 100%;
  height: 100%;
  position: relative;
}
.painter_main{
  width: 100%;
  height: 823rpx;
  canvas{
    margin: 0 auto;
  }
}
  .save-button {
    width: 3.45rem;
    height: 0.45rem;
    line-height: 0.45rem;
    text-align: center;
    color: #fff;
    font-size: 0.16rem;
    margin: 0 auto;
    background: #f36e20;
    border-radius: 0.05rem;
    margin-top: 0.4rem;
    &.X{ 
      border-radius: 0.23rem;
      width: 3.45rem;
      margin:.05rem auto;
    }
    i {
      color: #fff;
      font-size: 0.14rem;
      margin-right: 5px;
      padding-top: 2px;
    }
    button {
      position: absolute;
      top: 0;
      left: 0;
      height: 0.45rem;
      width: 100%;
      line-height: 0.45rem;
      text-align: center;
      color: #fff;
      font-size: 0.16rem;
      opacity: 0;
    }
    .setting {
      display: block;
      height: 0.45rem;
      position: relative;
      button {
        position: absolute;
        top: 0;
        left: 0;
        height: 0.45rem;
        width: 100%;
        line-height: 0.45rem;
        text-align: center;
        color: #fff;
        font-size: 0.16rem;
        opacity: 0;
      }
    }
  }
</style>
