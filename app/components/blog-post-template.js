import Ember from 'ember';
const { service } = Ember.inject;

export default Ember.Component.extend({
  store: service(),
  session: service(),
  currentUser: service(),
  confirmPostPassword: service(),
  createTempFriends: service(),
  email: service(),
  actions: {
    deletePost(post) {
      console.log()

      let route = this;
      if(this.get('session.data.authenticated.user._id') === post.get('owner')._id) {
        // 1. store 'reverse' model in variable
        let reverse = route.get('reverse');
        // 2. find correct record to remove
        route.get('store').findRecord('blog-post', post.id, { backgroundReload: false } )
        .then(function(post) {
          post.deleteRecord(); // 3. Deletes Record form store
          return post.save(); // 4. Makes DELETE request to /blog-posts/:postId   //-->
          // post.destroyRecord(); // => Alternatively, we could use .destroyRecord() delete the record AND make DELETE to /blog-posts/2
        })
        .then(function(post){
          // 5. Find correct post and remove from 'reverse' so that screen live updates properly.
          for (var i = 0; i < reverse.length; i++) {
            if(reverse[i] === post) {
              reverse.removeAt(i);
              break;
            }
          }
        })
        .catch(function(reason){
          console.error("ERROR: Failed to delete the blogPost", reason);
        });
      } else {
        console.error('You do not have permission to delete other users posts')
      }
    },
    showFriends(post){
      let that = this;
      if (post){
        that.get('store').findRecord('blog-post', post.id)
        .then(function(post) {
          that.set('modelFriendsArray', post.get('friends'));
        })
      }
      this.toggleProperty('showFriendsList')
    },
    saveFriends(post){
      let currentUser = this.get('session.data.authenticated.user');
      let currentUserId = currentUser._id;
      let postOwner = post.get('owner') || post.owner;
      let postOwnerId = postOwner._id;
      let postPassword;
      if (this.postPassword) postPassword = this.postPassword;

      let emailObject = {
        password: postPassword,
        postId: post.get('id')
      }

      let that = this;
      // 1. Check to make sure that it is the post owner that is making edits to friends list
      if(currentUserId === postOwnerId) {
        // 2. Check the added friends for email addresses without associated accounts, and create temp accounts for them
        let promiseArray = this.get('createTempFriends').createPromiseArray(that.get('modelFriendsArray'));   
        Promise.all(promiseArray) 
        .then(function(updatedFriends){
          updatedFriends.forEach(function(friend){
            that.get('modelFriendsArray').push(friend.get('id')) // Push the new temp accounts into the friends array
          })
          // 3. Find and update the correct blog post
          return that.get('store').findRecord('blog-post', post.id)
        })
        .then(function(post) {
          // 4. Make sure our 'friends' array and 'modelFriendArray' are in tune with eachother
          that.set('friends', that.get('modelFriendsArray'));
          // 5. Save the edits to the posts friends list
          return post.save()
        })
        .then(function(post){
          // 6. Email everyone on the friends list (Should fix this to just email the new friends)
          let friends = post.get('friends')
          if(emailObject){
            for (var i = 0; i < friends.length; i++) {
              that.get('email').emailUser(friends[i], currentUser, emailObject)
            }
          }
        })
        .catch(function(error){
          console.error(error)
        })
      }
      this.toggleProperty('showFriendsList');
    },
    toggleShowPrivateContent(){
      this.toggleProperty('showPrivateContent')
    },
    toggleReadyToAddFriends() {
      this.toggleProperty('readyToAddFriends')
    },
    confirmPostPassword(postId, postPassword){
      let route = this;
      this.get('confirmPostPassword').confirmPassword(postId.toString(), postPassword.toString())
      .then(function(blogPost){
        // If the password is correct:
        route.set('private_content', blogPost.blogPost.content);
        route.set('showPrivateContent', true)
      })
      .catch(function(error){
        // If the password is correct:
        console.error('Incorrect Password', error);
        let active = $('#passwordForm_'+postId).find('input')
        shake('passwordForm_'+postId, active) // public/assets/ui-actions --> Shakes the div and turns background red
      })
    }
  }
});
