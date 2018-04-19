
const Movie = require('../models/movie')
const User = require('../models/user')
const Hall = require('../models/hall')
const Cinema = require('../models/cinema')
const Schedule = require('../models/schedule')
const Order = require('../models/order')
const Comment = require('../models/comment')
const md5 = require('md5')
const action = {}
action.addMovie = function (req, res) { // 添加
  Movie.create(req.body, (err, movie) => {
    if (err) {
      res.json(err)
    } else {
      res.json(movie)
    }
  })
}
action.addCommetn = function (req, res) {
  const data = req.body
  const {_id: userId, name: userName} = req.session.user
  Comment.create({
    ...data,
    userId,
    userName
  })
    .then(comment=>{
      res.json(comment)
    })
    .catch(err=>{
      res.json(err)
    })
}
action.getCommentByMovieId = function (req, res) {
  const movieId = req.params.id
  Comment.find({movieId})
  .sort({updateAt: -1})
  .then(comment=>{
    res.json(comment)
  })
  .catch(err=>{
    console.log(err)
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
  Movie.find({ hasShow: true })
    .sort({ updateAt: -1 })
    .then(movies => {
      res.json(movies)
    })
    .catch(err => {
      res.json(err)
    })
}
action.getMovie = function (req, res) { //获取所有电影
  Movie.find({})
    .sort({ updateAt: -1 })
    .then(movies => {
      res.json(movies)
    })
    .catch(err => {
      res.json(err)
    })
}

action.getNoShowMovie = function (req, res) { //获取预售电影
  Movie.find({ hasShow: false })
    .sort({ updateAt: -1 })
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
    .sort({ updateAt: -1 })
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

action.register = function (req, res) {
  const { name, pwd, email } = req.body
  const salt = createSalt()
  const pwd1 = md5(pwd + salt)
  User.create({
    name: name,
    pwd: pwd1,
    role: 3,
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

action.login = function (req, res) {
  const { name, pwd } = req.body
  User.find({ name: name })
    .then((user) => {
      user = user[0]
      if (user) {
        const pwd1 = md5(pwd + user.salt)
        // res.json({user:user})
        if (user.pwd === pwd1) {
          const resData = {
            name: user.name,
            role: user.role,
            _id: user._id
          }
          req.session.user = resData
          res.json(resData)
        } else {
          res.json()
        }
      }
    })
    .catch((err) => {
      res.json(err)
    })
}

action.deleteUser = function (req, res) {
  User.findOneAndRemove({
    _id: req.params.id
  })
    .then(user => res.send(`用户 ${user.name} 删除成功`))
    .catch(err => res.json(err))
}

action.updateUser = function (req, res) {
  User.update({ _id: req.params.id }
    , {
      $set: {
        ...req.body
      }
    })
    .then(user => res.json(user))
    .catch(err => res.json(err))
}

action.addHall = function (req, res) {
  Hall.create(req.body, (err, hall) => {
    if (err) {
      res.json(err)
    } else {
      res.json(hall)
    }
  })
}

action.getHallByCinemaId = function (req, res) {
  const { cinemaId } = req.params
  Hall.find({ cinemaId })
    .then(hall => { res.json(hall) })
    .catch(err => { res.json(err) })
}

action.deleteHall = function (req, res) {
  Hall.findOneAndRemove({
    _id: req.params.id
  })
    .then(hall => res.send(`大厅 ${hall.hallName} 删除成功`))
    .catch(err => res.json(err))
}

action.updateHall = function (req, res) {
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

action.getHalls = function (req, res) {
  Hall.find({})
    .sort({ updateAt: -1 })
    .then(halls => {
      res.json(halls)
    })
    .catch(err => {
      res.json(err)
    })
}

action.getHallById = function (req, res) {
  Hall.find({ _id: req.params.id })
    .then(hall => {
      res.json(hall[0])
    })
    .catch(err => {
      res.json(err)
    })
}

action.addSchedule = function (req, res) {
  const data = req.body
  Schedule.create({
    ...data
  })
    .then(schedule => {
      res.json(schedule)
    })
    .catch(err => {
      res.json(err)
    })
}

action.updateSchedule = function (req, res) {
  const { id: scheduleId } = req.params
  const data = req.body
  Schedule.update({ _id: scheduleId }, {
    ...data
  })
    .then(schedule => {
      res.json(schedule)
    })
    .catch(err => {
      res.json(err)
    })
}

action.setSeatsForSchedule = function (req, res) {
  const { id: scheduleId } = req.params
  const data = req.body
  Schedule.update({ _id: scheduleId }, {
    $pushAll: {
      seatHasSale: data
    }
  })
    .then(schedule => {
      res.json(schedule)
    })
    .catch(err => {
      console.log(err)
    })
}

action.getSchedule = function (req, res) {
  const { id: hallId } = req.params
  Schedule.find({ hallId })
    .sort({ showTime: -1 })
    .then(schedule => {
      res.json(schedule)
    })
    .catch(err => {
      res.json(err)
    })
}

action.deleteSchedule = function (req, res) {
  const scheduleId = req.params.id
  Schedule.delete({ _id: scheduleId })
    .then(schedule => {
      res.json(schedule)
    })
    .catch(err => {
      res.json(err)
    })
}

action.addOrder = function (req, res) {
  let data = req.body
  const { _id: userId, name: userName } = req.session.user
  data = {
    ...data,
    userId,
    userName
  }
  Order.create(data, (err, order) => {

    const {
      _id: orderId,
      order: {
        scheduleId
      } } = order
    if (err) {
      res.json(err)
    } else {
      setTimeout(() => {// 在 60 秒之后若是没支付订单就撤销订单 并将座位预定取消
        Order.find({ _id: orderId })
          .then(o => {
            o = o[0]
            const { order: {
              status
            } } = o
            if (status != 3) {
              o.order.status = 2
              Schedule.find({ _id: o.order.scheduleId })
                .then(s => {
                  s = s[0]
                  const { seatHasSale } = s
                  const { seats: iseatHasSale } = o.order
                  console.log(iseatHasSale)
                  const nSeatHasSale = []
                  const seatHasSaleIndex = []
                  for (let j = 0; j < iseatHasSale.length; j++) {
                    for (let i = 0; i < seatHasSale.length; i++) {
                      if (seatHasSale[i].row === iseatHasSale[j].row && seatHasSale[i].col === iseatHasSale[j].col) {
                        console.log("success")
                        seatHasSaleIndex.push(i)
                        break
                      }
                    }
                  }
                  for(let i = 0; i < seatHasSale.length; i++){
                    if(seatHasSaleIndex.indexOf(i) > -1){

                    }else{
                      nSeatHasSale.push(seatHasSale[i])
                    }
                  }
                  Schedule.update({ _id: s._id }, {
                    $set: {
                      seatHasSale: nSeatHasSale
                    }
                  }).then(ns=>{
                    console.log("ns", ns)
                    // res.json(ns)
                  })
                  .catch(err=>{
                    console.log(err)
                    res.json(err)
                  })
                })
                .catch(err => {
                  console.log(err)
                })
              Order.update({ _id: o._id },
                {
                  $set: {
                    "order.status": 2
                  }
                })
                .then(no=>{
                  console.log("no",no)
                })
                .catch(err=>{
                  console.log(err)
                })
            }
          })
      }, 10000)

      res.json(order)
    }
  })
}

action.deleteOrder = function (req, res) {
  Order.findOneAndRemove({
    _id: req.params.id
  })
    .then(order => res.send(`订单 ${order._id} 删除成功`))
    .catch(err => res.json(err))
}

action.updateOrder = function (req, res) {
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

action.getOrders = function (req, res) {
  const { _id: userId } = req.session.user
  Order.find({ userId })
    .sort({ updateAt: -1 })
    .then(orders => {
      res.json(orders)
    })
    .catch(err => {
      res.json(err)
    })
}

action.getOrderById = function (req, res) {
  Order.findById(req.params.id)
    .then(order => {
      res.json(order)
    })
    .catch(err => {
      res.json(err)
    })
}

action.addCinema = function (req, res) {
  Cinema.create(req.body, (err, cinema) => {
    if (err) {
      res.json(err)
    } else {
      res.json(cinema)
    }
  })
}

action.getCinemaByMovieId = function (req, res) {
  const movieId = req.params.id
  const { date, address, detailAddress } = req.query
  const cinemaAddress = JSON.parse(address)
  console.log(1, cinemaAddress.province)
  const oneDaySeconds = 24 * 60 * 60
  const now = (new Date()).getTime()
  const scope = {
    $gte: '',
    $lte: ''
  }

  if (parseInt(date) <= now) {
    // 今日票
    scope.$gte = now
    scope.$lte = parseInt(date) + oneDaySeconds * 1000
  } else {
    //非今日票
    scope.$gte = parseInt(date)
    scope.$lte = parseInt(date) + oneDaySeconds * 1000
  }
  // 此处分为两种情况
  // 1.买今日票 now Date - 23:59:59
  // 2.买非今日票 时间范围就是：24:00:00-23:59:59
  Cinema.find({
    movies: {
      $in: [movieId]
    },
    "address.province": cinemaAddress.province,
    "address.city": cinemaAddress.city,
    "address.district": cinemaAddress.district
  })
    .then(cinema => {
      const cinemaIdList = []
      for (const i in cinema) {
        cinemaIdList.push(cinema[i]._id)
      }
      Schedule.find({
        cinemaId: {
          $in: cinemaIdList
        },
        showTime: scope
      })
        .then(schedule => {

          res.json({
            schedule,
            cinema
          })
        })
        .catch(err => {
          res.json(err)
        })
    })
    .catch(err => {
      res.json(err)
    })
}

action.applyCinema = function (req, res) {
  Cinema.create(req.body, (err, cinema) => {
    if (err) {
      res.json(err)
    } else {
      res.json(cinema)
    }
  })
}
action.getApplyList = function (req, res) {
  Cinema.find({})
    .sort({ updateAt: -1 })
    .then((applyList) => {
      res.json(applyList)
    })
    .catch(err => {
      res.json(err)
    })
}
action.getCinemaByUserId = function (req, res) {
  if (!req.session.user) return
  const userId = req.session.user._id
  Cinema.find({
    userId: userId
  }).sort({ updateAt: -1 })
    .then(cinemaList => {
      res.json(cinemaList)
    })
    .catch(err => {
      res.json(err)
    })
}
action.handleApply = function (req, res) {
  Cinema.update({ _id: req.params.id }, {
    $set: {
      apply: true
    }
  })
    .then(apply => {
      res.json(apply)
    })
    .catch(err => {
      res.json(err)
    })
}
action.getMovieByNameStr = function (req, res) {
  const name = req.params.name
  const reg = new RegExp(name)
  Movie.find({ nm: { $regex: reg } })
    .then(movie => {
      res.json(movie)
    })
    .catch(err => {
      res.json(err)
    })
}

action.addMovieForCinema = function (req, res) {
  const { movies, cinemaId } = req.body
  Cinema.update({ _id: cinemaId }, {
    $push: {
      movies: movies
    }
  })
    .then(cinema => {
      res.json(cinema)
    })
    .catch(err => {
      res.json(err)
    })
}

function createSalt() {
  const randomString = '1,2,3,4,5,6,7,8,9,0,q,w,e,r,t,y,u,i,o,p,a,s,d,f,g,h,j,k,l,z,x,c,v,b,n,m'
  const randomArray = randomString.split(',')
  const max = randomArray.length
  let str = ''
  for (let i = 0; i < max; i++) {
    str += randomArray[Math.floor(Math.random() * max)]
  }
  return str
}
module.exports = action;