'use strict';

var express = require('express');
var router = express.Router();

var _ = require('lodash');

var birthdays = require('../services/birthdays')

router.get('/', function(req, res) {
  var callback = _.bind(function(data) {
    res.send(data);
  }, this, _);
  birthdays.get(callback);
});

module.exports = router;
