const mongoose = require('mongoose')
const scheduleSchema = mongoose.Schema({
    createdAt: { type: Date, default: Date.now },
    updateAt: { type: Date, default: Date.now },
    hallName: String,
    hallId: String,
    movies: [{
        movieName: String,
        movieId: String,
        showTime: String,
        originPrice: String,
        price: String,
    }],
    section: {
      cols: Number,
      rows: Number,
      seats: [[{
        seatNo: Boolean,
        isSale: Boolean
      }]]
    }
})

const Schedule = module.exports = mongoose.model('Hall', scheduleSchema) // 排期数据表