<template>
  <div class="content">
    <div class="hd">
      <div class="group">
        <div class="group-frist">
          <scroll-view scroll-x="true" class="group-frist-con">
            <div
              v-for="(item,index) in Groups" :key="index" @click="getClicks(item.class_id)" class="group-frist-item">
              <span class="item-name">{{item.name}}</span>
              <span class="item-line"></span>
            </div>
          </scroll-view>
        </div>
      </div>
    </div>
    <div class="article">
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
  </div>
</template>

<script>
import { apiList, configData, getNoLoad, get, post } from "@/http/api.js";
import { mapState, mapMutations } from "vuex";
export default {
  onLoad(res) {
    this.getInfoClass();
    this.getGroups(1);
  },
  data() {
    return {
      Groups:[],
      listData:[],
      page:1,
      groupInterest:1
    };
  },
  computed: {
  },
  methods: {
    getInfoClass() {
        let params = {
            url: 'get/info/class',
            data: {}
        }
        get(params).then(res => {
            this.Groups = res.data;
        })
    },
    getClicks(id){
      this.page = 1;
      this.listData = [];
      this.getGroups(id);
    },  
    getGroups(id) {
      let params = {
            url: 'get/info/list',
            data: {interest:id,page:this.page,rows:5}
        }
        post(params).then(res => {
          this.page = res.page;
          this.groupInterest = id;
          this.listData = [...this.listData,...res.data];
        })
    },
    setRouter(path, id, n, t, s) {
      this.$router.push({
        path: path,
        query: { id: id}
      });
    }
  },
  onReachBottom() {
    if (this.page == 0) {
      //加载完成
      return false;
    }
    this.getGroups(this.groupInterest);
  },
  onPullDownRefresh() {
    wx.showNavigationBarLoading();
    this.page = 1;
    this.listData = []
    this.getGroups(1);
    setTimeout(() => {
      wx.hideNavigationBarLoading();
      wx.stopPullDownRefresh();
    }, 1000);
  },
  watch: {
  }
};
</script>

<style lang="scss" scoped>
$orange: #f36e20;
.group {
  border-top: 0.01rem solid #e7e7e7;
  .group-frist {
    display: flex;
    border-bottom: 0.01rem solid #e7e7e7;
    background-color: #fff;

    .group-frist-con {
      width: 100%;
      height: 0.4rem;
      white-space: nowrap;
    }
  }

  .group-frist-item {
    position: relative;
    padding: 0 0.1rem;
    height: 100%;
    display: inline-flex;

    .item-name {
      line-height: 0.4rem;
      font-size: 0.16rem;
      color: #999;
    }

    .item-line {
      position: absolute;
      bottom: 0;
      left: 50%;
      transform: translateX(-50%);
      width: 0.2rem;
      height: 0.03rem;
      background-color: #fff;
      border-radius: 0.02rem 0.02rem 0 0;
    }

    &.active {
      .item-name {
        color: $orange;
      }

      .item-line {
        background-color: $orange;
      }
    }
  }

  .group-second {
    display: flex;
    background-color: #fff;
    border-bottom: 0.01rem solid #e7e7e7;

    .group-second-con {
      width: 3.75rem;
      height: 0.33rem;
      white-space: nowrap;
    }
  }

  .group-second-item {
    position: relative;
    display: inline-flex;
    align-items: center;
    height: 100%;
    padding: 0 0.18rem;

    .item-name {
      font-size: 0.14rem;
      color: #999;
    }

    .item-line {
      position: absolute;
      top: 50%;
      right: 0;
      transform: translateY(-50%);
      width: 0.01rem;
      height: 0.13rem;
      background-color: #e7e7e7;
    }

    &.active {
      .item-name {
        color: $orange;
      }
    }
  }
}

.tag-con {
  border-bottom: 0.01rem solid #e7e7e7;
  width: 3.75rem;
  height: 0.4rem;
  padding: 0.07rem 0 0.07rem 0.15rem;

  .tag-item {
    display: inline-flex;
    align-items: center;
    padding: 0 0.13rem;
    height: 0.26rem;
    border-radius: 0.13rem;
    border: 0.01rem solid #cccccc;

    .iconfont {
      color: $orange;
      font-size: 0.17rem;
    }
    .tag-name {
      font-size: 0.14rem;
      color: $orange;
    }
  }
}

.article {
  padding: 0 0.15rem;
  background-color: #fff;
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
