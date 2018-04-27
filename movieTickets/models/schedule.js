const mongoose = require('mongoose')
const scheduleSchema = mongoose.Schema({ // 排期信息集合
  createdAt: { type: Date, default: Date.now }, // 创建时间
  updateAt: { type: Date, default: Date.now }, // 更新时间
  hallName: String, // 大厅名
  hallId: String, // 大厅 ID
  seatsNum: Number, // 当前已买
  seatsLimit: Number, // 大厅座位限制
  movieName: String, // 电影名
  movieId: String, // 电影 ID
  cinemaId: String, // 影院 ID
  showTime: String,  // 上映时间
  originPrice: String, // 原价
  price: String, // 售价
  seatHasSale: [{ // 已售座位信息
    row: Number, // 行数
    col: Number // 列数
  }]
})

const Schedule = module.exports = mongoose.model('Schedule', scheduleSchema) // 排期数据表