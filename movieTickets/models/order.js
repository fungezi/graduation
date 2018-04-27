const mongoose = require('mongoose')

const orderSchema = mongoose.Schema({ // 订单信息集合
    createdAt: { type: Date, default: Date.now },  // 创建时间
    updateAt: { type: Date, default: Date.now }, // 更新时间
    price: String, // 价格
    userId: String,  // 用户 ID
    userName: String, // 用户名
    order: { // 订单详情
        scheduleId: String, // 排期 ID
        movieId: String, // 电影 ID
        cinemaId: String,  // 影院 ID
        cinemaName: String, // 影院名
        showTime: String, // 上映时间
        hallName: String, // 大厅名
        status: Number, // 1：订单超时 2：订单未超时 3：订单已付款
        posterUrl: String, // 电影海报
        movieName: String, // 电影名
        seats: [{ // 购买的座位信息
            row: Number, // 行数
            col: Number // 列数
        }],
    },
    refund: { // 退款信息
        refundable: Boolean, // 可否退款
        desc: String // 退款信息
    }
})

const Order = module.exports = mongoose.model('Order', orderSchema)
