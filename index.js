"use strict";

var _ = require('lodash');

var express = require('express');
var app = express();

var transit = require('./services/transit')


app.get('/', function (req, res) {
  res.send("Ni Hao!");
});

app.get('/transit', function(req, res) {
  var callback = _.bind(function(data) {
    res.send(data);
  }, this, _);
  transit.get(callback);
});

app.listen(4000, function () {
  console.log('Magic Mirror Dashboard on Port 4000!');
});
