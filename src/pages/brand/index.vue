<template>
  <div class="content">
    <div class="search">
      <div class="search-main">
          <input type="text" v-model="searchText" placeholder="搜索您需要的品牌名" confirm-type='search'  @confirm="confirm($event)" @focus="searchChanges" @input="searchChanges" class="search-inp">
          <i @click.stop="closeSearch" v-if="searchChange" class="iconfont iconshanchu"></i>
      </div>
    </div>
      <view class="container">
        <!--左侧栏-->
        <view class="nav_left">
          <block v-for="(item,index) of cateItems" :key="index">
            <view class="nav_left_items G-fx-cc" :class="[curIndex == index ? 'active' : '']" @click="switchRightTab(index)">{{item.title}}</view>
          </block>
        </view>
        <!--右侧栏-->
        <view class="nav_right">
          <!--如果有数据，才遍历项-->
          <div class="listBrand">
              <div
                class="brand"
                v-for="(item,index) in cateItems[curIndex].children"
                :key="index"
                @click="setRouter('/pages/goods/list/main',item.id)"
              >
                <img class="img" :src="item.logo" alt>
                <div class="brandName G-one-cloum">{{item.name}}</div>
              </div>
          </div>
        </view>
      </view>
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
      cateItems :[   
      {id:"1",title:'小狗',children:[
         {logo:'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=3647170051,871438825&fm=26&gp=0.jpg',name:"狗大脸"},
         {logo:'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=3647170051,871438825&fm=26&gp=0.jpg',name:"狗大脸"},
         {logo:'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=3647170051,871438825&fm=26&gp=0.jpg',name:"狗大脸"},
         {logo:'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=3647170051,871438825&fm=26&gp=0.jpg',name:"狗大脸"},
         {logo:'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=3647170051,871438825&fm=26&gp=0.jpg',name:"狗大脸"},
         {logo:'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=3647170051,871438825&fm=26&gp=0.jpg',name:"狗大脸"},
         {logo:'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=3647170051,871438825&fm=26&gp=0.jpg',name:"狗大脸"},
         {logo:'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=3647170051,871438825&fm=26&gp=0.jpg',name:"狗大脸"},
         {logo:'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=3647170051,871438825&fm=26&gp=0.jpg',name:"狗大脸"},
         {logo:'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=3647170051,871438825&fm=26&gp=0.jpg',name:"狗大脸"},
         {logo:'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=3647170051,871438825&fm=26&gp=0.jpg',name:"狗大脸"},
         {logo:'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=3647170051,871438825&fm=26&gp=0.jpg',name:"狗大脸"},
         {logo:'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=3647170051,871438825&fm=26&gp=0.jpg',name:"狗大脸"},
         {logo:'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=3647170051,871438825&fm=26&gp=0.jpg',name:"狗大脸"},
         {logo:'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=3647170051,871438825&fm=26&gp=0.jpg',name:"狗大脸"},
         {logo:'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=3647170051,871438825&fm=26&gp=0.jpg',name:"狗大脸"},
         {logo:'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=3647170051,871438825&fm=26&gp=0.jpg',name:"狗大脸"},
         {logo:'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=3647170051,871438825&fm=26&gp=0.jpg',name:"狗大脸"},
         {logo:'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=3647170051,871438825&fm=26&gp=0.jpg',name:"狗大脸"},
         {logo:'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=3647170051,871438825&fm=26&gp=0.jpg',name:"狗大脸"},
         {logo:'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=3647170051,871438825&fm=26&gp=0.jpg',name:"狗大脸"},
         {logo:'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=3647170051,871438825&fm=26&gp=0.jpg',name:"狗大脸"},
         {logo:'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=3647170051,871438825&fm=26&gp=0.jpg',name:"狗大脸"},
         {logo:'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=3647170051,871438825&fm=26&gp=0.jpg',name:"狗大脸"},
         {logo:'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=3647170051,871438825&fm=26&gp=0.jpg',name:"狗大脸"},
         {logo:'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=3647170051,871438825&fm=26&gp=0.jpg',name:"狗大脸"},
         {logo:'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=3647170051,871438825&fm=26&gp=0.jpg',name:"狗大脸"},
         {logo:'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=3647170051,871438825&fm=26&gp=0.jpg',name:"狗大脸"},
         {logo:'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=3647170051,871438825&fm=26&gp=0.jpg',name:"狗大脸"},
         {logo:'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=3647170051,871438825&fm=26&gp=0.jpg',name:"狗大脸"},
         {logo:'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=3647170051,871438825&fm=26&gp=0.jpg',name:"狗大脸"},
         {logo:'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=3647170051,871438825&fm=26&gp=0.jpg',name:"狗大脸"},
         {logo:'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=3647170051,871438825&fm=26&gp=0.jpg',name:"狗大脸"},
         {logo:'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=3647170051,871438825&fm=26&gp=0.jpg',name:"狗大脸"},
         {logo:'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=3647170051,871438825&fm=26&gp=0.jpg',name:"狗大脸"},
         {logo:'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=3647170051,871438825&fm=26&gp=0.jpg',name:"狗大脸"},
         {logo:'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=3647170051,871438825&fm=26&gp=0.jpg',name:"狗大脸"},
         {logo:'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=3647170051,871438825&fm=26&gp=0.jpg',name:"狗大脸"},
         {logo:'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=3647170051,871438825&fm=26&gp=0.jpg',name:"狗大脸"},
         {logo:'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=3647170051,871438825&fm=26&gp=0.jpg',name:"狗大脸"},
         {logo:'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=3647170051,871438825&fm=26&gp=0.jpg',name:"狗大脸"},
         {logo:'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=3647170051,871438825&fm=26&gp=0.jpg',name:"狗大脸"},
         {logo:'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=3647170051,871438825&fm=26&gp=0.jpg',name:"狗大脸"},
         {logo:'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=3647170051,871438825&fm=26&gp=0.jpg',name:"狗大脸"},
         {logo:'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=3647170051,871438825&fm=26&gp=0.jpg',name:"狗大脸"},
         {logo:'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=3647170051,871438825&fm=26&gp=0.jpg',name:"狗大脸"},
         {logo:'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=3647170051,871438825&fm=26&gp=0.jpg',name:"狗大脸"},
         {logo:'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=3647170051,871438825&fm=26&gp=0.jpg',name:"狗大脸"},
         {logo:'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=3647170051,871438825&fm=26&gp=0.jpg',name:"狗大脸"},
         {logo:'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=3647170051,871438825&fm=26&gp=0.jpg',name:"狗大脸"},
         {logo:'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=3647170051,871438825&fm=26&gp=0.jpg',name:"狗大脸"},
         {logo:'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=3647170051,871438825&fm=26&gp=0.jpg',name:"狗大脸"},
         {logo:'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=3647170051,871438825&fm=26&gp=0.jpg',name:"狗大脸"},
         {logo:'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=3647170051,871438825&fm=26&gp=0.jpg',name:"狗大脸"},
         {logo:'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=3647170051,871438825&fm=26&gp=0.jpg',name:"狗大脸"},
         {logo:'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=3647170051,871438825&fm=26&gp=0.jpg',name:"狗大脸"},
         {logo:'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=3647170051,871438825&fm=26&gp=0.jpg',name:"狗大脸"}
      ]},
      {id:"2",title:'小猫',children:[
        {logo:'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=3389412202,3441609535&fm=26&gp=0.jpg',name:"猫小脸"}
      ]},
      {id:"3",title:'小猪',children:[
        {logo:'https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=4135477902,3355939884&fm=26&gp=0.jpg',name:"猪圆脸"}
      ]},
      {id:"4",title:'小羊',children:[
        {logo:'https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=1176078931,2627391218&fm=26&gp=0.jpg',name:"羊尖脸"}         
      ]}],
      curIndex:0,
    };
  },
  methods:{
    switchRightTab: function (index) {
      index = parseInt(index);
      this.curIndex = index;
    },
    setRouter (path,id){
        this.$router.push({ path: path, query: {storeId:this.storeId,id:id,guide_id:this.guideId} })
    },
  },
  watch: {}
};
</script>
<style lang="scss" scoped>

.content{  
  background: #ddd;  
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

/*总体主盒子*/  
.container {  
  position: relative;  
  width: 100%;  
  height: 100%;  
  color: #939393;  
}
 /*左侧栏主盒子*/  
.nav_left{  
  /*设置行内块级元素（没使用定位）*/  
  display: inline-block;  
  width: 25%;  
  height: 100%;  
  /*主盒子设置背景色为灰色*/  
  background: #f5f5f5;  
  text-align: center; 
  position: absolute;
  top: 0;
  left: 0; 
  margin-top:.05rem;
}  
/*左侧栏list的item*/  
.nav_left .nav_left_items{  
  /*每个高30px*/  
  height: .5rem;  
  /*再设上下padding增加高度，总高42px*/  
  padding: .06rem 0;
  /*文字14px*/  
  font-size: .14rem; 
}  
/*左侧栏list的item被选中时*/  
.nav_left .nav_left_items.active{  
  /*背景色变成白色*/  
  background: #fff;  
  color: #f0145a; 
}  
/*右侧栏主盒子*/  
.nav_right{  
  /*右侧盒子使用了绝对定位*/  
  position: absolute;  
  top: 0;  
  right: 0;  
  flex: 1;  
  /*宽度75%，高度占满，并使用百分比布局*/  
  width: 75%;  
  height:calc(100vh - 100rpx);
  overflow:scroll;
  padding: 10px;  
  box-sizing: border-box;  
  background:#fff;  
  margin-top:.05rem;
}  
/*右侧栏list的item*/  
.nav_right .nav_right_items{  
  /*浮动向左*/  
  float: left;  
  /*每个item设置宽度是33.33%*/  
  width: 100%;  
  height: 50px;  
  text-align: left;
  padding-left: 20rpx;  
  border-bottom: 1px solid #dedede;  
}  
.nav_right .nav_right_items image{  
  /*被图片设置宽高*/  
  width: 60px;  
  height: 60px;  
  margin-top: 15px;  
}  
.nav_right .nav_right_items text{  
  /*给text设成块级元素*/  
  display: block;  
  margin-top: 15px;  
  font-size: 14px;  
  color: black;
  /*设置文字溢出部分为...*/  
  overflow: hidden;  
  white-space: nowrap;  
  text-overflow: ellipsis;  
} 
.nodata_text
{
  color: black;
  font-size: 14px;  
  text-align: center;  
}

.listBrand {
  display: -webkit-flex;
  flex-wrap: wrap;
  height:auto;
  overflow:scroll;
  .brand {
    width: calc(100% / 3);
    display: -webkit-flex;
    background-color: #fff;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
    position: relative;
    padding-top:.05rem;
    .img {
      max-width: 0.75rem;
      max-height: 0.75rem;
    }

    .brandName {
      margin-top: 0.1rem;
      font-size: 0.14rem;
    }
  }
}

.invalid {
  width: 100%;
  position: absolute;
  left: 0;
  top: 0;
  height: 1.83rem;
  background-color: rgba(0, 0, 0, 0.7);
  display: -webkit-flex;
  align-items: center;
  justify-content: center;
  color: #fff !important;
  font-weight: normal;
}
.is {
  width: 100%;
  height: 0.44rem;
}
.nothing {
  width: 100%;
  justify-content: center;
  display: -webkit-flex;
  color: #666;
  align-items: center;
  font-size: 0.16rem;
  margin-top: 0.6rem;
}

</style>
