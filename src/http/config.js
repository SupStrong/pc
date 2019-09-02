/*
    fly配置文件
*/
//引入 fly
import Fly from "flyio/dist/npm/wx";
import {
    loginStatus,
    showPopup,
    outLogin
} from "@/utils/index.js";
import store from '@/store/index.js'
import {
    apiList,
    configData
} from "@/http/api.js";


var fly = new Fly();
var tokenFly = new Fly();
var isGetToken = false
var appid = 'wxbc7ee815207474ec'
let times = 0
export const getFly = function getFly(showLoading = false) {
    fly.config.timeout = 20000;
    // //定义公共headers
    // fly.config.headers={xx:5,bb:6,dd:7}
    //添加请求拦截器
    //添加请求拦截器
    if (store.state.Tokens.token.length == 0 && !isGetToken) {
        isGetToken = true
        fly.lock();
        getToken()
    }
    fly.interceptors.request.use((request) => {
            //给所有请求添加自定义header
            if (showLoading) {
                wx.showLoading({
                    title: '加载中',
                });
            }
            request.headers["appid"] = appid;
            if (store.state.Tokens) {
                request.headers["token"] = store.state.Tokens.token;
                request.headers["openid"] = store.state.Tokens.openid;
                request.headers["userId"] = store.state.Tokens.user_id;
                request.headers["siteId"] = store.state.CityDefaults.id;
            }
            //可以显式返回request, 也可以不返回，没有返回值时拦截器中默认返回request
            return request;
        })
        //添加响应拦截器，响应拦截器会在then/catch处理之前执行
    fly.interceptors.response.use(
        (response) => {
            //只将请求结果的data字段返回
            wx.hideLoading();
            setTimeout(function() {
                store.commit('setLodingStatus', true)
            }, 2000)

            return response.data
        },
        (err) => {
            setTimeout(function() {
                store.commit('setLodingStatus', true)
            }, 2000)
            let message = err.response.data.message
            if (message.includes('Token') || message.includes('token')) {
                store.commit('setTokenStatus', false)
                showPopup('身份信息已失效，请重新登录！')
                outLogin()
                getToken()
                setTimeout(() => {
                    wx.reLaunch({
                        url: '/pages/index/main'
                    })
                }, 2000);
            }
            if (err.status === 500) {
                showPopup('服务器出小差了,请稍后再试！')
            }
        }
    )
    return fly
}

function getToken() {
    wx.login({
        success(msg) {
            if (msg.code) {
                tokenFly.request(configData.host + apiList.getToken, {
                    code: msg.code
                }, {
                    method: "post",
                    headers: {
                        appid: appid,
                    }
                }).then(res => {
                    if (res.data.status) {
                        store.commit('setToken', res.data.data)
                        wx.setStorageSync('token', res.data.data);
                        fly.unlock()
                        isGetToken = false
                    } else {
                        getTokenAgain()
                    }
                })
            } else {
                getTokenAgain()
            }
        },
        fail() {
            getTokenAgain()
        }
    })
}

function getTokenAgain() {
    if (times > 5) {
        showPopup('请稍后再试')
        fly.unlock()
        isGetToken = false
        return false
    }
    getToken()
    times++
}