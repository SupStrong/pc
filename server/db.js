// Schema、Model、Entity或者Documents的关系请牢记，Schema生成Model，Model创造Entity，Model和Entity都可对数据库操作造成影响，但Model比Entity更具操作性。
const mongoose = require('mongoose');
// 连接数据库 如果不自己创建 默认test数据库会自动生成
mongoose.connect('mongodb://localhost/tao');

// 为这次连接绑定事件
const db = mongoose.connection;
db.once('error',() => console.log('Mongo connection error'));
db.once('open',() => console.log('Mongo connection successed'));
// banner轮播
const bannerImg = new mongoose.Schema({
    image: Array
})
// 网赚思路详情
const infoDetail = new mongoose.Schema({
    title: String,
    image: Array,
    interest: String,
    interest_name: String,
    date: String,
    number:String,
    details: String
})
// 网赚思路分类
const infoClass = new mongoose.Schema({
    name:String,
    class_id: String
})
// 优惠券父级分类
const couponPrev = new mongoose.Schema({
    name: String,
    previd: String
})
// 优惠券父级分类
const couponChide = new mongoose.Schema({
    previd: String,
    name: String,
    chideid: String
})
// 优惠券详情
const couponDetails = new mongoose.Schema({
    previd: String,
    prev_name: String,
    chideid: String,
    chide_name: String,
    title:String,
    info:String,
    image: Array,
    present_price:String,
    original_price:String,
    discount_price: String,
    date: String,
    details: String,
})
const couponImage = new mongoose.Schema({
    image: Array
})
/************** 定义模型Model **************/
// const Models = {
//     Login : mongoose.model('Login',loginSchema)
// }
const Models = {
    // 轮播
    Banner: mongoose.model('Banner', bannerImg),
    // 网赚思路
    Infodel: mongoose.model('Infodel', infoDetail),
    // 网赚思路分类
    infoCla: mongoose.model('infoCla', infoClass),
    // 优惠券父级分类
    couPrev: mongoose.model('couPrev', couponPrev),
    // 优惠券子级分类
    couChide: mongoose.model('couChide', couponChide),
    // 优惠券详情
    couDetails: mongoose.model('couDetails', couponDetails),
    // 优惠券广告位
    couponImg: mongoose.model('couponImg', couponImage),
}

module.exports = Models;