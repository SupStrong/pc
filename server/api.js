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
    db.Infodel.find({interest:req.body.interest}, (err, data) => {
        if (err) {
            res.send(err);
            return
        }
        res.send({ 'code': 1, 'message': '请求成功','data':data});
    })
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

// 网赚思路列表
router.get('get/info/list', (req, res) => {
    db.Infodel.find({}, (err, data) => {
        if (err) {
            res.send(err);
            return
        }
        res.send({ 'code': 1, 'message': '登陆成功','data':data});

    })
})
// 网赚思路详情
router.post('/info/details', (req, res) => {
    let newInfodetail = new db.Infodel(req.body);
    newInfodetail.save(function (err) {
        if (err) {
            res.send(err);
        } else {
            res.send({ 'code': 1, 'message': '保存成功' });
        }
    })
})
// 删除网赚思路详情
router.post('/info/del/details', (req, res) => {
    db.Infodel.remove({ _id: req.body._id }, (err) => {
        if (err) {
            res.status(500).send()
            return
        }
        res.send({ 'code': 1, 'message': '删除成功' })
    })
})
// 上传网赚思路子分类 
router.post('/add/info/class',(req,res) =>{
    db.infoCla.find({ class_id: req.body.class_id }, (err, docs) => {
        if (err) {
            res.send(err);
            return
        }
        if (docs.length > 0) {
            res.send({ 'code': 0, 'message': '已有此id' });
        }else{
            let newinfoCla = new db.infoCla(req.body);
            newinfoCla.save(function (err) {
                if (err) {
                    res.send(err);
                } else {
                    res.send({ 'code': 1, 'message': '保存成功' });
                }
            })
        }
    })
})
// 优惠券父级分类 couPrev
router.post('/coupon/prev',(req,res) =>{
    db.couPrev.find({ prev_id: req.body.prev_id }, (err, docs) => {
        if (err) {
            res.send(err);
            return
        }
        if (docs.length > 0) {
            res.send({ 'code': 0, 'message': '已有此id' });
        }else{
            let newcouPrev = new db.couPrev(req.body);
            newcouPrev.save(function (err) {
                if (err) {
                    res.send(err);
                } else {
                    res.send({ 'code': 1, 'message': '保存成功' });
                }
            })
        }
    })
})
// 获取优惠券父级分类
router.get('/get/coupon/prev',(req,res) =>{
    db.couPrev.find({}, (err, data) => {
        if (err) {
            res.send(err);
            return
        }
        res.send({ 'code': 1, 'message': '请求成功','data':data});
    })
})
// 优惠券子集分类
router.post('/coupon/chide',(req,res) =>{
    db.couChide.find({ chide_id: req.body.chide_id }, (err, docs) => {
        if (err) {
            res.send(err);
            return
        }
        if (docs.length > 0) {
            res.send({ 'code': 0, 'message': '已有此id' });
        }else{
            let newcouChide = new db.couChide(req.body);
            newcouChide.save(function (err) {
                if (err) {
                    res.send(err);
                } else {
                    res.send({ 'code': 1, 'message': '保存成功' });
                }
            })
        }
    })
})
// 获取优惠券子分类 couChide
router.get('/get/coupon/chide',(req,res) =>{
    db.couChide.find({chide_id: req.query.type}, (err, data) => {
        if (err) {
            res.send(err);
            return
        }
        res.send({ 'code': 1, 'message': '请求成功','data':data});
    })
})
// 优惠券详情
router.post('/coupon/details', (req, res) => {
    let newcouDetails = new db.couDetails(req.body);
    newcouDetails.save(function (err) {
        if (err) {
            res.send(err);
        } else {
            res.send({ 'code': 1, 'message': '保存成功' });
        }
    })
})
// 获取所有优惠券详情
router.get('/get/coupon/details', (req, res) => {
    db.couDetails.find({}, (err, data) => {
        if (err) {
            res.send(err);
            return
        }
        res.send({ 'code': 1, 'message': '请求成功','data':data});
    })
})
// 删除优惠券详情
router.post('/coupon/del/details', (req, res) => {
    db.couDetails.remove({ _id: req.body._id }, (err) => {
        if (err) {
            res.status(500).send()
            return
        }
        res.send({ 'code': 1, 'message': '删除成功' })
    })
})
module.exports = router;