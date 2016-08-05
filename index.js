'use strict';

var express = require('express');
var app = express();

app.set('view engine', 'pug');
app.use(express.static('public'));

app.get('/', function (req, res) {
  res.render('index', { title: 'Hey', message: 'Hello there!'});
});

var transit = require('./routes/transit');
app.use('/transit', transit);

app.listen(4000, function () {
  console.log('Magic Mirror Dashboard on Port 4000!');
});
