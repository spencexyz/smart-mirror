'use strict';

var Mustache = require('mustache');
var $ = require('jquery');
var _ = require('lodash');

var NOW = 'Now';

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

var success = function(data) {
  var view = {
    headlines: (data.data)
  };
  var output = Mustache.render(template, view);
  $container.innerHTML = output;
}

var refreshHeadlines = function() {
  var url = '/headlines';

  $.ajax({
    url: url,
    success: success,
    dataType: 'json'
  });
}

refreshHeadlines();
