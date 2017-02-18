'use strict';
var router = require('express').Router();
var mongoose = require('mongoose');
var BlogPost = mongoose.model('blogPost');
module.exports = router;

router.post('/', function (req, res, next){

  BlogPost.create(req.body.blogPost)
  .then(function(newPost){
    res.status(201).json({
      blogPost: newPost
    });
  })
  .catch(next);

});

router.get('/', function(req,res,next){

    BlogPost.find({owner: req.query.owner})
    .populate('owner friends')
    .then(function(posts){
      console.log(posts)
      res.status(200).json({
        blogPost: posts
      });
    })
    .catch(next);

});

router.delete('/:blogPostId', function(req,res,next){

    BlogPost.remove({_id: req.params.blogPostId})
    .then(function(post){
      res.status(200).json({
        blogPost: null
      });
    })
    .catch(next);

});

