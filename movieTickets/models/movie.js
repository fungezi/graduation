const mongoose = require('mongoose')

const movieSchema = mongoose.Schema({
  createdAt: { type: Date, default: Date.now },
  updateAt: { type: Date, default: Date.now },
  dir: String,
  hasShow: Boolean,
  distributions: [
    {
      movieScoreLevel: String,
      proportion: String
    },
    {
      movieScoreLevel: String,
      proportion: String
    },
    {
      movieScoreLevel: String,
      proportion: String
    }
  ],
  nm: String,
  snum: String,
  cat: String,
  src: String,
  dur: Number,
  pubDesc: String,
  dra: String, // 描述
  bgimg: String,
  posterUrl: String,
  staff: [
    {
      name: String,
      role: String,
      photo: String
    }
  ]
})
const Movie = module.exports = mongoose.model('Movie', movieSchema)

// 从修改 影片信息 表开始 修改字段。改bug