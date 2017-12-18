
'use strict';

var express = require('express');
var router = express.Router();

var _ = require('lodash');

//var quotes = require('../services/quotes')

router.get('/', function(req, res) {
  console.warn('in hereeeee');
  var callback = _.bind(function(data) {
    res.send(data);
  }, this, _);
  quotes.get(callback);
});

module.exports = router;

