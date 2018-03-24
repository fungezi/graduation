const mongoose = require('mongoose')

const hallSchema = mongoose.Schema({
    createdAt: { type: Date, default: Date.now },
    updateAt: { type: Date, default: Date.now },
    showDate: String,
    showId: Number,
    showTime: String,
    tp: String,
    buyNumLimit: Number,
    cinemaId: Number,
    cinemaName: String,
    desc: String,
    hallId: String,
    hallName: String,
    movieId: String,
    movieName: String,
    originPrice: String,
    price: String,
    seatTypeList: [
        {
            icon: String,
            name: String
        }
    ],
    section: {
      cols: Number,
      rows: Number,
      seats: [{
          columns: [{
              columnId: String,
              seatNo: String,
              st: String
            }],
          rowNum: Number
        }]
    }
})

const Hall = module.exports = mongoose.model('Hall', hallSchema) // 影厅数据表