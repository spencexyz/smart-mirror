"use strict";

var birthdays = require('../providers/birthdays/provider')

var getBirthdays = function(callback)  {
  quotes.retrieve(callback);
}

module.exports = {
  get: function(callback) {
    getBirthdays(callback);
  }
}
