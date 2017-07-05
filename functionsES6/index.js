import * as functions from "firebase-functions";
import cors from "cors";
import Rp from 'request-promise-native';
import express from "express";
import request from "request";
import axios from 'axios';
import bodyparser from 'body-parser';

const router = express.Router();
const app = express();

app.use( function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended: true}));

router.route('/proxy').get(function(req, res) {
  res.send(console.log(axios));
});
router.route('/proxy/breweries/:locality')

.get(function (req, res) {
  let url = 'https://api.brewerydb.com/v2/locations?key=5d2a32cf36729810ffae82e7193a9769&locality=' + req.params.locality;
  req.pipe(request(url)).pipe(res);
});

router.route('/proxy/breweries/region/:region')
.get(function (req, res) {
  let url = 'https://api.brewerydb.com/v2/locations?key=5d2a32cf36729810ffae82e7193a9769&region=' + req.params.region;
  req.pipe(request(url)).pipe(res);
});


router.route('/proxy/beers/:beerName')

.get(function (req, res) {
  let url = 'https://api.brewerydb.com/v2/beers?key=5d2a32cf36729810ffae82e7193a9769&withBreweries=Y&name=' + req.params.beerName;
  req.pipe(request(url)).pipe(res);
});

router.route('/proxy/featuredlocation')

.get(function (req, res) {
  let url = 'https://api.brewerydb.com/v2/featured?key=5d2a32cf36729810ffae82e7193a9769';
  req.pipe(request(url)).pipe(res);
});
app.use('/', router);
export let api = functions.https.onRequest(app);
