<template>
  <div class="content">
    <div class="navbar">
      <div class="navbar-inner">
          <div class="G-earch-inner bg-fff" flex="">
              <p class="item compre active" data-id="1" data-type="compre" flex="main:center cross:center">
                  <span id="rankList" class="">最新</span>
                  <a flex="dir:top main:center cross:center" class="">
                    <i class="iconfont icon-shangjiantou" data=""></i>
                    <i class="iconfont icon-xiajiantou1 active"></i>
                  </a>
              </p>
              <p class="item sales active" data-id="2" data-type="sales" flex="main:center cross:center">
                  <span class="">最热</span>
                  <a flex="dir:top main:center cross:center" class="">
                    <i class="iconfont icon-shangjiantou" data=""></i>
                    <i class="iconfont icon-xiajiantou1 active"></i>
                  </a>
              </p>
              <p class="item price active" data-id="3" flex="main:center cross:center" data-type="desc">
                  <span class="">评论</span>
                  <a flex="dir:top main:center cross:center" class="">
                    <i class="iconfont icon-shangjiantou" data=""></i>
                    <i class="iconfont icon-xiajiantou1 active"></i>
                  </a>
              </p>
          </div>
      </div>
    </div>
    <div class="search">
      <div class="search-main">
          <input type="text" v-model="searchText" placeholder="搜索您需要的资源名" confirm-type='search'  @confirm="confirm($event)" @focus="searchChanges" @input="searchChanges" class="search-inp">
          <i class="iconfont icon-sousuo" @click="searchListFun(searchText)"></i>
      </div>
    </div>
    <ul class="commodity-list commoditys">
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
  </div>
</div>

</template>

<script>
import { apiList, configData, getNoLoad, get, post } from "@/http/api.js";
import { mapState, mapMutations } from "vuex";
import { getUrlHistory,sendFormId,showPopup,exchangeEl  } from "@/utils/index.js";
export default {
  onLoad(res) {
    this.getGroups();
  },
  components: {
  },
  data() {
    return {
      listData:[],
      page : 1,
      getType:'list'
    };
  },
  methods:{
    getGroups() {
      let params = {
            url: 'get/details/list',
            data: {page:this.page,rows:5}
        }
        post(params).then(res => {
          this.page = res.page;
          this.listData = [...this.listData,...res.data];
          this.getType = res.type;
        })
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
    // 搜索
    searchList(text){
       let params = {
            url: 'get/search/resouce',
            data: {title:text,page:this.page,rows:5}
        }
        post(params).then(res => {
          this.listData = [...this.listData,...res.data];
          this.page = res.page;
          this.getType = res.type;
        })
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
    if(this.getType =='list'){
      this.getGroups();
    }else{
      this.searchList(this.searchText)
    }
  },
  watch: {}
};
</script>
<style lang="scss" scoped>

.content{  
} 
.search {
	width: 100%;
  height: .44rem;
  display: -webkit-flex;
  align-items: center;
  background-color: #fff;
  border-bottom: 1px solid #ececec;
  margin-top:10px;
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
  background:white;
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
</style>
