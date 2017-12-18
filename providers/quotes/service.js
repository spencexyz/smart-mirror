'use strict';

var express = require('express');
var app = express();

var _ = require('lodash');
var fetch = require('node-fetch');

var BASE_URL = "http://api.forismatic.com/api/1.0/?method=getQuote?lang=en?format=json";

var GETFromEndpoint = function(url) {
  console.warn('provider/service/quotes');
  return fetch(url).then(function(response) {
    return response.json();
  })
}

var callQuote = function() {
  return GETFromEndpoint(BASE_URL);
}

module.exports = {
  retrieve: function() {
    return callQuote();
  }
}
