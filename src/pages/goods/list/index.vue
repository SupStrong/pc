<template>
    <div class="goods-ul">
      <div class="li" v-for="(item,index) in goods" :key="index"
      @click="setRouter('/pages/goods/details/main',item.id)">
        <div class="img-box">
          <img :src="item.cover" alt="">
        </div>
        <div class="bom">
          <div class="sku-name G-more-cloum G-col-2">{{item.sku_name}}</div>
          <div class="price">
            <span class="G-Fsize-16 G-color-f13a">￥{{item.price}}</span>
            <span class="market current-market" v-if="item.market">30元优惠券</span>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
import { apiList, configData, getNoLoad, get, post } from "@/http/api.js";
import { mapState, mapMutations } from "vuex";
import { previewImage,showPopup } from '@/utils/index';
export default {
  onLoad() {
  },
  components: {},
  data() {
    return {
      goods:[
      {cover:'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=2174909441,2495215020&fm=26&gp=0.jpg',sku_name:'你好你好你好你好你好你好你好你好你好你好你好',price:'1000',market:'100'},
      {cover:'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=2174909441,2495215020&fm=26&gp=0.jpg',sku_name:'hello',price:'1000',market:'100'},
      {cover:'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=2174909441,2495215020&fm=26&gp=0.jpg',sku_name:'hello',price:'1000.10',market:'100.10'}]
    };
  },
  computed: {},
  methods: {
    setRouter (path,id){
        this.$router.push({ path: path, query: {} })
    },

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
</style>
