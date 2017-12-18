'use strict';

var express = require('express');
var router = express.Router();

var _ = require('lodash');

var weather = require('../services/weather')

router.get('/', function(req, res) {
  console.log('ight here');
  var callback = _.bind(function(data) {
    res.send(data);
  }, this, _);
  weather.get(callback);
});

module.exports = router;
