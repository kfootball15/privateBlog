import Ember from 'ember';
const { service } = Ember.inject; // We declare 'service' so that we can inject it more easily like so: session: service();

    // Model is getting passed through our controller from the routes, so if we want to manipulate it we can do so here:
    // Solution: http://stackoverflow.com/questions/30127701/how-to-reverse-a-models-output-in-ember
    // .property(): http://stackoverflow.com/questions/18605866/what-does-property-do-in-function-property
export default Ember.Controller.extend({
  store: service(),
  session: service(),
  actions: {
    toggleNewPost(typeFromTemplate){
      var that = this;
      function setBlogType(type) {
        that.get('blogType')
        that.set('blogType', type)
      }

      //Reset new blog post properties
      this.toggleProperty('newBlogPost'); // Toggles on/off the new blog post field
      this.set('showFriendsList', false); // Toggles off the friends list

      // If it is a public post, we want to allow them to add specific friends
      if (typeFromTemplate === 'public') this.set('public', true);
      else this.set('public', false);

      setBlogType(typeFromTemplate)// Now we want to set the blogType property to public/private so we can save it with the post in the database.
    },
    togglepublic(){
      this.set('public', true);
    },
    toggleShowFriendsList(){
      this.toggleProperty('showFriendsList');
      this.set('modelFriendsArray', []) // Creates an empty array that resets -- for the new posts friends list
    },
    setBlogTypePrivate(){
      this.get('blogType');
      this.set('blogType', 'private');
    },
    setBlogTypePublic(){
      this.get('blogType');
      this.set('blogType', 'public');
    },
    deletePost(postId) {
      this.get('store').findRecord('blog-post', postId, { backgroundReload: false })
      .then(function(post) {
        post.deleteRecord(); // Deletes Record form store
        post.get('isDeleted'); // returns 'true'
        return post.save(); // Makes DELETE request to /blog-posts/:postId
        //--> post.destroyRecord(); // => Alternatively, we could use .destroyRecord() delete the record AND make DELETE to /blog-posts/2
      })
      .catch(function(reason){
        console.error("ERROR: Failed to delete the blogPost", reason);
      });
    },
    newPost () {

      const title = this.get('title');
      const subtitle = this.get('subtitle');
      const postcontent = this.get('postcontent');
      const blogType = this.get('blogType');
      // console.log("BTYPE",  blogType)
      const userId = this.get('session.data.authenticated.user._id');
      const friends = this.get('modelFriendsArray')


      // 1. Create our blog-post record and store it in a variable
      const blogpost = this.store.createRecord('blog-post', {
        date: new Date(),
        owner: userId,
        blogType: blogType,
        friends: friends,
        title: title,
        subtitle: subtitle,
        content: postcontent
      });

      var route = this;
      // 2. Save it to DB - .save() will make our post request to our /blog-posts (because assigned the correct model above) route with our blogpost record, created above
      blogpost.save()
      .then(function(){
        route.set('title', '');
        route.set('subtitle', '');
        route.set('postcontent', '');
        route.toggleProperty('newBlogPost');
        // *** ADD SOME KIND MODEL REFRESH HERE

      })
      .catch(function(reason){console.error("ERROR: Failed to save Blog Post", reason)});

    },
    addfriend (friend) {
      let arr = this.get('modelFriendsArray')

      for (var i = 0; i < arr.length; i++) {
        if(arr[i]._id ===friend._id) return;
      }
      arr.pushObject(friend) // using pushObject instead of push will update the template
      console.log("addfriend", friend, arr)
    }, // Pushes selected friend into friends Array
    removefriend (friend) {
      let arr = this.get('modelFriendsArray')

      for (var i = 0; i < arr.length; i++) {
        if(arr[i]._id === friend._id) arr.removeObject(arr[i])
      }
      console.log("addfriend", friend, arr)
    } // Pushes selected friend into friends Array
  },
  reverse: function(){
    return this.get('model').toArray().reverse();
  }.property('model.[]')
});
