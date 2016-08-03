'use strict';

var _ = require('lodash');

var fetch = require('node-fetch');

var API_KEY = require('../../config/keys.json').one_bus_away.secret;
var CONFIG = require('../../config/one-bus-away.json');

var BASE_URL = 'http://api.pugetsound.onebusaway.org/api/where';
var ARRIVALS_AND_DEPARTURES_ENDPOINT = '/arrivals-and-departures-for-stop';

var constructDeparturesURLForStop = function(stopId) {
  var url = BASE_URL + ARRIVALS_AND_DEPARTURES_ENDPOINT + '/' + stopId + '.json?key=' + API_KEY;
  console.log(url);
  return url;
}

var GETFromEndpoint = function(url) {
  return fetch(url).then(function(response) {
    return response.json();
  })
}

var retrieveDepartureDataForStops = function() {
  var promisedResults = [];
  _(CONFIG.stopsToDisplay).forEach(function(stop) {
    var url = constructDeparturesURLForStop(stop.stopId);
    promisedResults.push(GETFromEndpoint(url));
  });

  return Promise.all(promisedResults);
}

module.exports = {
  retrieve: function() {
    return retrieveDepartureDataForStops();
  }
}
