var express = require('express');
var request = require('request');

var app = express();
var port = 9078;
var router = express.Router();

app.use( function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

router.route('/proxy/breweries/:locality')

.get(function (req, res) {
  let url = 'http://api.brewerydb.com/v2/locations?key=5d2a32cf36729810ffae82e7193a9769&locality=' + req.params.locality;
  req.pipe(request(url)).pipe(res);
});

router.route('/proxy/breweries/region/:region').get(function (req, res) {
  let url = 'http://api.brewerydb.com/v2/locations?key=5d2a32cf36729810ffae82e7193a9769&region=' + req.params.region;
  req.pipe(request(url)).pipe(res);
});

router.route('/proxy/beers/:beerName')

.get(function (req, res) {
  let url = 'http://api.brewerydb.com/v2/beers?key=5d2a32cf36729810ffae82e7193a9769&withBreweries=Y&name=' + req.params.beerName;
  req.pipe(request(url)).pipe(res);
});

router.route('/proxy/featuredlocation')

.get(function (req, res) {
  let url = 'http://api.brewerydb.com/v2/featured?key=5d2a32cf36729810ffae82e7193a9769';
  req.pipe(request(url)).pipe(res);
});

app.use('/api', router);

app.listen(port);
console.log('The magic happens on port ' + port);
