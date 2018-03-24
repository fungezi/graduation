const mongoose = require('mongoose')

const orderSchema = mongoose.Schema({
    createdAt: { type: Date, default: Date.now },
    updateAt: { type: Date, default: Date.now },
    pricePackage: {
        priceDetails: [
            {
                greyDesc: String,
                title: String,
                priceDesc: String
            }
        ],
        priceDetailTitle: String,
        payMoney: String
    },
    order: {
        movieId: String,
        cinemaId: String,
        feeDesc: String,
        cinemaName: String,
        sellMoney: String,
        showTime: String,
        hallName: String,
        movieName: String,
        dimension: String,
        seats: {
            count: Number,
            list: [
                {
                    rowId: String,
                    columnId: String
                }
            ]
        },
    },
    refund: {
        refundable: Boolean,
        desc: String,
        notice: String
    }
})

const Order = module.exports = mongoose.model('Order', orderSchema)
