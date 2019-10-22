"use strict";
const db = require('./db');
const express = require('express');
const router = express.Router();
var app = express();
const jwt = require("jsonwebtoken");
const path = require('path');
var bodyParse = require('body-parser')
/************** 创建(create) 读取(get) 更新(update) 删除(delete) **************/
// 轮播图
router.get('/get/index/banner', (req, res) => {
    db.Banner.find({}, (err, data) => {
        if (err) {
            res.send(err);
            return
        }
        res.send({ 'code': 1, 'message': '请求成功','data':data});
    })
})
// 网赚思路分类列表
router.get('/get/info/class', (req, res) => {
    db.infoCla.find({}, (err, data) => {
        if (err) {
            res.send(err);
            return
        }
        res.send({ 'code': 1, 'message': '请求成功','data':data});
    })
})

// 网赚思路详情列表
router.post('/get/info/list', (req, res) => {
    let page = req.body.page;
    let rows= req.body.rows;
    let interest = req.body.interest; 
    var jsonArray = [];
    var query=db.Infodel.find({interest:interest});
    query.skip((page-1)*rows);
    query.limit(rows);
    //计算分页数据
    query.exec(function(err,rs){
        if(err){
            res.send(err);
        }else{
            //计算数据总数
            db.Infodel.find(function(err,result){
                if(parseInt(page * rows) < parseInt(result.length)){
                    jsonArray={data:rs,result:result.length,page:page + 1};
                }else{
                    jsonArray={data:rs,result:result.length,page:0};
                }
                res.json(jsonArray);         
            });
        }
    });
})
// 网赚思路单个详情
router.post('/get/info/details', (req, res) => {
    db.Infodel.find({_id:req.body.id}, (err, data) => {
        if (err) {
            res.send(err);
            return
        }
        res.send({ 'code': 1, 'message': '请求成功','data':data});
    })
})

// 更新网赚思路单个详情的观看人数
router.post('/update/details/number', (req, res) => {
    db.Infodel.find({_id:req.body.id}, (err, docs) => {
        if (err) {
            res.send(err);
            return
        }
        docs[0].number = docs[0].number == undefined ? 1 : parseInt(docs[0].number) + parseInt(1);
        db.Infodel(docs[0]).save(function (err) {
            if (err) {
                res.status(500).send()
                return
            }
            res.send({ 'code': 1, 'message': '更新成功' })
        })
    })
})

// 优惠券父级分类
router.get('/get/coupon/prev', (req, res) => {
    db.couPrev.find({}, (err, data) => {
        if (err) {
            res.send(err);
            return
        }
        res.send({ 'code': 1, 'message': '请求成功','data':data});
    })
})

// 优惠券子级分类
router.post('/get/coupon/chide', (req, res) => {
    db.couChide.find({previd:req.body.id}, (err, data) => {
        if (err) {
            res.send(err);
            return
        }
        res.send({ 'code': 1, 'message': '请求成功','data':data});
    })
})

// 优惠券子级列表
router.post('/get/coupon/chidelist', (req, res) => {
    db.couDetails.find({chideid:req.body.id}, (err, data) => {
        if (err) {
            res.send(err);
            return
        }
        res.send({ 'code': 1, 'message': '请求成功','data':data});
    })
})
// 搜索优惠券列表
router.post('/get/search/chidelist', (req, res) => {
var reg = new RegExp(req.body.title,'i');
    db.couDetails.find({title : {$regex : reg}}, (err, data) => {
        if (err) {
            res.send(err);
            return
        }
        res.send({ 'code': 1, 'message': '请求成功','data':data});
    })
})
// 优惠券详情页面
router.post('/get/coupon/onedetails', (req, res) => {
    db.couDetails.find({_id:req.body.id}, (err, data) => {
        if (err) {
            res.send(err);
            return
        }
        res.send({ 'code': 1, 'message': '请求成功','data':data});
    })
})

// 轮播图
router.get('/get/coupon/banner', (req, res) => {
    db.couponImg.find({}, (err, data) => {
        if (err) {
            res.send(err);
            return
        }
        res.send({ 'code': 1, 'message': '请求成功','data':data});
    })
})


// 优惠券父级分类 couPrev
module.exports = router;