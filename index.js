var express = require('express')

var app = express()

app.set('views', './views')
app.set('view engine', 'pug')

app.use(express.static('public'))

app.get('/', function(req, res) {
  res.render('index')
})

app.listen('3000')