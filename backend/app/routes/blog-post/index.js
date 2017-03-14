'use strict';
var router = require('express').Router();
var mongoose = require('mongoose');
var BlogPost = mongoose.model('blogPost');
module.exports = router;

router.post('/', function (req, res, next){

  // BlogPost.create(req.body.blogPost)
  // .then(function(newPost){
  //   res.status(201).json({
  //     blogPost: newPost
  //   });
  // })
  // .catch(next);

  BlogPost.findOneAndUpdate({_id:mongoose.Types.ObjectId()}, req.body.blogPost, {
      new: true,
      upsert: true,
      runValidators: true,
      setDefaultsOnInsert: true
  })
  .populate('owner friends')
  .exec()
  .then(function(newPost){
    res.status(201).json({
      blogPost: newPost
    })
  });

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

