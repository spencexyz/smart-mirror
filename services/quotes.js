"use strict";

var QUOTES = require('../providers/quotes/provider')

var getQuotes = function(callback)  {
  console.warn('services/quotes');
  QUOTES.retrieve(callback);
}

module.exports = {
  get: function(callback) {
    getQuotes(callback);
  }
}
