var express = require('express')
var mongojs = require('mongojs')
var path = require('path')

var app = express()
var db = mongojs('mongodb://127.0.0.1:27017/stats', ['pokemon'])

app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'pug')

app.use(express.static(path.join(__dirname, 'public')))

app.get('/', function(req, res) {
  db.pokemon.findOne({}, function(err, docs) {
    var pokemon = docs
    res.render('index', {
      pokemon: JSON.stringify(pokemon)
    })
  })
})

app.listen('3000')