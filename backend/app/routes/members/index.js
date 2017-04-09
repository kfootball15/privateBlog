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

// POST : Create User
router.post('/', function (req, res, next){
  User.create(req.body.user) // If the user does not exist, we are creating it.
  .then(function(newUser){
    res.status(201).json({user: newUser.sanitize()})
  })
  .catch(function(error){ // If we get a duplicate key error, send back the original user (we use it with temp users)
    if(error.message.indexOf("E11000 duplicate key error") > -1) {
      return User.findOne({username: req.body.user.username})
    } else {
      next(error)
    }
  })
  .then(function(tempUser){ 
    res.status(200).json({user: tempUser.sanitize()})
  })
})

// Get user (params)
router.get('/:user_id', function (req, res, next){
  console.log(req.params.user_id)
  if(req.params.user_id){  
    User.findOne({_id: req.params.user_id})
    .populate('friends', ['username', 'firstname', 'lastname', 'friends', 'bio', 'email']).exec()
    .then(function(fetchedUser){
      console.log(fetchedUser)
      res.status(200).json({user: fetchedUser.sanitize()})
    })
    .catch(next)
  }
});


// Get user (query)
router.get('/', function (req, res, next){
  if (req.query._id){
    User.findById(req.query._id)
    .populate('friends', ['username', 'firstname', 'lastname', 'friends', 'bio', 'email'])
    .then(function(fetchedUser){
      console.log("Fetched User", fetchedUser.sanitize())
      res.status(200).json({user: fetchedUser.sanitize()})
    })
    .catch(next)    
  }
  if (req.query.isTutorialFriend){
    console.log("In req.query.isTutorialFriend")
    User.find({isTutorialFriend: req.query.isTutorialFriend})
    .then(function(fetchedUsers){
      console.log("Fetched Users", fetchedUsers)
      let arrayOfSuperFriends = []
      for (var i = 0; i < fetchedUsers.length; i++) {
        arrayOfSuperFriends.push(fetchedUsers[i].sanitize())
      }
      res.status(200).json({user: arrayOfSuperFriends})
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
