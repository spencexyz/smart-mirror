var express = require('express');
var fetch = require('node-fetch');
var app = express();

var keys  = require('./keys.json')
var soundTransitAPIKey = keys.sound_transit.secret;
var soundTransitAPIRoot = 'http://api.pugetsound.onebusaway.org/api/where';
var soundTransitAPIArrivals = '/arrivals-and-departures-for-stop';

app.get('/', function (req, res) {
  res.send("Ni Hao!");
});

app.get('/bus', function (req, res) {
  var fifteenthAndSixtiethStopId = '1_13700';
  var fifteenthAndSixtyfifthStopId = '1_13700';
  var dRouteId = '1_102581';
  var fifteenXRouteId = '1_100044';
  var url = soundTransitAPIRoot + soundTransitAPIArrivals + '/' + fifteenthAndSixtiethStopId + '.json?key=' + soundTransitAPIKey;
  fetch(url)
    .then(function(response) {
      return response.json();
    })
    .then(function(data) {
      res.send(data);
    });
});
app.listen(4000, function () {
  console.log('Magic Mirror Dashboard on Port 4000!');
});
