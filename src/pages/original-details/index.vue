<template>
  <div class="content">
    <div class="hd G-bg-white">
      <p class="article-title">{{routeData.title}}</p>
      <div class="hd-des G-fx-cb">
        <div class="hd-des-left G-fx-cc">
          <span class="article-name">{{routeData.author}}</span>
          <span class="article-time">{{routeData.date}}</span>
        </div>
        <p class="hd-des-right">
          <span class="article-views G-Fsize-12">{{routeData.number != undefined ? routeData.number : 0}}</span>
          <span class="G-Fsize-12 G-color-999">人浏览</span>
        </p>
      </div>
    </div>
      <div class="bd G-bg-white">
          <div class="article-des" v-html="articleDes"></div>
      </div>
      <div class="top-con G-bg-white" @click="setTop()">
        <span class="icon-content G-fx-cc">
          <i :class="['iconfont','icon-aixin',isTop ? 'active': '' ]"></i>
        </span>
        <p class="top-num">人推荐</p>
      </div>
    </div>
  </div>
</template>

<script>
import { apiList, configData, getNoLoad, get, post } from "@/http/api.js";
import { mapState, mapMutations } from "vuex";
import { showPopup,shareMessage,exchangeEl } from "@/utils/index.js";
export default {
  onLoad() {
    this.routeData = this.$root.$mp.query;
    this.updateinitData(this.routeData.id);
  },
  onshow(){
  },
  components: {},
  data() {
    return {
      id: 0,
      routeData:{details:null},
      isTop: false,
      postData:{
        openId:"",
        original:[]
      }
    };
  },
  computed: {
    articleDes() {
      if(this.routeData.details != null){
        let prefix = this.routeData.details.replace(
          /\<img src="\//gmi,
          '<img src="'+configData.hostImg
        );
        return exchangeEl(prefix)
      }
    }
  },
  methods: {
    initData(id){
      let openid = "";
      wx.getStorageSync('UserInfo').openId == undefined || wx.getStorageSync('UserInfo').openId == '' ? openId = "" : openid = wx.getStorageSync('UserInfo').openId
        let params = {
            url: 'get/info/details',
            data: {id:id,openId:openid}
        }
        post(params).then(res => {
          this.routeData = res.data[0];
          this.isTop = res.status
        })
    },
    // 更新
    updateinitData(id){
      let params = {
          url: 'update/details/number',
          data: {id:id}
      }
      post(params).then(res => {
          this.initData(this.routeData.id);
      })
    },
    //路由
    setRouter(path, id, n, t, s) {
      this.$router.push({
        path: path,
        query: { id: id, name: n, title: t, search: s }
      });
    },
    setTop() {
      if(wx.getStorageSync('UserInfo').openId == undefined || wx.getStorageSync('UserInfo').openId == ''){
        showPopup('请您先在用户页面进行用户授权~');
        return false;
      }  
      this.postData.openId = wx.getStorageSync('UserInfo').openId;
      this.postData.original.push(this.routeData._id);
      let that = this;
      let params = {
        url: 'collectoriginal',
        data:this.postData
      };
        post(params).then(res => {
          if (res.code) {
            showPopup(res.message);
            this.isTop = res.status;
          }else{
            this.isTop = res.status;
            showPopup(res.message);
          }
        });
    },
  },
  watch: {}
};
</script>

<style lang="scss" scoped>
$orange: #f36e20;
.hd {
  padding: 0.15rem;
  .article-title {
    margin-bottom: 0.1rem;
    font-size: 0.2rem;
    color: #333;
    line-height: 0.28rem;
  }
  .hd-des {
  }
  .hd-des-left {
    .article-group {
      font-size: 0.12rem;
      padding: 0.03rem;
      color: $orange;
      border: 0.01rem solid $orange;
      border-radius: 0.03rem;
      display: inline-block;
    }
    .article-name {
      font-size: 0.12rem;
      color: #999;
      margin-left: 0.1rem;
    }
    .article-time {
      font-size: 0.12rem;
      color: #999;
      margin-left: 0.05rem;
    }
  }
  .article-views {
    color: $orange;
  }
}
.bd {
  padding: 0 0.15rem .15rem .15rem;
  overflow: hidden;
  .remark {
    width: 3.45rem;
    margin: 0 auto 0.1rem auto;
    height: auto;
    background-color: #fafafa;
    padding: 0.1rem;
  }
  .remark-con {
    width: 3.23rem;
    margin: 0 auto;
    position: relative;
    padding: 0.1rem;
    .remark-text {
      display: inline-block;
      font-size: 0.18rem;
      line-height: 0.26rem;
    }
    .remark-img {
      position: absolute;
      left: 0;
      top: 0;
      width: 0.08rem;
      height: 0.08rem;
      display: inline-block;
      &.bottom {
        right: 0;
        bottom: 0;
        left: unset;
        top: unset;
        transform: rotate(180deg);
      }
    }
  }
}
.ft {
  padding: 0.22rem 0.15rem 0.2rem;
  .tag-con {
    display: flex;
    flex-wrap: wrap;
    overflow: hidden;
    height: 0.23rem;
    margin-bottom: 0.24rem;
    .iconfont {
      color: #cccccc;
      font-size: 0.2rem;
      margin-right: 0.07rem;
    }
    .tag-item {
      display: flex;
      align-items: center;
    }
    .tag-item-split {
      margin: 0 0.05rem;
      color: $orange;
      font-size: 0.12rem;
    }
  }
  .top-con {
    margin: 0 auto;
    &.active {
      .icondianzan {
        color: $orange;
      }
    }
    .icon-content {
      width: 0.45rem;
      height: 0.45rem;
      margin: 0 auto 0.12rem auto;
      border-radius: 50%;
      box-shadow: 0px 3px 5px 0 rgba(0, 0, 0, 0.2);
      background-color: #f7f7f7;
    }
    .iconfont {
      font-size: 0.22rem;
      color: #cccccc;
    }
    .top-num {
      text-align: center;
      font-size: 0.14rem;
      color: $orange;
    }
  }
}
.banner-money{
  width:100%;
  height:1.8rem;
  margin-top:.1rem;
  img{
    width:100%;
    height:100%;
  }
}
.top-con {
    margin: 0 auto;
    &.active {
      .icondianzan {
        color: $orange;
      }
    }
    .icon-content {
      width: 0.45rem;
      height: 0.45rem;
      margin: 0 auto 0.12rem auto;
      border-radius: 50%;
      box-shadow: 0px 3px 5px 0 rgba(0, 0, 0, 0.2);
      background-color: #f7f7f7;
    }
    .iconfont {
      font-size: 0.22rem;
      color: #cccccc;
    }
    .top-num {
      text-align: center;
      font-size: 0.14rem;
      color: $orange;
    }
}
  .active{
    color: red!important;
  }
</style>
