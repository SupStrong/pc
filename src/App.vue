<script>
import { mapState, mapMutations } from "vuex";
import { apiList, configData, getNoLoad, get, post } from "@/http/api.js";
import { checkUpdateVersion } from "@/utils/index";
export default {
  data() {
    return {
      DefaultsCity: {
        id: "",
        name: ""
      },
      primarys: {
        latitude: "",
        longitude: ""
      }
    };
  },
  onShow() {
    checkUpdateVersion();
    this.getLatLon();
    this.getDefaultsCity();
    this.clearToken()
                   this.getToken()
     //检查手机型号做适配
    var _that = this;
    wx.getSystemInfo({
      success:function(res){
        const model = res.model;
        const modelInclude = ["iPhone X", 'iPhone XR', "iPhone XS", "iPhone XS MAX"];
        var flag = false;//是否X以上机型
        for (let i = 0; i < modelInclude.length;i ++){
          if (model.indexOf(modelInclude[i]) != -1){
            flag = true
          }
        }
        if (flag) {
          _that.setModel(true);
        }
      }
    })
  },
  computed: {
    ...mapState({
      Tokens: state => state.Tokens
    })
  },
  methods: {
    ...mapMutations(["setToken", "setmallCityDefaults", "primaryMain","setModel"]),
    // 默认选择站点
    getDefaultsCity() {
      let that = this;
      let cityData = wx.getStorageSync("cityData") || {id:110100,name:'北京站'}
      that.setmallCityDefaults(cityData);
      wx.setStorageSync("cityData", cityData);
    },
    // 当前定位
    getLatLon() {
      let that = this;
      wx.getLocation({
        type: "wgs84",
        success: res => {
          var latitude = res.latitude;
          var longitude = res.longitude;
          var speed = res.speed;
          var accuracy = res.accuracy;
          that.primarys = {
            latitude: res.latitude,
            longitude: res.longitude
          };
          wx.setStorageSync("primary", that.primarys);
          that.primaryMain(that.primarys);
        },
        fail: () => {
          that.primarys = {
            latitude: "",
            longitude: ""
          };
          wx.setStorageSync("primary", that.primarys);
          that.primaryMain(that.primarys);
        }
      });
    },
    clearToken(){
      let delTokens =  {
            token: '',
            user_id: '',
            openid: '',
            unionid: ''
        }
    this.setToken(delTokens)
    },
    // 触发获取token
    getToken(){
      let params = {
        url: apiList.mallCityDefaults,
      };
      get(params).then(res => {
        // console.log(1);
      });
    }
  }
};
</script>

<style>
page {
  background: #f6f6f6;
}
view {
  color: inherit;
}
/* this rule will be remove */
* {
  transition: width 2s;
  -moz-transition: width 2s;
  -webkit-transition: width 2s;
  -o-transition: width 2s;
}
::-webkit-scrollbar {
  width: 0;
  height: 0;
  color: transparent;
}

.clearfix:after {
  display: block;
  clear: both;
  height: 0;
  content: "";
  visibility: hidden;
  overflow: hidden;
}

.clearfix {
  zoom: 1;
}
.fl {
  float: left;
}
.fr {
  float: right;
}
.c-fff {
  color: #fff;
}
.empty-box {
  padding-top: 0.83rem;
  height: 1px;
}
.determine-btn {
  width: 100%;
  height: 0.45rem;
  line-height: 0.45rem;
  text-align: center;
  background: rgba(243, 110, 32, 1);
  position: fixed;
  bottom: 0;
  left: 0;
  font-size: 0.16rem;
  color: rgba(255, 255, 255, 1);
  z-index: 10;
}
radio {
  transform: scale(0.7);
}
</style>
