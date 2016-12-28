'use strict';
var router = require('express').Router();
var mongoose = require('mongoose')
var blogPost = mongoose.model('blogPost')
module.exports = router;


// router.use(function(req, res, next) {
//   console.log("Got into blogPosts")
//   res.status(400).send('')
// })

router.post('/', function (req, res, next){
  console.log("Made post request to /blogPosts/", req.body);
  blogPost.create(req.body)
  .then(function(newPost){
    res.status(201).send(newPost)
  })
  .catch(next)
})
