var mongoose = require('mongoose');
var User = mongoose.model('User')

module.exports.newUser = function(req,res) {
  console.log("Got into api again", req.body)
  var user = new User(req.body);
  user.save(function(err){
    if(err){
      res.send(err);
    } else {
      res.send(user);
    }
  });
};
