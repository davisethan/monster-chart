var express = require('express')
var path = require('path')
var stats = require('./stats/')

var app = express()
var port = process.env.PORT || 8080

app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'pug')

app.use(express.static(path.join(__dirname, 'public')))

app.get('/', function(req, res) {
  var url = req.get('x-original-uri') || req.originalUrl

  if (url.includes('?')) {
    url = url.slice(0, url.indexOf('?'))
  }

  if (url === '/') {
    url = ''
  }

  var pokemon = stats(url)

  res.render('index', {
    pokemon: JSON.stringify(pokemon),
    url: url
  })
})

app.listen(port, function() {
  console.log('Web server live...')
})
