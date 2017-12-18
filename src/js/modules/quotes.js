'use strict';

var Mustache = require('mustache');
var $ = require('jquery');
var _ = require('lodash');

var REFRESH_INTERVAL_10_MINUTES_IN_MS = 600000;

var $container = $('.Layout--Quotes')[0];

var template =    '<div class="Quotes--container">' +
                    '{{#quote}}' +
                    '<div class="Quotes--body">' +
                      '<p class="Quotes--text">"{{quoteText}}"</p>' +
                      '<p class="Quotes--author">- {{quoteAuthor}}</p>' +
                    '</div>' +
                    '{{/quote}}' +
                  '</div>';

var startQuotesRenderRefresh = function() {
  var handleGetQuotesSuccess = function(data) {
    var view = {
      quote: data
    };
    var output = Mustache.render(template, view);
    $container.innerHTML = output;
  }

  var handleError = function(err) {
    console.log('error');
    console.log(err);
  }

  var renderQuotes = function() {
    console.log('in render quotes');
    var url = '/quotes';

    $.ajax({
      url: "https://api.forismatic.com/api/1.0/",
      jsonp: "jsonp",
      dataType: "jsonp",
      data: {
        method: "getQuote",
        lang: "en",
        format: "jsonp"
      }
    })
    .done(handleGetQuotesSuccess)
    .fail(handleError);

    setTimeout(renderQuotes, REFRESH_INTERVAL_10_MINUTES_IN_MS);
  }

  renderQuotes();
}

$(document).ready(function() {
  startQuotesRenderRefresh();
});
