"use strict";

var quotes = require('../providers/quotes/provider')

var getQuotes = function(callback)  {
  quotes.retrieve(callback);
}

module.exports = {
  get: function(callback) {
    getQuotes(callback);
  }
}
