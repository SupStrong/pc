import Vue from 'vue'
import Vuex from 'vuex'

Array.prototype.remove = function(val) {
    // var index = this.indexOf(val);
    // if (index > -1) {
    //   this.splice(index, 1);
    // }
};
Vue.use(Vuex)
export default new Vuex.Store({
    state: {
        hostoryUrl: {
            path: '',
            isTab: '',
            query: {}
        },
        userInfo: {},
        isReset: false,
        interval: 0,
        intervals: 0,
        lodingStatus: true,
        tokenStatus: true,
        storeMe: {
            name: '',
            img: '',
            id: ''
        },
        // 默认的城市id + 名称
        CityDefaults: {
            name: '',
            id: ''
        },
        // token
        Tokens: {
            token: '',
            user_id: '',
            openid: '',
            unionid: '',
            mobile: ''
        },
        primary: {
            latitude: '',
            longitude: ''
        },
        // 模板爆款商品
        partner_id: '',
        scanCode: false,
        cardDetail: false,
        iphoneModel: false,
        payCoupon: {},
        //小区数据
        community: {
            lat: '',
            lng: '',
            house: ''
        }
    },
    mutations: {
        setPartnerId(state, val) {
            state.partner_id = val;
        },
        setStoreMe(state, val) {
            state.storeMe = val;
        },
        setIsReset(state, val) {
            state.isReset = val
        },
        changeInterval(state, val) {
            state.interval = val
        },
        setLodingStatus(state, val) {
            state.lodingStatus = val
        },
        setTokenStatus(state, val) {
            state.tokenStatus = val
        },
        setmallCityDefaults(state, val) {
            state.CityDefaults = val
        },
        setToken(state, val) {
            state.Tokens = val
        },
        changeStateVal(state, val) {
            state[val.type] = val.data
        },
        removeToken(state, val) {
            state.Tokens.unionid = val.unionid;
            state.Tokens.user_id = val.user_id;
        },
        primaryMain(state, val) {
            state.primary = val;
        },
        changeScanCode(state, val) {
            state.scanCode = val
        },
        changeCardDetail(state, val) {
            state.cardDetail = val
        },
        setModel(state, val) {
            state.iphoneModel = val
        },
        setCouponData(state, val) {
            state.payCoupon = val
        }
    },
    plugins: [
        // createPersistedState({
        //   storage: {
        //     getItem: key => wx.getStorageSync(key),
        //     setItem: (key, value) => wx.setStorageSync(key, value),
        //     removeItem: key => {}
        //   }
        // })
    ]
})