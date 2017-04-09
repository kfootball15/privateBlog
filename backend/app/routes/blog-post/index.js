'use strict';
var router = require('express').Router();
var mongoose = require('mongoose');
var BlogPost = mongoose.model('blogPost');
module.exports = router;

router.post('/', function (req, res, next){

  BlogPost.create(req.body.blogPost)
  .then(function(newPost){
    return BlogPost.populate(newPost, {path: "owner friends", select: '_id username email bio firstname lastname friends'})
  })
  .then(function(newPost){
    res.status(201).json({
      blogPost: newPost.sanitize()
    });
  })
  .catch(next);

  // BlogPost.findOneAndUpdate({_id:mongoose.Types.ObjectId()}, req.body.blogPost, {
  //     new: true,
  //     upsert: true,
  //     runValidators: true,
  //     setDefaultsOnInsert: true
  // })
  // .populate('owner friends')
  // .exec()
  // .then(function(newPost){
  //   res.status(201).json({
  //     blogPost: newPost
  //   })
  // });

});

router.get('/', function(req,res,next){

    if (req.query.owner) {
      BlogPost.find({owner: req.query.owner})
      .populate('owner friends', ['_id', 'username', 'email', 'bio', 'firstname', 'lastname', 'friends'])
      .then(function(posts){

        // If the user making the request is also the owner of the all the posts, it means the user is requesting his own posts and has permission to all posts.
        if (req.query.userId === req.query.owner){

          let sanitizedPosts = [];
          for (var i = 0; i < posts.length; i++) {
              sanitizedPosts.push(posts[i].sanitize())
          }

          res.status(200).json({
            blogPost: sanitizedPosts
          });

        } 

        else {

          // Otherwise, lets just send back the posts that the user has permissions to view (public posts and posts the are a 'reader', or friend, of)
          let filteredPosts = [];
          for (var i = 0; i < posts.length; i++) {
            if(!posts[i].private || userIsFriend(posts[i].friends)){
              filteredPosts.push(posts[i].sanitize())
            }
          }

          res.status(200).json({
            blogPost: filteredPosts
          });

        }
      })
      .catch(next);
    }
    else if (req.query.isTutorialPost) {
      console.log("Got here, isTutorialPost")
      BlogPost.updateMany({ isTutorialPost: req.query.isTutorialPost }, { $set: { owner: req.query.newOwner }})
      // BlogPost.find({isTutorialPost: req.query.isTutorialPost})
      .populate('friends', ['_id', 'username', 'email', 'bio', 'firstname', 'lastname', 'friends'])
      .then(function(posts){
        console.log("tutorial posts:", posts)
          let sanitizedPosts = [];
          for (var i = 0; i < posts.length; i++) {
              sanitizedPosts.push(posts[i].sanitize())
          }

          res.status(200).json({
            blogPost: sanitizedPosts
          });

      })
      .catch(next);
    }


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

});


router.get('/:id', function(req,res,next){
  console.log(req.params.id)
  BlogPost.find({_id: req.params.id})
  .populate('owner friends', ['_id', 'username', 'email', 'bio', 'firstname', 'lastname', 'friends'])
  .then(function(post){
    res.status(200).json({
      blogPost: post[0].sanitize()
    })
  })
});


router.patch('/:id', function (req, res, next){
  BlogPost.findByIdAndUpdate(req.params.id, {$set: {
    content: req.body.blogPost.content,
    friends: req.body.blogPost.friends,
    title: req.body.blogPost.title,
    subtitle: req.body.blogPost.subtitle,
    date: new Date()
  }}, {new: true })
  .then(function(newPost){
    return BlogPost.populate(newPost, {path: "owner friends", select: '_id username email bio firstname lastname friends'})
  })
  .then(function (updatedPost) {
    console.log("updated psot", updatedPost)
    res.status(201).json({ 
      blogPost: updatedPost.sanitize() 
    });
  });
});



router.delete('/:blogPostId', function(req,res,next){

    // Add Security Here
    BlogPost.remove({_id: req.params.blogPostId})
    .then(function(post){
      res.status(200).json({
        blogPost: null
      });
    })
    .catch(next);

});

