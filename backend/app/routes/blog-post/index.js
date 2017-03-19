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

    function userIsFriend(postFriends){
      // If the post has friends, check to see if any of them are the user requesting these posts.
      if (postFriends){
        for (var i = 0; i < postFriends.length; i++) {
          if (postFriends[i]._id.toString() === req.query.userId) {
            return true;
          }
        }
      }
      return false;
    }

    BlogPost.find({owner: req.query.owner})
    .populate('owner friends')
    .then(function(posts){
      console.log(posts)
      // If the user making the request is also the owner of the all the posts, it means the user is requesting his own posts and has permission to all posts.
      if (req.query.userId === req.query.owner){
        res.status(200).json({
          blogPost: posts
        });

      } else {

        // Otherwise, lets just send back the posts that the user has permissions to view (public posts and posts the are a 'reader', or friend, of)
        let filteredPosts = [];
        for (var i = 0; i < posts.length; i++) {
          if(posts[i].blogType === 'public' || userIsFriend(posts[i].friends)){
            filteredPosts.push(posts[i])
          }
        }

        res.status(200).json({
          blogPost: filteredPosts
        });

      }
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

