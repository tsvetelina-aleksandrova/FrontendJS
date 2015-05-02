var express = require('express')
var indexVars = require('./index-data.json')
var cartVars = require('./cart-data.json')
var itemInfoVars = require('./item-info-data.json')

var app = express()
app.use(express.static('public'));

app.set('views', './views')
app.set('view engine', 'jade')

app.get('/', function (req, res) {
  res.render('index', indexVars);
})

app.get('/cart', function (req, res) {
  res.render('cart', cartVars);
})

app.get('/item-info', function (req, res) {
  res.render('item-info', itemInfoVars);
})

var server = app.listen(3000, function () {

  var host = server.address().address
  var port = server.address().port

  console.log('Example app listening at http://%s:%s', host, port)

})
