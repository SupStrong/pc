<template>
  <div class="content"> 
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
          <view v-if="cateItems[curIndex].children">
            <block v-for="(item,index) of cateItems[curIndex].children" :key="index">
              <view class="nav_right_items">
              <!--界面跳转 -->
                  <text>{{item.title}}</text>
              </view>
            </block>
          </view>
          <!--如果无数据，则显示数据-->
          <view class="nodata_text" v-else>该分类暂无数据</view>
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
      {id:"1",title:'政策1',children:[{id:1,title:"hello1",childrenId:11}]},
      {id:"2",title:'政策2',children:[{id:2,title:"hello2",childrenId:22}]},
      {id:"3",title:'政策3',children:[{id:3,title:"hello3",childrenId:33}]},
      {id:"4",title:'政策4',children:[{id:4,title:"hello4",childrenId:44}]}],
      curIndex:0,
    };
  },
  methods:{
    switchRightTab: function (index) {
      index = parseInt(index);
      this.curIndex = index;
    }
  },
  watch: {}
};
</script>
<style lang="scss" scoped>

page{  
  background: #ddd;  
  height: 100%;
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
  height: 1000px;  
  padding: 10px;  
  box-sizing: border-box;  
  background:#fff;  
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
</style>
