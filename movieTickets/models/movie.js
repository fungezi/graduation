const mongoose = require('mongoose')

const movieSchema = mongoose.Schema({ // 电影信息集合
  createdAt: { type: Date, default: Date.now }, // 创建时间
  updateAt: { type: Date, default: Date.now }, // 更新时间
  dir: String, // 导演
  hasShow: Boolean, // 是否上映
  distributions: [ // 电影评价信息
    {
      movieScoreLevel: String,  // 电影等级打分
      proportion: String // 分数占比
    }
  ],
  nm: String, // 电影名
  snum: String, // 观影数
  cat: String, // 类型
  src: String, // 来源
  dur: Number, // 时长
  pubDesc: String, // 发布详情
  dra: String, // 描述
  bgimg: String, // 背景图
  posterUrl: String, // 电影海报
  staff: [ // 演员表
    {
      name: String, // 姓名
      role: String, // 角色
      photo: String // 头像
    }
  ]
})
const Movie = module.exports = mongoose.model('Movie', movieSchema)

// 从修改 影片信息 表开始 修改字段。改bug