<template>
    <!--banner end -->
    <div class="goods-ul">
      <div class="li" v-for="(item,index) in cateItemsData" :key="index"
      @click="setRouter('/pages/goods/details/main',item._id)">
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
      <div class="empty-con fl-row-center" v-if="cateItemsData.length == 0">
        <span>抱歉，暂无商品信息</span>
      </div>
    </div>
</template>

<script>
import { apiList, configData, getNoLoad, get, post } from "@/http/api.js";
import { mapState, mapMutations } from "vuex";
import { previewImage,showPopup } from '@/utils/index';
export default {
  onLoad() {
    // 传值 0搜索 1列表
    this.cateItemsData = [];
    this.routeData = this.$root.$mp.query;
    this.routeData.type==1 ? this.getCouponChidelist(this.routeData.id) : this.getSearchChidelist(this.routeData.id);
  },
  components: {},
  data() {
    return {
      cateItemsData:[],
      page:1
    };
  },
  computed: {},
  methods: {
    swiperChange: function (e) {
      this.banner.currentSwiper = e.mp.detail.current
    },
    getCouponChidelist(id) {
        let params = {
            url: 'get/coupon/chidelist',
            data: {id:id,page:this.page,rows:6}
        }
        post(params).then(res => {
          this.page = res.page;
          this.cateItemsData = [...this.cateItemsData,...res.data];

        })
    },
    getSearchChidelist(text){
        let params = {
            url: 'get/search/chidelist',
            data: {title:text,page:this.page,rows:6}
        }
        post(params).then(res => {
          this.page = res.page;
          this.cateItemsData = [...this.cateItemsData,...res.data];
        })
    },
    
    setRouter (path,id){
        this.$router.push({ path: path, query: {id:id}})
    },

  },
  onReachBottom() {
    if (this.page == 0) {
      //加载完成
      return false;
    }
    if(this.routeData.type == 1){
        this.getCouponChidelist(this.routeData.id)
    }else{
        this.getSearchChidelist(this.routeData.id)
    }
  },
  watch: {}
};
</script>

<style lang="scss">
.goods-ul{
  width:100%;
  background:#f6f6f6;
  padding:.15rem .15rem 0.05rem;
  display: -webkit-flex;
  display: flex;
  -webkit-justify-content: flex-start;
  justify-content: flex-start;
  flex-wrap:wrap;
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
.page-banner {
    width: 100%;
    height: 1.83rem;
    border-radius: .04rem .04rem 0px 0px;
    overflow: hidden;
    position: relative;
    swiper {
        height: 100%;
    }
    image {
        width: 100%;
        height: 100%;
        display: block;
        border-radius: .04rem .04rem 0px 0px;
    }
}
.dots {
    width: 100%;
    padding-right: 0.04rem;
    position: absolute;
    right: 0;
    bottom: .1rem;
    left: 0;
    z-indeX: 5;
}
/*未选中时的小圆点样式 */
.dot {
    width: .06rem;
    height: .06rem;
    background: rgba(255, 255, 255, 1);
    opacity: 0.5;
    border-radius: 50%;
    margin-right: .06rem;
}
/*选中以后的小圆点样式 */
.dot.active {
    background: rgba(243, 110, 32, 1);
    opacity: 1;
}
.fl-row-center{
  text-align: center;
  font-size:16px;
  color:#999;
  padding-top:30rpx;
  width:100%;
}

</style>
