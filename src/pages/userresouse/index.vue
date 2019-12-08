<template>
  <div class="content">
    <div class="tab">
      <div class="tabDiv" v-for="(item,index) in tab" :key="index" @click="tabs(index,item.type)"
        :class="actives==index?'actives':''">
        {{item.name}}
      </div>
    </div>
    <div class="goods-ul" v-if="currentType == 1">
        <div class="li" v-for="(item,index) in listData" :key="index"
            @click="setRouter('/pages/goods/details/main',item.collect_id)">
            <div class="img-box">
            <img :src="item.image[0]" alt="">
            </div>
            <div class="bom">
            <div class="sku-name G-more-cloum G-col-2">{{item.title}}</div>
            <div class="price">
                <span class="G-Fsize-16 G-color-f13a">￥{{item.present_price}}</span>
                <span class="market current-market" v-if="item.discount_price">{{item.discount_price}}元优惠券</span>
            </div>
            </div>
        </div>    
    </div>
    <ul class="commodity-list commoditys" v-if="currentType == 2">
        <li v-for="(item,index) in listData" :key="index" @click="setRouter('/pages/resoures-details/main',item._id)">
             <img :src="item.image[0]" alt="">
            <div class="commodity-attribute" style="width:500rpx">
                <div class="commodity-title">
                    <p class="title">{{item.title}}</p>
                </div>
                <div class="price-num">
                      <i class="iconfont icon-shijian active"></i>
                      <div class="price">{{item.date}}</div>
                  </div>
            </div>
        </li>
    </ul>
    <div class="article" v-if="currentType == 3">
        <div class="article-item" v-for="(item,index) in listData" @click="setRouter('/pages/original-details/main',item._id)">
          <div class="item-info">
            <p class="item-title">{{item.title}}</p>
            <div class="hd-des G-fx-cb">
              <div class="hd-des-left G-fx-cc">
                <span class="article-group G-fx-cc">{{item.interest_name}}</span>
                <span class="article-name">{{item.date}}</span>
              </div>
              <p class="hd-des-right G-fx-cc">
                <i class="article-views G-Fsize-14 G-color-666 iconfont icon-iconset0207"></i>
                <span class="G-Fsize-12 G-color-999">{{item.number != undefined ? item.number : 0 }}人浏览</span>
              </p>
            </div>
          </div>
          <img :src="item.image[0]" class="item-img">
        </div>
    </div>
    <div class="empty-con fl-row-center" v-if="listData.length == 0">
      <span>抱歉，暂无收藏网赚思路</span>
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
      if(wx.getStorageSync('UserInfo').openId == undefined || wx.getStorageSync('UserInfo').openId == ''){
        showPopup('请您先在提交建议前先进行用户授权~');
        return false;
      }else{
          this.getGroups(1);
      }
  },
  components: {
  },
  data() {
    return {
      listData:[],
      page : 1,
      getType:'list',
      tab: [{
            name: '商品收藏',
            type: 1
          },
          {
            name: '网赚思路',
            type: 2
          },
          {
            name: '每日羊毛',
            type: 3
          }
        ],
        actives:0,
        currentType:1
    };
  },
  methods:{
    getGroups(type) {
      let params = {
            url: 'get/collectresoures',
            data: {type:type,page:this.page,rows:5,openId:wx.getStorageSync('UserInfo').openId}
        }
        post(params).then(res => {
          this.page = res.page;
          this.listData = [...this.listData,...res.data];
          this.getType = res.type;
        })
    },

    tabs(idx, type) {
        if (idx == this.actives) {
          return false
        }
        this.listData = []
        this.page = 1;
        this.currentType = type;
        this.getGroups(type)
        this.actives = idx;
    },
    switchRightTab: function (index) {
      index = parseInt(index);
      this.curIndex = index;
    },
    searchListFun(text){
      this.page = 1;
      this.listData = [];
      this.searchList(text);
    },
    setRouter(path,id){
        this.$router.push({ path: path, query: {id:id}})
    },
  },
  onReachBottom() {
    if (this.page == 0) {
      //加载完成
      return false;
    }
      this.getGroups(this.currentType);
  },
    onPullDownRefresh() {
    wx.showNavigationBarLoading();
    this.page = 1;
    this.listData = []
    this.getGroups(this.currentType);
    setTimeout(() => {
      wx.hideNavigationBarLoading();
      wx.stopPullDownRefresh();
    }, 1000);
  },
  watch: {}
};
</script>
<style lang="scss" scoped>
$orange: #f36e20;
.content{  
} 
.goods-ul{
  width:100%;
  background:#f6f6f6;
  padding:.15rem .15rem 0.05rem;
  display: -webkit-flex;
  display: flex;
  -webkit-justify-content: flex-start;
  justify-content: flex-start;
  flex-wrap:wrap;
  padding-top:.5rem;
  .li{
    background:#fff;
    height:2.5rem;
    width:1.7rem;
    margin-bottom:5px;
    margin-right: 5px;
    border-radius:  0.04rem;
  }
  .li:nth-child(2n){
    margin-right: 0;
    
  }
  .img-box{
    width:100%;
    height:1.7rem;
    img{
      width:100%;
      height:100%;
      border-radius: 0.04rem 0.04rem 0rem 0rem;
    }
  }
  .bom{
    height:.8rem;
    padding:.1rem;
    position: relative;
  }
  .sku-name{
    font-size:.14rem;
    color:#333;
    line-height:.18rem;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    overflow: hidden;
  }
  .price{
    width:100%;
    position: absolute;
    bottom:.13rem;
    left:.1rem;
    display: flex;
    align-items: center;
  }
  .market{
    color:white;
    font-size:.1rem;
    padding-left:0.06rem;
    background-color:#FF4500;
    padding:.02rem .05rem;
    border-radius:0.05rem;
    margin-left:0.05rem;
  }
}
 .tab {
    width: 100%;
    height: .44rem;
    background-color: #fff;
    display: -webkit-flex;
    position: fixed;
    left: 0;
    top: 0;
    z-index: 11;

    .tabDiv {
      text-align: center;
      line-height: .44rem;
      font-size: .16rem;
      width: 50%;
    }
  }
.search {
	width: 100%;
  height: .44rem;
  display: -webkit-flex;
  align-items: center;
  background-color: #fff;
  border-bottom: 1px solid #ececec;
  .search-main{
    display:-webkit-flex;
    align-items:center;
    background-color:#f6f6f6;
    position: relative;
    width: 3.55rem;
    margin:0 auto;
    height: .32rem;
    line-height: .32rem;
    padding:.1rem;
    border-radius: .05rem;
    overflow: hidden;
    .iconfont{
      font-size: .16rem;
      opacity: 0.2;
      position: absolute;
      right: .1rem;
      z-index: 999;
    }
  }
  .search-inp{
    width: 100%;
    height: .32rem;
    line-height: .32rem;
    background-color: #f6f6f6;
    color: #333;
    font-size: .14rem;
  }
  .search-close{
    color: #f36e20;
    font-size: .14rem;
    margin:0 .1rem;
  }
}
.navbar{
    height: 44px;
    font-size: 17px;
    background: #fff;
    display: flex;
    align-items: center;
    width: 100%;
  .navbar-inner{
    width:100%;
  }
}
.G-earch-inner {
    height: 100%;
    width: 100%;
    display:flex;
    align-items:center;
    justify-content:center;
    .item {
        text-align: center;
        width: 33%;
        color: #333;
        height: 100%;
        display:flex;
        justify-content:center;
        align-items:center;
        a {
            font-size: .15rem;
            i{
                color: #333;
                font-size: 10px;
            }
        }
        i {
            line-height: 0.8;
            margin-left: 2px;
            font-size: 10px;
        }
        .active{
            color: #f36e20!important;
        }
    }
    .active{
        color: #f36e20;
    }
}
.commodity-list{
  padding-top:.5rem;
  li{
    width: 3.75rem;
    margin-top: .1rem;
    border: solid 0.5px #ececec;
    background-color: #fafafa;
    box-sizing: border-box;
    padding: .1rem;
    display: -webkit-flex;
    display:flex;
    justify-content:space-between;
    margin: 0 auto;
    background:#fff;
    margin:.05rem 0;
    img{
        width: .7rem;
        height: .7rem;
    }
  }
  li:first-child{
      margin-top:0;
  }
}
.commodity-attribute{
  width:2.7rem!important;
  padding-left:.05rem;
}
.commodity-title{
overflow: hidden;
text-overflow: ellipsis;
display: -webkit-box;
-webkit-line-clamp: 2;
-webkit-box-orient: vertical;
height:.35rem;
}
.price-num{
  display:flex;
  justify-content:flex-start;
  margin-top:10px;
  align-items:center;
  i{
    font-size:.12rem;
  }
  .price{
    padding-left:.05rem;
    font-size:.12rem;
  }
}
.fl-row-center{
  text-align: center;
  font-size:16px;
  color:#999;
  padding-top:30rpx;
  width:100%;
}


  .actives {
    color: #f36e20;
    position: relative;
  }

  .actives::before {
    display: block;
    content: '';
    position: absolute;
    left: -.2rem;
    bottom: 0;
    margin-left:50%;
    width: .4rem;
    height: .02rem;
    background-color: #f36e20;
    border-radius: .01rem;
  }

.article {
  padding: 0 0.15rem;
  background-color: #fff;
  padding-top:.5rem;
}
.article-item {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  padding: .1rem 0;
  border-bottom: 1px solid #e7e7e7;
  .item-info {
    width: 2rem;
    .item-title {
      margin-bottom: .15rem;
      font-size: 0.17rem;
      word-break: break-all;
      line-height: 1.5;
      overflow: hidden;
      text-overflow:ellipsis;//文本溢出显示省略号
      display: -webkit-box;
      -webkit-line-clamp: 3;
      -webkit-box-orient: vertical;
    }
    .hd-des-left {
      .article-group {
        font-size: 0.12rem;
        padding: 0.02rem;
        color: $orange;
        border: 0.01rem solid $orange;
        border-radius: 0.03rem;
        display: inline-block;
      }
      .article-name {
        // width: 0.7rem;
        overflow:hidden;
        text-overflow:ellipsis;
        white-space:nowrap;
        font-size: 0.12rem;
        color: #999;
        margin-left: 0.07rem;
      }
      .article-time {
        font-size: 0.12rem;
        color: #999;
        margin-left: 0.03rem;
      }
    }
  }
  .item-img{
    width: 1.34rem;
    height: .75rem;
    border-radius: .03rem;
  }
}
.article-item:last-child{
  border-bottom: none;
}
</style>
