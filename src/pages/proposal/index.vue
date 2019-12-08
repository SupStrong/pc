<template>
  <div class="content">
    <div class="hd">
      <p class="error">请填写您的宝贵建议</p>
    </div>
    <div class="bd">
      <div class="form-item">
        <input
          type="text"
          class="form-item-input"
          placeholder="请填写您的联系姓名"
          v-model="data.name"
          @blur="validate($event,'name')"
        >
      </div>
      <div class="form-item">
        <input
          type="text"
          class="form-item-input"
          placeholder="请填写您的联系方式"
          v-model="data.phone"
          @blur="validate($event,'location')"
        >
      </div>
      <div class="form-item">
        <picker
          class="change-time"
          mode="selector"
          :value='data.class_name'
          :range="brandArray"
          range-key='name'
          @change="bindDateChange"
        >
          <view class="picker">
            <p>{{data.class_name !="" ? data.class_name : "请选择分类"}}</p>
            <i class="iconfont iconxiangxiajinru"></i>
          </view>
        </picker>
      </div>
      <div class="form-item textarea-con">
        <textarea
          class="form-item-textarea"
          cursor-spacing="40"
          placeholder="备注信息（非必填）"
          v-model="data.remark"
          :class="{'ios-textarea':isIos}"
        ></textarea>
      </div>
      <div class="confirm-btn" @click="saveData">提交</div>
    </div>
  </div>
</template>

<script>
import { apiList, configData, getNoLoad, get, post } from "@/http/api.js";
import { showPopup, delObjKey } from "@/utils/index.js";
import { mapState, mapMutations } from "vuex";
import { getMYD } from "@/utils/dateTimePicker.js";
import { error } from "util";
export default {
  onLoad() {
  },
  onShow(){
    var phone = wx.getSystemInfoSync();
    if (phone.platform == 'ios') {
      this.isIos = true
    }
  },
  data() {
    return {
      data: {
        name: "",
        phone: "",
        class_id: "",
        class_name: "",
        remark: "",
        status:0,
        current_time:""
      },
      errorMsg: "",
      isIos:false,
      brandArray:[{id:"1",name:"优惠券"},{id:"2",name:"网赚思路"},{id:"3",name:"每日羊毛"},{id:"4",name:"其他"}]
    };
  },
  computed: {
    ...mapState({
      partner_id:state=>state.partner_id,
      packCount:state=>state.packCount,
    }),},
  methods: {
    saveData() {
      let errMsgObj = {
        name: "请输入您的姓名！",
        phone: "请输入您的联系方式！",
        phone_err: "请输入正确的手机号码！",
        class_name: "请选择分类！",
        remark:"请填写备注"
      };
       var myreg=/^[1][3,4,5,7,8][0-9]{9}$/;
      if(!this.data.name){showPopup(errMsgObj.name); return false}
      else if(!this.data.phone){showPopup(errMsgObj.phone); return false}
      else if(!myreg.test(this.data.phone)){showPopup(errMsgObj.phone_err); return false}
      else if(!this.data.class_name){showPopup(errMsgObj.class_name); return false}
      else if(!this.data.remark){showPopup(errMsgObj.remark); return false}
      if(wx.getStorageSync('UserInfo').openId == undefined || wx.getStorageSync('UserInfo').openId == ''){
        showPopup('请您先在提交建议前先进行用户授权~');
        return false;
      } 
      this.data.nickName = wx.getStorageSync('UserInfo').nickName;
      this.data.openid = wx.getStorageSync('UserInfo').openid;
      let that = this;
      let params = {
        url: 'post/proposal/info',
        data: that.data
      };
      post(params).then(res => {
        if (res.code) {
          wx.showModal({
            title: '提交成功',
            content: '感谢您提交的宝贵建议~',
            showCancel:false,
            confirmColor:"#f36e20",
            success(res) {
              if (res.confirm) {
                that.$router.go(1);
              }
            }
          })
        }
      });
    },
    bindDateChange(e) {
      this.data.class_id = this.brandArray[e.mp.detail.value].id;
      this.data.class_name = this.brandArray[e.mp.detail.value].name;
    },
    validate(e, type, value) {
      let errMsgObj = {
        name: "请输入您的姓名！",
        location: "请输入您的联系方式！",
        class_name: "请选择分类！",
        remark:"请填写备注"
      };
      if (!(type in errMsgObj)) {
        return false;
      }
    },
    //路由
    setRouter(path, id, n, t, s) {
      this.$router.push({
        path: path,
        query: { id: id, name: n, title: t, search: s }
      });
    }
  },
  watch: {}
};
</script>

<style lang="scss" scoped>
.content{
  height: 100vh;
  background-color: #f6f6f6;
}
.hd {
  position: relative;
  z-index: 1;
  height: 1.325rem;
  background:#333;
  .hd-bg {
    z-index: -1;
    position: absolute;
    width: 3.75rem;
    height: 1.325rem;
    top: 0;
    left: 0;
  }
  .error {
    font-size: 0.2rem;
    color: #fff;
    text-align: center;
    padding-top: 0.4rem;
  }
}
.bd {
  position: relative;
  z-index: 2;
  width: 3.45rem;
  margin: 0 auto 0;
  top: -.425rem;
  padding: 0.1rem 0.15rem 0.2rem;
  border-radius: 0.06rem;
  box-shadow: 0px 1.5px 9px 0 rgba(204, 204, 204, 0.2);
  background-color: #ffffff;
  .form-item {
    border: 0.005rem solid #ececec;
    height: 0.45rem;
    margin-top: .1rem;
    padding: 0 .1rem;
    border-radius: 0.04rem;
    .form-item-input {
      height: 100%;
      font-size: 0.16rem;
    }
    &.textarea-con {
      height: 1.05rem;
      .form-item-textarea {
        width: 100%;
        padding-top: 0.15rem;
        line-height: 1.5;
        height: 1.05rem;
        overflow-y: auto;
      }
    }
    .change-time {
      height: 100%;
      .picker {
        display: flex;
        align-items: center;
        justify-content: space-between;
        width: 100%;
        height: 0.44rem;
        // p{color:#999}
      }
    }
  }
  .save-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 3.15rem;
    height: 0.45rem;
    margin-top: 0.2rem;
    border-radius: 0.225rem;
    font-size: 0.16rem;
    color: #fff;
    background-color: #f36e20;
  }
}
.confirm-btn{
  margin-top: .1rem;
}
.iconxiangxiajinru{
  font-size: .1rem;
  color: #666;
}
</style>
