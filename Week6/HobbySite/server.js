var express = require('express')
var app = express()
app.use(express.static('public'));

var indexVars = require('./index-data.json')
var cartVars = require('./cart-data.json')
var itemInfoVars = require('./item-info-data.json')

app.set('views', './views')
app.set('view engine', 'jade')

app.get('/', function (req, res) {
  res.render('index', indexVars);
})

app.get('/user-profile', function (req, res) {
  res.render('user-profile', cartVars);
})

app.get('/piece', function (req, res) {
  res.render('piece', itemInfoVars);
})

var server = app.listen(3000, function () {

  var host = server.address().address
  var port = server.address().port

  console.log('Example app listening at http://%s:%s', host, port)

})
