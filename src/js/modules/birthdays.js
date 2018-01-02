'use strict';

var Mustache = require('mustache');
var $ = require('jquery');
var _ = require('lodash');
var birthdayList = require('../../assets/birthdays.json');

var REFRESH_INTERVAL_10_MINUTES_IN_MS = 600000;

var $container = $('.Layout--Birthdays')[0];

var template =    '<div class="Quotes--container">' +
                    '{{#birthdays}}' +
                    '<div class="Birthdays--body">' +
                      '<p class="Quotes--text birthday-name">Today is {{name}}\'s Birthday!</p>' +
                      '<img class="present" src="https://image.ibb.co/dAwWUm/present.png" />' +
                    '</div>' +
                    '{{/birthdays}}' +
                  '</div>';

var startBirthdaysRenderRefresh = function() {
  var getBirthdays = function(data) {
    let TODAY = new Date();
    TODAY.setHours(0,0,0,0);
    TODAY.setFullYear(2017)
    let TODAY_BDAYS = [];
    for (let i = 0; i < data.birthdays.length; i++) {
      let DOB = new Date(data.birthdays[i].date);
      DOB.setHours(0,0,0,0);
      DOB.setFullYear(2017);
      if (TODAY.getTime() === DOB.getTime()) {
        TODAY_BDAYS.push(data.birthdays[i]);
      } else {
        console.log("nope, to " + data.birthdays[i].name);
      }
    }

    console.log('updating birthdays');
    console.log(TODAY_BDAYS);

    var view = {
      birthdays: TODAY_BDAYS
    };
    var output = Mustache.render(template, view);
    $container.innerHTML = output;
  }

  var handleError = function(err) {
    console.log('error');
    console.log(err);
  }

  var renderBirthdays = function() {
    console.log('rendering bdays');
    getBirthdays(birthdayList);
    // var url = '/quotes';

    // $.ajax({
    //   url: "https://api.forismatic.com/api/1.0/",
    //   jsonp: "jsonp",
    //   dataType: "jsonp",
    //   data: {
    //     method: "getQuote",
    //     lang: "en",
    //     format: "jsonp"
    //   }
    // })
    // .done(handleGetQuotesSuccess)
    // .fail(handleError);

    var now = new Date();
    var night = new Date(
        now.getFullYear(),
        now.getMonth(),
        now.getDate() + 1, // the next day, ...
        0, 0, 0 // ...at 00:00:00 hours
    );
    var msToMidnight = night.getTime() - now.getTime();

    setTimeout(function() {
        renderBirthdays();    //      Then, reset again next midnight.
    }, msToMidnight);
  }

  renderBirthdays();
}

$(document).ready(function() {
  startBirthdaysRenderRefresh();
});
