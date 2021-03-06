const pkg = require('./package')
const config = require('./config/db')
const express = require('express')
const favicon = require('serve-favicon')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const index = require('./router/index')
const movie = require('./router/movie')
const expressSession = require('express-session')
mongoose.connect(config.mongodb,{useMongoClient:true})
mongoose.Promise = global.Promise

const app = express()
const port = process.env.PORT || 3000
app.use(expressSession({
  secret: 'key for movieTicket',
  resave: false,
  saveUninitialized: true
}))
app.set('trust proxy', 1) // trust first proxy
app.use(function (req, res, next) {
  if (!req.session.user) {
    req.session.user = {}
  }else{
    req.session.user = req.session.user
  }
  next()
})
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(favicon(__dirname + '/src/assets/favicon.ico'))
app.use(express.static('dist'))
app.use('/',index)
app.use('/api',movie)

app.listen(port, () => {
  console.log(`${pkg.name} listening on port ${port}`)
})

module.exports = app
