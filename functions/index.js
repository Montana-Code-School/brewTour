"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.api = undefined;

var _firebaseFunctions = require("firebase-functions");

var functions = _interopRequireWildcard(_firebaseFunctions);

var _cors = require("cors");

var _cors2 = _interopRequireDefault(_cors);

var _requestPromiseNative = require("request-promise-native");

var _requestPromiseNative2 = _interopRequireDefault(_requestPromiseNative);

var _express = require("express");

var _express2 = _interopRequireDefault(_express);

var _request = require("request");

var _request2 = _interopRequireDefault(_request);

var _axios = require("axios");

var _axios2 = _interopRequireDefault(_axios);

var _bodyParser = require("body-parser");

var _bodyParser2 = _interopRequireDefault(_bodyParser);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

var router = _express2.default.Router();
var app = (0, _express2.default)();

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use(_bodyParser2.default.json());
app.use(_bodyParser2.default.urlencoded({ extended: true }));

router.route('/proxy').get(function (req, res) {
  res.send(console.log(_axios2.default));
});
router.route('/proxy/breweries/:locality').get(function (req, res) {
  var url = 'https://api.brewerydb.com/v2/locations?key=5d2a32cf36729810ffae82e7193a9769&locality=' + req.params.locality;
  req.pipe((0, _request2.default)(url)).pipe(res);
});

router.route('/proxy/breweries/region/:region').get(function (req, res) {
  var url = 'https://api.brewerydb.com/v2/locations?key=5d2a32cf36729810ffae82e7193a9769&region=' + req.params.region;
  req.pipe((0, _request2.default)(url)).pipe(res);
});

router.route('/proxy/beers/:beerName').get(function (req, res) {
  var url = 'https://api.brewerydb.com/v2/beers?key=5d2a32cf36729810ffae82e7193a9769&withBreweries=Y&name=' + req.params.beerName;
  req.pipe((0, _request2.default)(url)).pipe(res);
});

router.route('/proxy/featuredlocation').get(function (req, res) {
  var url = 'https://api.brewerydb.com/v2/featured?key=5d2a32cf36729810ffae82e7193a9769';
  req.pipe((0, _request2.default)(url)).pipe(res);
});
app.use('/', router);
var api = exports.api = functions.https.onRequest(app);