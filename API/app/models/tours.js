// load the things we need
var mongoose = require('mongoose');
var bcrypt   = require('bcrypt-nodejs');
var Schema = mongoose.Schema;

// define the schema for our user model
var toursSchema = mongoose.Schema({

  tours            : {
      toursName    : String
    }
});

// create the model for tours and expose it to our app
module.exports = mongoose.model('Tours', toursSchema);
