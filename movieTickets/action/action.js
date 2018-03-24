
const Movie = require('../models/movie')
const User = require('../models/user')
const Hall = require('../models/hall')
const md5 = require('md5')
const action = {};
action.addMovie = function (req, res) { // 添加
  // const param = req.body;

  // let dir = param.

  // nm = String,
  // snum = String,
  // cat = String,
  // src = String,
  // dur = Number,
  // pubDesc = String,
  // dra = String, // 描述
  // bgimg = String,
  // posterUrl = String,
  // staff = [
  //   {
  //     name = String,
  //     role = String,
  //     photo = String
  //   }
  // ]
  Movie.create(req.body, (err, movie) => {
    if (err) {
      res.json(err)
    } else {
      res.json(movie)
    }
  })
}

action.updateMovie = function (req, res) { // 更新
  Movie.findOneAndUpdate({ _id: req.params.id }
    , {
      $set: {
        ...req.body
      }
    }, {
      new: true
    })
    .then(movie => res.json(movie))
    .catch(err => res.json(err))
}
action.getMovieHasShow = function (req, res) { //获取热映电影
  Movie.find({hasShow: true})
    .sort({ update_at: -1 })
    .then(movies => {
      res.json(movies)
    })
    .catch(err => {
      res.json(err)
    })
}
action.getMovie = function (req, res) { //获取所有电影
  Movie.find({})
    .sort({ update_at: -1 })
    .then(movies => {
      res.json(movies)
    })
    .catch(err => {
      res.json(err)
    })
}

action.getNoShowMovie = function (req, res) { //获取预售电影
  Movie.find({hasShow: false})
    .sort({ update_at: -1 })
    .then(movies => {
      res.json(movies)
    })
    .catch(err => {
      res.json(err)
    })
}
action.getMovieById = function (req, res) { // 获取
  Movie.findById(req.params.id)
    .then(movie => {
      res.json(movie)
    })
    .catch(err => {
      res.json(err)
    })
}

action.deleteMovie = function (req, res) { // 删除
  Movie.findOneAndRemove({
    _id: req.params.id
  })
    .then(movie => res.send(`${movie.title}删除成功`))
    .catch(err => res.json(err))
}


action.getUserInfo = function (req, res) {
  User.find({})
    .sort({ update_at: -1 })
    .then(users => {
      res.json(users)
    })
    .catch(err => {
      res.json(err)
    })
}

action.getUser = function (req, res) {
  User.findById(req.params.id)
    .then(user => {
      res.json(user)
    })
    .catch(err => {
      res.json(err)
    })
}

action.register = function (req, res){
  const {name, pwd, email} = req.body
  const salt = createSalt()
  const pwd1 = md5(pwd + salt)
  User.create({
    name:name,
    pwd:pwd1,
    role:3,
    salt: salt,
    email: email
  }, (err, user) => {
    if (err) {
      res.json(err)
    } else {
      res.json(user)
    }
  })
}

action.login = function (req, res){
  const {name, pwd} = req.body
  User.find({name: name})
  .then((user)=>{
    user = user[0]
    if(user){
      const pwd1 = md5(pwd + user.salt)
      // res.json({user:user})
      if(user.pwd === pwd1){
        res.json({name:user.name,role:user.role})
      }else{
        res.json()
      }
    }
  })
  .catch((err)=>{
    res.json(err)
  })
  // res.json(req.session)
}

action.deleteUser = function (req, res){
  User.findOneAndRemove({
    _id: req.params.id
  })
    .then(user => res.send(`用户 ${user.name} 删除成功`))
    .catch(err => res.json(err))
}

action.updateUser = function (req, res){
  User.findOneAndUpdate({ _id: req.params.id }
    , {
      $set: {
        ...req.body
      }
    }, {
      new: true
    })
    .then(user => res.json(user))
    .catch(err => res.json(err))
}

action.addHall = function(req, res){
  Hall.create(req.body, (err, hall) => {
    if (err) {
      res.json(err)
    } else {
      res.json(hall)
    }
  })
}

action.deleteHall = function(req, res){
  Hall.findOneAndRemove({
    _id: req.params.id
  })
    .then(hall => res.send(`大厅 ${hall.hallName} 删除成功`))
    .catch(err => res.json(err))
}

action.updateHall = function(req, res){
  Hall.findOneAndUpdate({ _id: req.params.id }
    , {
      $set: {
        ...req.body
      }
    }, {
      new: true
    })
    .then(movie => res.json(movie))
    .catch(err => res.json(err))
}

action.getHalls = function(req, res){
  Hall.find({})
    .sort({ update_at: -1 })
    .then(halls => {
      res.json(halls)
    })
    .catch(err => {                  
      res.json(err)
    })
}

action.getHallById = function(req, res){
  Hall.findById(req.params.id)
    .then(hall => {
      res.json(hall)
    })
    .catch(err => {
      res.json(err)
    })
}

action.addOrder = function(req, res){
  Order.create(req.body, (err, order) => {
    if (err) {
      res.json(err)
    } else {
      res.json(order)
    }
  })
}

action.deleteOrder = function(req, res){
  Order.findOneAndRemove({
    _id: req.params.id
  })
    .then(order => res.send(`订单 ${order._id} 删除成功`))
    .catch(err => res.json(err))
}

action.updateOrder = function(req, res){
  Order.findOneAndUpdate({ _id: req.params.id }
    , {
      $set: {
        ...req.body
      }
    }, {
      new: true
    })
    .then(order => res.json(order))
    .catch(err => res.json(err))
}

action.getOrders = function(req, res){
  Order.find({})
    .sort({ update_at: -1 })
    .then(orders => {
      res.json(orders)
    })
    .catch(err => {                  
      res.json(err)
    })
}

action.getOrderById = function(req, res){
  Order.findById(req.params.id)
    .then(order => {
      res.json(order)
    })
    .catch(err => {
      res.json(err)
    })
}

function createSalt(){
  const randomString = '1,2,3,4,5,6,7,8,9,0,q,w,e,r,t,y,u,i,o,p,a,s,d,f,g,h,j,k,l,z,x,c,v,b,n,m'
  const randomArray = randomString.split(',')
  const max = randomArray.length
  let str = ''
  for(let i =0;i<max;i++){
    str += randomArray[Math.floor(Math.random() * max)]
  }
  return str
}
module.exports = action;