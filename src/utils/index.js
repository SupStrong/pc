import {
    Base64
} from 'js-base64';
import store from '@/store/index.js';
import {
    apiList,
    configData,
    getNoLoad,
    postNoLoad,
    get,
    post
} from "@/http/api.js";


export function formatTime(dateTimeArray, dateTime) {
    var time = dateTimeArray[0][dateTime[0]] +
        '-' + dateTimeArray[1][dateTime[1]] +
        '-' + dateTimeArray[2][dateTime[2]] +
        ' ' + dateTimeArray[3][dateTime[3]] +
        ':' + dateTimeArray[4][dateTime[4]];

    return time;
}
export function timestampToTime(cjsj) {
    var date = new Date(cjsj) //时间戳为10位需*1000，时间戳为13位的话不需乘1000
    var Y = date.getFullYear() + '-'
    var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-'
    var D = date.getDate() + ' '
    var h = date.getHours() + ':'
    var m = date.getMinutes() + ':'
    var s = date.getSeconds()
    return Y + M + D + h + m + s
}
//弹窗
export function showPopup(msg, isicon) {
    if (isicon == 1) {
        isicon = 'success'
    } else {
        isicon = 'none'
    }
    wx.showToast({
        title: msg,
        icon: isicon,
        duration: 2000,
    })
}
export function getLogin(encryptedData, iv,callback = function() {}) {
    wx.login({
        success (resq) {
        if (resq.code) {
            var that = this;
            let params = {
                url: 'getUninoid',
                data: {
                    apiName: 'WX_DECODE_USERINFO',
                    encryptedData: encryptedData,
                    iv:iv,
                    code:resq.code
                }
            }
            get(params).then(res => {
                if(res._id!=""){
                    callback(res)
                }
            })
        } else {
            console.log('登录失败！' + res.errMsg)
        }
        }
    })
}
export function Login(type, en, iv, callback = function() {}) {
    let _this = this;
    let params = {
        url: apiList.login + type,
        data: {
            openid: store.state.Tokens.openid,
            code: '',
            encryptedData: en,
            iv: iv
        }
    };
    wx.login({
        success(msg) {
            if (msg.code) {
                params.data.code = msg.code
                post(params).then(res => {
                    if (res.status) {
                        showPopup('授权成功')
                        let Tokens = JSON.parse(JSON.stringify(store.state.Tokens))
                        Tokens.user_id = res.data.user_id;
                        Tokens.unionid = res.data.unionid;
                        Tokens.mobile = res.data.mobile;
                        store.commit('setToken', Tokens)
                        wx.setStorageSync('token', Tokens)
                        callback(res.data);
                    } else {
                        showPopup(res.message)
                    }
                });
            }
        }
    })
}
//wx.share
export function shareMessage(data) {
    wx.setStorageSync("cityData", {
        id: data.cityDataId || data.cid,
        name: ''
    });
    store.commit('setmallCityDefaults', {
        id: data.cityDataId || data.cid,
        name: ''
    })
    let params = {
        url: apiList.mallCityDefaults,
        data: {
            id: data.cityDataId || data.cid
        }
    };
    get(params).then(res => {
        wx.removeStorageSync("cityData");
        wx.setStorageSync("cityData", res.data);
        store.commit('setmallCityDefaults', res.data)
    });
}
// formId
export function sendFormId(e) {
    if (e.mp.detail.formId == 'the formId is a mock one') {
        return;
    }

    let params = {
        url: apiList.saveFormId,
        data: {
            data: {
                openid: store.state.Tokens.openid,
                unionid: store.state.Tokens.unionid,
                form_id: e.mp.detail.formId,
                time: new Date().getTime()
            }
        }
    };
    postNoLoad(params).then(res => {});
}
export function GetQueryString(arr) {
    var arr1 = arr.split('&');
    var theRequest = new Object();
    for (var i = 0; i < arr1.length; i++) {
        var kye = arr1[i].split("=")[0];
        var value = arr1[i].split("=")[1];
        // 给对象赋值
        theRequest[kye] = value;
    }

    return theRequest;
}
export function openLocation(data) {
    let _that = this;
    wx.openLocation({
        latitude: Number(data.lat),
        longitude: Number(data.lng),
        name: data.address,
        address: data.address,
        scale: 15
    });
}
export function makePhoneCall(phoneNum) {
    if (phoneNum.length == 0) {
        showPopup('暂无联系电话')
        return false
    }
    wx.getSetting({
        success(res) {
            console.log(res.authSetting)
        }
    })
    wx.makePhoneCall({
        phoneNumber: phoneNum,
    });
}
export function previewImage(url, imgs) {
    wx.previewImage({
        current: url,
        urls: imgs
    });
}

export function getUrlHistory(that, url, isReset = false, time) {
    let getUrlHistory = getCurrentPages();
    let num = 0;
    getUrlHistory.forEach((val, key) => {
        if (val.route.indexOf(url) != -1) {
            num = getUrlHistory.length - 1 - key;
        }
    });
    pageBack(that, num, time);
}
export function pageBack(that, num = 1, time = 2000) {
    setTimeout(function() {
        that.$router.go(num);
    }, time)
    setReset(true)

}

export function getReset() {
    let res = store.state.isReset
        //isReset true 需要刷新,返回页面顶部
    if (res) {
        backTop
    }
    //isReset true 需要刷新
    return res
}
export function setReset(val) {
    store.commit('setIsReset', val)
}
export function delObjKey(obj, KeyArr) {
    return JSON.parse(
        JSON.stringify(obj, function(key, value) {
            if (KeyArr.includes(key)) {
                return undefined;
            } else {
                return value;
            }
        })
    );
}

export function loginStatus() {
    //不存在token
    if (store.state.Tokens.token.length == 0) {
        return false;
    }
    let token = store.state.Tokens.token;
    let time = JSON.parse(Base64.decode(token.split('.')[1])).exp //取得token中的过期时间
        //有效
    if (time < (new Date).valueOf()) {
        return true
    }
    //有token，但过期。清空token和个人数据
    outLogin()
    return false
}
export function outLogin() {
    wx.removeStorageSync('token')
    store.commit('setToken', {
        token: '',
        user_id: '',
        openid: '',
        unionid: ''
    })
}
export function backTop() {
    wx.pageScrollTo({
        scrollTop: 0
    })
}

export function checkLoginStatus() {
    if (store.state.lodingStatus) {
        store.commit('setLodingStatus', false)
        return true
    }
    wx.hideLoading()
    showPopup('正在执行中...')
    return false
}
// 微信授权
export function LockunionId(e, type, callback = function() {}) {
    if (store.state.Tokens.unionid) {
        return true
    } else {
        if (e.target.errMsg == 'getUserInfo:ok') {
            Login(type, e.target.encryptedData, e.target.iv, function(res) {
                if (res.unionid.length > 0) {
                    callback()
                }
            });
            return true
        } else {
            setTimeout(function() {
                showPopup('为更好服务您,请同意授权。', 0);
            }, 300)
        }
    }
}
/**
 * 检测当前的小程序
 * 是否是最新版本，是否需要下载、更新
 */
export function checkUpdateVersion() {
    //判断微信版本是否 兼容小程序更新机制API的使用
    if (wx.canIUse('getUpdateManager')) {
        //创建 UpdateManager 实例
        const updateManager = wx.getUpdateManager();
        //检测版本更新
        updateManager.onCheckForUpdate(function(res) {
            // 请求完新版本信息的回调
            if (res.hasUpdate) {
                //监听小程序有版本更新事件
                updateManager.onUpdateReady(function() {
                    //TODO 新的版本已经下载好，调用 applyUpdate 应用新版本并重启 （ 此处进行了自动更新操作）
                    updateManager.applyUpdate();
                })
                updateManager.onUpdateFailed(function() {
                    // 新版本下载失败
                    wx.showModal({
                        title: '已经有新版本喽~',
                        content: '请您删除当前小程序，到微信 “发现-小程序” 页，重新搜索打开哦~',
                    })
                })
            }
        })
    } else {
        //TODO 此时微信版本太低（一般而言版本都是支持的）
        wx.showModal({
            title: '溫馨提示',
            content: '当前微信版本过低，无法使用该功能，请升级到最新微信版本后重试。'
        })
    }
}

export function calculNum(type, num1, num2) {
    const num1Digits = (num1.toString().split('.')[1] || '').length;
    const num2Digits = (num2.toString().split('.')[1] || '').length;
    const baseNum = Math.pow(10, Math.max(num1Digits, num2Digits));
    let res = '';
    switch (type) {
        case "add":
            res = (num1 * baseNum + num2 * baseNum) / baseNum;
            break;
        case "sub":
            res = (num1 * baseNum - num2 * baseNum) / baseNum;
            break;
        case "mult":
            res = (num1 * baseNum * num2 * baseNum) / baseNum;
            break;
        case "divide":
            res = (num1 * baseNum / num2 * baseNum) / baseNum;
            break;
        default:
            break;
    }
    return res.toFixed(2);
}

//显示富文本
export function exchangeEl(string) {

    if (string.length == 0) {
        return ''
    }
    let noStyle = `style="display:block;max-width: 100%;vertical-align: top;"`;
    let hasStyle = `display:block;max-width: 100%;vertical-align: top;word-wrap:break-word;`

    return string.replace(/title="[^\"]*"/g, ``).replace(/alt="[^\"]*"/g, ``).replace(/style="[^\"]*"/g, ``).replace(/(<img)[\s]*(src="[^\"]*")([^>]*)(\/>)/g, `$1 $2 ${noStyle} $3 $4`).replace(/(<img)[\s]*(src="[^\"]*")[\s]*(style=")([^>]*)>/g, `$1 $2 $3${hasStyle}$4>`)
}

//类型转字符串
export function addTypesStr(data) {
    for (const key in data) {
        if (data[key].types) {
            that.$set(
                data[key],
                "typesStr",
                data[key].types.join("/")
            );
        }
    }
}


export default {
    formatTime,
    previewImage,
    showPopup,
    makePhoneCall,
    pageBack,
    getUrlHistory,
    calculNum,
    LockunionId,
    sendFormId,
    checkLoginStatus,
    GetQueryString,
    getLogin,
    exchangeEl
}
var page = [
    "pages/index/main",
    "pages/activity/index/main",
    "pages/share-stores/main",
    "pages/partner/partner/main",
    "pages/partner/each-data/total-profit/main",
    "pages/partner/each-data/open-number/main",
    "pages/partner/each-data/share-number/main",
    "pages/partner/my-message/message-list/main",
    "pages/partner/my-message/message-main/main",
    "pages/user/index/main",
    "pages/user/gift/gift-list/main",
    "pages/user/gift/details/main",
    "pages/cash-out/main",
    "pages/H5/main",
    "pages/search/main",
    "pages/brand/index/main",
    "pages/brand/apply-brand/main",
    "pages/brand/details/main",
    "pages/district/district-list/main",
    "pages/district/trade-area/main",
    "pages/stores/details/main",
    "pages/stores/ask-everyone/main",
    "pages/stores/ask-details/main",
    "pages/stores/pay/main",
    "pages/stores/edit/main",
    "pages/stores/callback/main",
    "pages/user/order/order-list/main",
    "pages/user/order/order-detail/main",
    "pages/user/ask-answer/main",
    "pages/user/collection/main",
    "pages/original/hot/main",
    "pages/original/search-list/main",
    "pages/original/list/main",
    "pages/original/details/main",
    "pages/goods/list/main",
    "pages/goods/comment/main",
    "pages/goods/index/main",
    "pages/city-list/main",
    "pages/exchange/main",
    "pages/user/cash/list/main",
    "pages/user/cash/detail/main",
    "pages/user/promote/main"
];
const appid = 'wxcbe60162f9dc451c' //数字化智慧门店
const appid1 = 'wxea2ce6d2af3d0f63 => wxbc7ee815207474ec' //厨百前端小程序