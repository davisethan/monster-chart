var express = require('express')
var path = require('path')
var pokemon = require('./stats/stats')

var app = express()
var port = process.env.PORT || 8080

app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'pug')

app.use(express.static(path.join(__dirname, 'public')))

app.get('/', function(req, res) {
  res.render('index', {
    pokemon: JSON.stringify(pokemon)
  })
})

app.listen(port, function() {
  console.log('Web server live...')
})
