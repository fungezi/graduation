const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
  name : { type:String, required : true },  // 用户名
  pwd : String,  // 密码
  salt : String, // 加盐
  email: String, // 邮箱
  where: String, // 地址
  role: Number, // 用数字表示 1代表超管（有且只有一个）） 2代表管理员（多个）3代表普通会员
  createdAt : { type : Date, default : Date.now }, // 创建时间
  updateAt : { type : Date, default : Date.now }  // 更新时间
})

const User = module.exports = mongoose.model('User',userSchema)
