'use strict';

var express = require('express');
var app = express();

var _ = require('lodash');
var fetch = require('node-fetch');

var BIRTHDAYS_LIST = require('../../config/birthdays-list.json').birthdays;

var GETBirthdays = function(url) {
  return fetch(url).then(function(response) {
    return response.json();
  })
}

var callBirthdays = function() {
  return GETFromEndpoint(BASE_URL);
}

module.exports = {
  retrieve: function() {
    return callBirthdays();
  }
}
