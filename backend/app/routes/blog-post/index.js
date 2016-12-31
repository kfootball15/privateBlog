'use strict';
var router = require('express').Router();
var mongoose = require('mongoose');
var BlogPost = mongoose.model('blogPost');
module.exports = router;

router.post('/', function (req, res, next){
  // BlogPost.create(req.body.data.attributes)
  BlogPost.create(req.body.blogPost)
  .then(function(newPost){
    res.status(201).json({
      blogPost: newPost
    });
  })
  .catch(next);
});

router.get('/', function(req,res,next){
  BlogPost.find()
  .then(function(posts){
    console.log(posts)
    res.status(200).json({
      blogPost: posts
    });
  })
  .catch(next);
});
