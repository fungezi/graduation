const mongoose = require('mongoose')

const orderSchema = mongoose.Schema({
    createdAt: { type: Date, default: Date.now },
    updateAt: { type: Date, default: Date.now },
    price: String,
    order: {
        movieId: String,
        cinemaId: String,
        cinemaName: String,
        showTime: String,
        hallName: String,
        movieName: String,
        seats: [{
            row: Number,
            col: Number
        }],
    },
    refund: {
        refundable: Boolean,
        desc: String
    }
})

const Order = module.exports = mongoose.model('Order', orderSchema)
