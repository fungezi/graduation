const mongoose = require('mongoose')

const cinemaSchema = mongoose.Schema({ // 影院集合
  userId: String, // 用户 ID
  name: String, // 影院名
  address: { // 地址信息
    province: String, // 省份
    city: String, // 城市
    district: String, // 县区
    detailAddress: String // 详细地址
  },
  distance: String, // 距离
  movies: Array, // 影院电影
  apply: { type: Boolean, default: false}, // 是否通过审核
  createdAt : { type : Date, default : Date.now }, // 创建时间
  updateAt : { type : Date, default : Date.now } // 更新时间
})

const Cineam = module.exports = mongoose.model('Cinema',cinemaSchema)
