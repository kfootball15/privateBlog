'use strict';
var router = require('express').Router();
module.exports = router;
var _ = require('lodash');
var mongoose = require('mongoose');
var User = mongoose.model('User')
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

var ensureAuthenticated = function (req, res, next) {
    if (req.isAuthenticated()) {
        next();
    } else {
        res.status(401).end();
    }
};

// Create User
router.post('/', function (req, res, next){
  User.create(req.body.user)
  .then(function(newUser){
    console.log("New User", newUser)
    res.status(201).json({user: newUser})
  })
  .catch(next)
})

// Get user (params)
router.get('/:user_id', function (req, res, next){
  User.findById(req.params.user_id)
  .then(function(fetchedUser){
    console.log("Fetched User", fetchedUser.sanitize())
    res.status(200).json({user: fetchedUser.sanitize()})
  })
  .catch(next)
});

// Get user (query)
router.get('/', function (req, res, next){
  console.log(req)
  if (req.query){
    User.findById(req.query._id)
    .then(function(fetchedUser){
      console.log("Fetched User", fetchedUser.sanitize())
      res.status(200).json({user: fetchedUser.sanitize()})
    })
    .catch(next)
  } else {
    User.find({})
    .then(function(allusers){
      res.status(200).json({users:allusers})
    })
    .catch(next)
  }
});

// Update User
router.patch('/:user_id', function (req, res, next){
  User.findByIdAndUpdate(req.params.user_id, {$set: { username: req.body.user.username, email: req.body.user.email }}, {new: true })
  .then(function (updatedUser) {
    console.log("UPDATED USER", updatedUser)
    res.status(201).json( { user: updatedUser } );
  });
});

