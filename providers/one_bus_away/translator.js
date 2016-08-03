'use strict';

var _ = require('lodash');

var CONFIG = require('../../config/one-bus-away.json');

var TransitData = require('../../models/transit-data');
var StopData = require('../../models/stop-data');
var DepartureData = require('../../models/departure-data');

var convertTimestampToDate = function(timestamp) {
  return new Date(timestamp);
}

var createTransitDataForDepartureData = function(departuresForStop, routeIds) {
  var departures = departuresForStop.data.entry.arrivalsAndDepartures;
  //filter out route ids we don't care about
  departures = _.filter(departures, function(departure) {
    return _.includes(routeIds, departure.routeId);
  });
  //filter out non-predicted arrivals
  departures = _.filter(departures, function(departure) {
    return departure.predicted;
  });

  var transitDataForStop = [];

  _(departures).forEach(function(departure) {
    var departureDate = convertTimestampToDate(departure.predictedDepartureTime);
    var routeDisplayName = departure.routeShortName;
    transitDataForStop.push({
      "departueTime": departureDate,
      "displayName": routeDisplayName
    });
  });

  return transitDataForStop;
}

var routesIdsForStopFromConfig = function(stopId) {
  var routesToDisplayForStop = _(CONFIG.stopsToDisplay).find(function(stop) {
    return stop.stopId === stopId;
  }).routesToDisplay;

  return _.map(routesToDisplayForStop, function(route) {
    return route.routeId;
  })
}
var translateDeparturesData = function(oneBusAwayStopData) {
  var transitData = [];
  _(oneBusAwayStopData).forEach(function(departuresForStop) {
    var stopId = departuresForStop.data.entry.stopId;
    var routeIds = routesIdsForStopFromConfig(stopId);
    var transitDataForStop  = createTransitDataForDepartureData(departuresForStop, routeIds);
    transitData.push(transitDataForStop);
  });
  return transitData;
}

module.exports = {
  translate : function(oneBusAwayStopData) {
    return translateDeparturesData(oneBusAwayStopData);
  }
}
