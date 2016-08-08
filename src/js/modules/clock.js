var $ = require('jquery');

$( document ).ready(function() {
  var $container = $('.Layout--Clock');
  var $hour = $container.find('.Clock--hour')[0];
  var $minute = $container.find('.Clock--minute')[0];
  var $dayOfWeek = $container.find('.Clock--day-of-week')[0];
  var $month = $container.find('.Clock--month')[0];
  var $dayOfMonth = $container.find('.Clock--day-of-month')[0];

  var getDayOfWeekFromDate = function(date) {
    var weekday = new Array(7);
    weekday[0]=  "Sunday";
    weekday[1] = "Monday";
    weekday[2] = "Tuesday";
    weekday[3] = "Wednesday";
    weekday[4] = "Thursday";
    weekday[5] = "Friday";
    weekday[6] = "Saturday";

    var zeroIndexedDay = date.getDay();
    return weekday[zeroIndexedDay];
  }
  var getMonthNameFromDate = function(date) {
    var month = new Array();
    month[0] = "January";
    month[1] = "February";
    month[2] = "March";
    month[3] = "April";
    month[4] = "May";
    month[5] = "June";
    month[6] = "July";
    month[7] = "August";
    month[8] = "September";
    month[9] = "October";
    month[10] = "November";
    month[11] = "December";

    var zeroIndexedMonth = date.getMonth();
    return month[zeroIndexedMonth];
  }

  function startTime() {
      var now = new Date();
      var hour = now.getHours();
      var minute = now.getMinutes();
      var dayOfWeek = getDayOfWeekFromDate(now);
      var month = getMonthNameFromDate(now);
      var dayOfMonth = now.getDate();

      $hour.innerHTML = hour;
      $minute.innerHTML = minute;
      $dayOfWeek.innerHTML = dayOfWeek;
      $month.innerHTML = month;
      $dayOfMonth.innerHTML = dayOfMonth;
      setTimeout(startTime, 500);
  }

  startTime();
});
