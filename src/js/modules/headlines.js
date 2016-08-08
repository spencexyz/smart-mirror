'use strict';

var Mustache = require('mustache');
var $ = require('jquery');
var _ = require('lodash');

var REFRESH_INTERVAL_10_MINUTES_IN_MS = 600000;

var $container = $('.Layout--Headlines')[0];

var template =    '<ul class="Headlines--list">' +
                    '{{#headlines}}' +
                    '<li class="Headlines--headline">' +
                    '<div class="Headlines--headline-section">{{section}}</div>' +
                    '<div class="Headlines--headline-subsection">{{subsection}}</div>' +
                    '<div class="Headlines--headline-title">{{title}}</div>' +
                    '</li>' +
                    '{{/headlines}}' +
                  '</ul>';

var startHeadlineRenderRefresh = function() {
  var handleGetHeadlinesSuccess = function(data) {
    var view = {
      headlines: (data.data)
    };
    var output = Mustache.render(template, view);
    $container.innerHTML = output;
  }

  var renderHeadlines = function() {
    var url = '/headlines';

    $.ajax({
      url: url,
      success: handleGetHeadlinesSuccess,
      dataType: 'json'
    });

    setTimeout(renderHeadlines, REFRESH_INTERVAL_10_MINUTES_IN_MS);
  }

  renderHeadlines();
}

$(document).ready(function() {
  startHeadlineRenderRefresh();
});
