const express = require('express')
const router = express.Router()
const Movie = require('../models/movie')
const action = require('../action/action')
// 查询热映电影
router.get('/hotMovie', action.getMovieHasShow)
//查询所有电影
router.get('/movie', action.getMovie)
//查询预售电影
router.get('/noShowMovie', action.getNoShowMovie)
// 通过ObjectId查询单个电影
router.get('/movie/:id', action.getMovieById)
// 添加一部电影
router.post('/movie', action.addMovie)
//更新一部电影
router.put('/movie/:id',action.updateMovie)
//删除一部电影
router.delete('/movie/:id',action.deleteMovie)

// 获取所有用户信息
router.get('/user',action.getUserInfo)
//获取单个用户信息
router.get('/user/:id',action.getUser)
//注册用户
router.post('/register',action.register)
//登录
router.post('/login',action.login)
//删除用户
router.delete('/user',action.deleteUser)
//修改用户信息
router.put('/user/:id',action.updateUser)

//添加大厅
router.post('/hall',action.addHall)
//删除大厅
router.delete('/hall',action.deleteHall)
//更新大厅
router.put('/hall',action.updateHall)
//查看大厅列表
router.get('/hall',action.getHalls)
//查看大厅通过 影院 ID
router.get('/hall/:cinemaId',action.getHallByCinemaId)
//查看单个大厅信息
router.get('/hall/:id',action.getHallById)

//添加订单
router.post('/order',action.addOrder)
//删除订单
router.delete('/order',action.deleteOrder)
//更新订单
router.put('/order',action.updateOrder)
//查看订单列表
router.get('/order',action.getOrders)
//查看单个订单信息
router.get('/order/:id',action.getOrderById)

//根据电影 ID 查询影院信息
router.get('/movieToCinema/:id',action.getCinemaByMovieId)
//添加影院
router.post('/addCinema',action.addCinema)
//获取影院通过用户 ID
router.get('/cinema',action.getCinemaByUserId)
//为影院添加 电影资源
router.post('/addMovieForCinema',action.addMovieForCinema)
//获取电影通过 name
router.get('/getMovieByNameStr/:name',action.getMovieByNameStr)
//申请影院
router.post('/apply',action.applyCinema)
//通过申请
router.put('/apply/:id',action.handleApply)
//获取申请列表
router.get('/applyList',action.getApplyList)

// HALL

// 大厅增加排期
router.post('/schedule',action.addSchedule)
// 更新大厅排期
router.put('/schedule/:id',action.updateSchedule)
// 获取排期 通过 hallId
router.get('/schedule/:id',action.getSchedule)
// 删除大厅列表根据 ID
router.delete('/schedule/:id',action.deleteSchedule)

module.exports = router
