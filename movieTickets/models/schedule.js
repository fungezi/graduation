const mongoose = require('mongoose')
const scheduleSchema = mongoose.Schema({
  createdAt: { type: Date, default: Date.now },
  updateAt: { type: Date, default: Date.now },
  hallName: String,
  hallId: String,
  seatsNum: Number, // 当前已买
  seatsLimit: Number, // 大厅座位限制
  movieName: String,
  movieId: String,
  cinemaId: String,
  showTime: String,
  originPrice: String,
  price: String,
  seatHasSale: [{
    row: Number,
    col: Number
  }]
})

const Schedule = module.exports = mongoose.model('Schedule', scheduleSchema) // 排期数据表