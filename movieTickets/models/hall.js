const mongoose = require('mongoose')

const hallSchema = mongoose.Schema({ // 大厅集合
    createdAt: { type: Date, default: Date.now }, // 创建时间
    updateAt: { type: Date, default: Date.now }, // 更新时间
    cinemaId: String, // 影院 ID
    cinemaName: String, // 影院名
    hallName: String, // 大厅名
    section: { // 座位信息
      cols: Number, // 列数
      rows: Number, // 行数
      seats: [[{ // 座位状态
        seatNo: Boolean, // 损坏
        isSale: Boolean // 售卖
      }]]
    }
})

const Hall = module.exports = mongoose.model('Hall', hallSchema) // 影厅数据表