import '../static/sdk/ald-stat'
import Vue from 'vue'
import App from './App'
import MpvueRouterPatch from 'mpvue-router-patch'
import store from './store/index'
import '../static/css/weui.css'
import '../static/iconfont/iconfont.css'
import './assets/styles/style.scss'

Vue.config.productionTip = false
App.mpType = 'app'
Vue.use(MpvueRouterPatch)
Vue.prototype.$store = store;
//混入方法，解决数据残留问题
Vue.mixin({
    onUnload() {
        if ('data' in this.$options) {
            Object.assign(this.$data, this.$options.data());
        }
    }
})

const app = new Vue(App)
app.$mount()
export default {
    // 这个字段走 app.json
    config: {
        window: {
            backgroundTextStyle: 'light', 
            navigationBarBackgroundColor: '#fff',
            navigationBarTitleText: '',
            navigationBarTextStyle: 'black',
            enablePullDownRefresh: false,
            onReachBottom: true,
        },
        navigationBarTextStyle: 'black'
    }
}