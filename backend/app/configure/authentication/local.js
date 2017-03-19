'use strict';
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var mongoose = require('mongoose');
var User = mongoose.model('User');
var BlogPost = mongoose.model('blogPost');

module.exports = function (app) {

    // When passport.authenticate('local') is used, this function will receive
    // the email and password to run the actual authentication logic.
    var strategyFn = function (email, password, done) {

        User.findOne({ email: email })
            .populate('friends')
            .then(function (user) {
                // user.correctPassword is a method from the User schema.
                if (!user || !user.correctPassword(password)) {
                    done(null, false);
                } else {
                    // Properly authenticated.
                    done(null, user);
                }
            })
            .catch(done);
    };

    passport.use(new LocalStrategy({ usernameField: 'username', passwordField: 'password' }, strategyFn));

    // Good Article on a manual Token Authentication, and why we are doing this below :  https://emberigniter.com/implementing-authentication-with-ember-services/
    app.post('/token', function (req,res,next){

      // We get the user from our strategyFn above, which either returns the user or "false"
      var authCb = function (err, user) {

          if (err) return next(err);

          console.log("token user:", user)

          // if the user is false OR the grant_type is not 'password', we throw an error
          if (!user || req.body.grant_type !== 'password') {
              var error = new Error('Invalid login credentials.');
              error.status = 401;
              return next(error);
          }

          // req.logIn will establish our session.
          req.logIn(user, function (loginErr) {
              if (loginErr) return next(loginErr);
              // We respond with a response object that has user with _id and email.
              var jsonSend = {access_token: app.getValue('env').SESSION_SECRET, user: user};
              res.status(200).send(JSON.stringify(jsonSend));
          });

      };

      passport.authenticate('local', authCb)(req, res, next);

    });

    app.post('/confirmPassword', function (req,res,next){

      // 1. find user using the session data
      User.findOne({ email: req.body.email })
      .then(function (user) {
          // user.correctPassword is a method from the User schema.
          console.log("confirmPassword", user)
          if (!user || !user.correctPassword(req.body.password)) {
              return next(error)
              //done(null, false);
          } else {
              // Properly authenticated.
              res.status(200).json({user: user})
              //done(null, user);
          }
      })
      .catch(next);

    });

    app.post('/confirmPostPassword', function (req,res,next){

      // 1. find user using the session data
      BlogPost.findOne({ _id: req.body.postId })
      .then(function (blogpost) {
          // blogpost.correctPassword is a method from the blogpost schema.
          console.log("confirmPostPassword", blogpost)
          if (!blogpost || !blogpost.correctPassword(req.body.password)) {
              return next(error)
              //done(null, false);
          } else {
              // Properly authenticated.
              res.status(200).json(
                {
                  blogPost: blogpost.sanitize()
                }
              )
              //done(null, user);
          }
      })
      .catch(next);

    });


};
