'use strict';

var _ = require('lodash');

var CONFIG = require('../../config/one-bus-away.json');

var StopData = require('../../models/stop-data');
var DepartureData = require('../../models/departure-data');

var convertTimestampToDate = function(timestamp) {
  return new Date(timestamp);
}

var filterDepartures = function(departures, routeIds) {
  //filter out route ids we don't care about
  departures = _.filter(departures, function(departure) {
    return _.includes(routeIds, departure.routeId);
  });
  //filter out non-predicted arrivals
  departures = _.filter(departures, function(departure) {
    return departure.predicted && departure.predictedArrivalTime;
  });

  return departures;
}

var translateDepartures = function(departures) {
  var arrivalsAndDepartures = [];

  _(departures).forEach(function(departure) {
    var departureDate = convertTimestampToDate(departure.predictedDepartureTime);
    var routeDisplayName = departure.routeShortName;
    arrivalsAndDepartures.push(new DepartureData(departureDate, routeDisplayName));
  });

  return arrivalsAndDepartures;
}

var routesIdsForStopFromConfig = function(stopId) {
  var routesToDisplayForStop = _(CONFIG.stopsToDisplay).find(function(stop) {
    return stop.stopId === stopId;
  }).routesToDisplay;

  return _.map(routesToDisplayForStop, function(route) {
    return route.routeId;
  })
}

var stopNameFromStopData = function(departuresAndArrivalsForStop, stopId) {
  var stops = departuresAndArrivalsForStop.data.references.stops;
  return _(stops).find(function(stop) {
    return stop.id === stopId;
  }).name;
}

var translateDeparturesData = function(oneBusAwayStopData) {
  var transitData = [];
  _(oneBusAwayStopData).forEach(function(departuresForStop) {
    var stopId = departuresForStop.data.entry.stopId;
    var stopName = stopNameFromStopData(departuresForStop, stopId);
    var relevantRouteIds = routesIdsForStopFromConfig(stopId);
    var relevantDepartures = filterDepartures(departuresForStop.data.entry.arrivalsAndDepartures, relevantRouteIds);
    var translatedDepartures = translateDepartures(relevantDepartures);
    var stop = new StopData(translatedDepartures, stopName)
    transitData.push(stop);
  });
  return {
    "data": transitData
  };
}

module.exports = {
  translate : function(oneBusAwayStopData) {
    return translateDeparturesData(oneBusAwayStopData);
  }
}
