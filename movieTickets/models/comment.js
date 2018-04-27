const mongoose = require('mongoose')

const commentSchema = mongoose.Schema({ // 评论集合
    createdAt: { type: Date, default: Date.now }, // 创建时间
    updateAt: { type: Date, default: Date.now }, // 更新时间
    content: String, // 评论内容
    userId: String, // 用户 ID
    userName: String, // 用户名
    movieId: String, // 电影 ID
    goodNum: { // 点赞数
        type: Number, // 类型
        default: 0 // 默认值
    },
    // type: Number //1：评论 2：回复
    replyTarget: { // 回复对象
        userId: String, // 用户 ID
        userName: String, // 用户名
        content: String // 内容
    } 
})

const Comment = module.exports = mongoose.model('Comment', commentSchema) // 评论数据表