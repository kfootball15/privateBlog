'use strict';
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var mongoose = require('mongoose');
var User = mongoose.model('User');

module.exports = function (app) {

    // When passport.authenticate('local') is used, this function will receive
    // the email and password to run the actual authentication logic.
    var strategyFn = function (email, password, done) {

        console.log("STRATEGYFN:", email, password);

        User.findOne({ email: email })
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

    app.post('/token', function (req,res,next){

      // We get the user from our strategyFn above, which either returns the user or "false"
      var authCb = function (err, user) {

          if (err) return next(err);

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
              // res.status(200).send({
              //     user: user.sanitize()
              // });
              var jsonSend = {access_token: app.getValue('env').SESSION_SECRET, user: user.sanitize()};
              console.log("jsonSend", jsonSend)
              res.status(200).send(JSON.stringify(jsonSend));
          });

      };

      passport.authenticate('local', authCb)(req, res, next);

    });



};
