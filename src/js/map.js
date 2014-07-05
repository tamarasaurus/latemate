'use strict';
var _ = require('underscore');
var qs = require('querystring');
var utils = require('./utils');

var map = L.mapbox.map('map', 'tamarachahine.imjbe110')
	.setView([-33, 150], 9);

var loadMarkers = function(){
    var obj = qs.parse(window.location.search);
    var params = utils.replaceStringInKey(obj, '?', '');

    $.when($.ajax('/api/stops_near/' + params.lat + '/'+params.lng)).then(function(data, textStatus, jqXHR) {
        console.log(data);
        _.each(data, function(m) {
            L.marker([
                   m.stop_lat,
                   m.stop_lon
               ], {
                   icon: L.divIcon({
                       className: 'stop-icon',
                       // html: '<strong>'+m.stop_name+'</strong',
                       iconSize: [10, 10]
                   })
               }).addTo(map);

        });
    });
};

loadMarkers();

var getCoords = function(){
    var lat = $('.latlng').val().split(',')[0];
    var lng = $('.latlng').val().split(',')[1];
    var url = 'lat='+lat+'&lng='+lng;

    console.log(lat, lng, url);
    if(!_.isUndefined(lat)){
    window.History.pushState({ 'params': {lat: lat, lng: lng}}, null, '?' + url);
    }

};

if (History.enabled) {
    History.Adapter.bind(window, 'statechange', function() {
        var State = History.getState();
        console.log(State.data);
        loadMarkers();
    });
}

$(document).on('click', '.get-location', function(){
    getCoords();
});


