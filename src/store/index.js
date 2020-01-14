import Vue from 'vue'
import Vuex from 'vuex'

Array.prototype.remove = function(val) {
    
};
Vue.use(Vuex)
export default new Vuex.Store({
    state: {    
        userInfo:{},
        tokenStatus:true
    },
    mutations: {
        setPartnerId(state, val) {
            state.partner_id = val;
        },
        SetUserInfo(state,val){
            state.userInfo = val;
        },
        setTokenStatus(state, val) {
            state.tokenStatus = val
        },
    },
    plugins: [

    ]
})