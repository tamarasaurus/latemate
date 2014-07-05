var express = require('express');
var gtfs = require('gtfs');
var app = express();

console.log(gtfs);

app.get('/', function(req, res){
  res.json('hello world');
});

app.get('/api/agencies', function(req, res){
  gtfs.agencies(function(e, data){
    console.log("AGENCIES:" , data.length);
    res.json( data || {error: 'No agencies in database'});
  });
});


app.get('/api/routes/:agency', function(req, res){
  var agency_key = req.params.agency;
  gtfs.getRoutesByAgency(agency_key, function(e, data){
    console.log(data);
    res.send( data || {error: 'No routes for agency_key ' + agency_key});
  });
});


app.listen(3000);