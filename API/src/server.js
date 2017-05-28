
var express = require('express')  //import express from 'express';    // call express
var bodyParser = require('body-parser');  //import bodyParser from 'body-parser';   // define our app using express
var mongoose = require('mongoose');
mongoose.connect('mongodb://homer:simpson@ds155961.mlab.com:55961/duff');   // connect to our database

var User = require('./app/models/user');

const app = express();

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});


var port = 4000;    // set our port

// ROUTES FOR OUR API
var router = express.Router();    // get an instance of the express Router

// test route to make sure everything is working (accessed at GET http://localhost:8080/api)
router.get('/', function(req, res) {
  res.json({message: 'Yeah, buddy!'});
});

// more routes for our API will happen here
var router = express.Router();    // get an instance of the express Router

router.use(function(req, res, next) {
  // do logging
  console.log('Something is happening.');
  next();   // make sure we go to the next routes and don't stop here
});

router.route('/users')

  // create a user (accessed at POST http://localhost:8080/api/users)
  .post(function(req, res) {

    var user = new User();    // create a new instance of the user model
    user.name = req.body.name;
    // save the user and check for errors
    user.save(function(err) {
      if (err)
        res.send(err);

      res.json({message: 'User created!'});
    });
  })

  .get(function(req, res) {
    User.find(function(err, users) {
      if (err)
        res.send(err);

        res.json(users);
    });
  });


router.route('/users/:user_id')

  // get the user with that id (accessed at GET http://localhost:8080/api/users/:user_id)
  .get(function(req, res) {
    User.findById(req.params.user_id, function(err, user) {
      if(err)
        res.send(err);
      res.json(user);
    });
  })

  // update the user with this id (accessed at PUT http://localhost:8080/api/users/:user_id)
  .put(function(req, res) {

    // use our user model to find the user we want
    User.findById(req.params.user_id, function(err, user) {

      if (err)
        res.send(err);

      user.name = req.body.name;    // update the users info

      // save the user
      user.save(function(err) {
        if(err)
          res.send(err);

        res.json({message: 'User updated!'});
      });
    });
  })

  .delete(function(req, res) {
    User.remove({
      _id: req.params.user_id
    }, function(err, user) {
      if (err)
        res.send(err);
      res.json({message: 'Successfully deleted'});
    });
  });

// REGISTER OUR ROUTES
// all of our routes will be prefixed with /api
app.use('/api', router);

// START THE SERVER
app.listen(port);
console.log('Magic happens on port ' + port);
