'use strict';
var router = require('express').Router();
module.exports = router;
var _ = require('lodash');
var mongoose = require('mongoose');
var User = mongoose.model('User');
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
    res.status(201).json({user: newUser.sanitize()})
  })
  .catch(next)
})

// Get user (params)
router.get('/:user_id', function (req, res, next){
  User.findOne({_id: req.params.user_id})
  .populate('friends').exec()
  .then(function(fetchedUser){
    res.status(200).json({user: fetchedUser.sanitize()})
  })
  .catch(next)
});

// Get user (query)
router.get('/', function (req, res, next){
  if (req.query){
    User.findById(req.query._id)
    .populate('friends')
    .then(function(fetchedUser){
      console.log("Fetched User", fetchedUser.sanitize())
      res.status(200).json({user: fetchedUser.sanitize()})
    })
    .catch(next)
  }
});

// Update User
router.patch('/:user_id', function (req, res, next){
  User.findByIdAndUpdate(req.params.user_id, {$set: {
    username: req.body.user.username,
    email: req.body.user.email,
    firstname: req.body.user.firstname,
    lastname: req.body.user.lastname,
    bio: req.body.user.bio
    }}, {new: true })
  .then(function (updatedUser) {
    res.status(201).json( { user: updatedUser.sanitize() } );
  });
});


  //   User.find({})
  //   .then(function(allusers){
  //     res.status(200).json({users:allusers})
  //   })
  //   .catch(next)
  // }
