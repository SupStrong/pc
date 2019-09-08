import Vue from 'vue'
import Vuex from 'vuex'

Array.prototype.remove = function(val) {
    
};
Vue.use(Vuex)
export default new Vuex.Store({
    state: {

    },
    mutations: {
        setPartnerId(state, val) {
            state.partner_id = val;
        }
    },
    plugins: [

    ]
})