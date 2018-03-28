const mongoose = require('mongoose')

const cinemaSchema = mongoose.Schema({
  userId: String,
  name: String,
  address: String,
  distance: String,
  movies: Array,
  apply: { type: Boolean, default: false},
  createdAt : { type : Date, default : Date.now },
  updateAt : { type : Date, default : Date.now }
})

const Cineam = module.exports = mongoose.model('Cinema',cinemaSchema)
