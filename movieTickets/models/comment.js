const mongoose = require('mongoose')

const commentSchema = mongoose.Schema({
    createdAt: { type: Date, default: Date.now },
    updateAt: { type: Date, default: Date.now },
    content: String,
    userId: String,
    userName: String,
    movieId: String
})

const Comment = module.exports = mongoose.model('Comment', commentSchema) // 评论数据表