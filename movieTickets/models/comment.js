const mongoose = require('mongoose')

const commentSchema = mongoose.Schema({
    createdAt: { type: Date, default: Date.now },
    updateAt: { type: Date, default: Date.now },
    content: String,
    userId: String,
    userName: String,
    movieId: String,
    goodNum: {
        type: Number,
        default: 0
    },
    // type: Number //1：评论 2：回复
    replyTarget: {
        userId: String,
        userName: String,
        content: String
    } 
})

const Comment = module.exports = mongoose.model('Comment', commentSchema) // 评论数据表