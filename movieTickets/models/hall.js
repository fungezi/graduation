const mongoose = require('mongoose')

const hallSchema = mongoose.Schema({
    createdAt: { type: Date, default: Date.now },
    updateAt: { type: Date, default: Date.now },
    cinemaId: String,
    cinemaName: String,
    hallName: String,
    section: {
      cols: Number,
      rows: Number,
      seats: [[{
        seatNo: Boolean,
        isSale: Boolean
      }]]
    }
})

const Hall = module.exports = mongoose.model('Hall', hallSchema) // 影厅数据表