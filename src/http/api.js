import {
    getFly
} from './config'
import env from '@/config/env'

export const configData = {
    host: `${env.baseUrl}`,
    hostImg: `${env.imgUrl}`
}

export const apiList = {
    storeShow: "mall/store/show/",
    guideDefault: "mall/guide/index",
    questionEdit: "mall/question/add/",
    questionLists: "mall/question/lists",
    answer: "mall/question/answer/",
    questionShow: "mall/question/show/",
    commentTotal: "mall/comments/total",
    orderCreate: "mall/order/create",
    collectOperate: "mall/collect/operate/",
    goodsLists: "mall/goods/lists",
    getToken: 'mall/token',
    login: 'mall/auth/login/',
    commentList: "mall/comments/lists",
    applyBrand: "mall/brand/apply",
    getTags: "mall/wiki/tags",
    getLists: "mall/wiki/lists",
    getWikiGroups: "mall/wiki/groups",
    getWikiDes: 'mall/wiki/show/',
    setWikiTop: "mall/wiki/top/",
    orderList: "mall/order/lists",
    orderDetail: "mall/order/show/",
    collectList: "mall/collect/lists",
    questionAnswers: "mall/question/answers",
    questionList: "mall/question/lists",
    squareShow: "mall/square/show/",
    storeList: "mall/store/lists",
    getLists: "mall/wiki/lists",
    collectCheck: "mall/collect/check",
    goodsDetail: "mall/goods/show/",
    mallSquareLists: 'mall/square/lists',
    getBanner: 'mall/banner',
    getBrandList: 'mall/brand/lists',
    mallCityDefaults: 'mall/city/defaults',
    getCityList: 'mall/city/lists',
    mallBrandShow: 'mall/brand/show/',
    partnerStoreList: "mall/partner/store/lists/",
    partnerShare: "mall/partner/share/",
    saveFormId: "mall/partner/save/formId",
    partnerDetail: "mall/user/wallet",
    shareTotal: "mall/partner/share/total/",
    partnerTradeWithdraw: 'mall/user/trade/withdraw',
    partnerTradeDeposit: 'mall/user/trade/deposit',
    partnerShareLists: 'mall/partner/share/lists/',
    partnerShareOpens: "mall/partner/share/opens/",
    partnerCheck: "mall/partner/check",
    guideData: "mall/guide/show/",
    bindGuide: "mall/partner/bind",
    giftsShow: "mall/promote/gifts/show/",
    mallPromoteGiftsLists: "mall/promote/gifts/lists",
    activityShow: "mall/promote/activity/show/",
    activityJoin: "mall/promote/activity/join/",
    exchange: "mall/promote/change/forms",
    uploadImg: "mall/system/upload",
    getPromoteList: 'mall/user/promote',
    getCashList: "mall/user/cash",
    getCashDes: 'mall/user/cash/show/',
    storeQrcode: "mall/store/qrcode",
    couponShow: "mall/promote/coupon/show/",
    couponOrder: "mall/order/coupon/show/",
    couponUsedList: "mall/order/coupon/show/",
    couponList: "mall/order/coupon/lists",
    couponOrderId: "mall/order/coupon/detail",
    reservationDes: "mall/request/show",
    requestList: "mall/request/list",
    sysplans: "mall/plan/sysplans",
    orderDetailPlan: "mall/plan/order",
    userDashBoard: "mall/user/dashboard",
    addRequst: "mall/request/create",
    extract: "mall/user/extract",
    mallPlanShowstoreIdId: "mall/plan/show/",
    reservationList: "mall/request/list",
    planLogDetails: "mall/plan/log",
    planLists: "mall/plan/lists",
    planCommentShow: "mall/comment/plan/show",
    planCreat: "mall/comment/plan/creat",
    promoteList: "mall/promote/list"
}

const host = configData.host;

// 通用的get请求

export const get = (params) => {
    return getFly(true).get(`${host}${params.url}`, params.data)
};

// 通用的post请求
export const post = (params) => {
    return getFly(true).post(`${host}${params.url}`, params.data)
};
// 不带load的get
export const getNoLoad = (params) => {
    return getFly().get(`${host}${params.url}`, params.data)
};

// 不带load的post
export const postNoLoad = (params) => {
    return getFly().post(`${host}${params.url}`, params.data)
};

export function NewGet(params) {
    return new Promise((resolve, reject) => {
        getFly(true).get(`${host}${params.url}`, params.data)
            .then(res => {
                resolve(res);
            })
            .catch(err => {
                reject(err)
            })
    });
}

export function NewPost(params) {
    return new Promise((resolve, reject) => {
        getFly(true).post(`${host}${params.url}`, params.data)
            .then(res => {
                resolve(res);
            })
            .catch(err => {
                reject(err)
            })
    });
}