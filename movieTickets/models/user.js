const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
  name : { type:String, required : true },
  pwd : String,
  salt : String,
  email: String,
  where: String,
  role: Number, // 用数字表示 1代表超管（有且只有一个）） 2代表管理员（多个）3代表普通会员
  createdAt : { type : Date, default : Date.now },
  updateAt : { type : Date, default : Date.now }
})

const User = module.exports = mongoose.model('User',userSchema)
