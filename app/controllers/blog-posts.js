import Ember from 'ember';
const { service } = Ember.inject; // We declare 'service' so that we can inject it more easily like so: session: service();

    // Model is getting passed through our controller from the routes, so if we want to manipulate it we can do so here:
    // Solution: http://stackoverflow.com/questions/30127701/how-to-reverse-a-models-output-in-ember
    // .property(): http://stackoverflow.com/questions/18605866/what-does-property-do-in-function-property
export default Ember.Controller.extend({
  store: service(),
  session: service(),
  actions: {
    // Toggles appropriate properties and sets blogType to 'private' or 'public'
    toggleNewPost(typeFromTemplate){

      var that = this;
      function setBlogType(type) {
        that.get('blogType');
        that.set('blogType', type);
      }

      // 1. Reset new blog post properties
      this.toggleProperty('newBlogPost'); // Toggles on/off the new blog post field
      this.set('showFriendsList', false); // Toggles off the friends list

      // 2. If it is a public post, we want to allow them to add specific friends
      if (typeFromTemplate === 'public') { this.set('public', true) }
      else { this.set('public', false) };

      setBlogType(typeFromTemplate); // 3. Now we want to set the blogType property to public/private so we can save it with the post in the database.
    },
    togglepublic(){
      this.set('public', true);
    },
    toggleShowFriendsList(){
      this.toggleProperty('showFriendsList');
      this.set('modelFriendsArray', []); // Creates an empty array that resets -- for the new posts friends list
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
      // 1. store 'reverse' model in variable
      let reverse = this.get('reverse');
      // 2. find correct record to remove
      this.get('store').findRecord('blog-post', postId, { backgroundReload: false } )
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
    },
    newPost () {

      // Initialize blogPost information:
      const title = this.get('title');
      const subtitle = this.get('subtitle');
      const postcontent = this.get('postcontent');
      const blogType = this.get('blogType');
      const userId = this.get('session.data.authenticated.user._id');
      const friends = this.get('modelFriendsArray');

      var route = this;
      // 1. Create our blog-post record and store it in a variable
      const blogpost = this.get('store').createRecord('blog-post', {
        date: new Date(),
        owner: userId,
        blogType: blogType,
        friends: friends,
        title: title,
        subtitle: subtitle,
        content: postcontent
      });
      // 2. Save it to DB - .save() will make our post request to our /blog-posts (because assigned the correct model above) route with our blogpost record, created above
      blogpost.save()
      .then(function(blogPost){
        route.get('reverse').unshiftObject(blogPost); // 3. Push the new blog post onto the front of the array, so that the page updates in real time
        route.set('title', ''); // 4. reset all variables
        route.set('subtitle', '');
        route.set('postcontent', '');
        route.toggleProperty('newBlogPost');

      })
      .catch(function(reason){
        console.error("ERROR: Failed to save Blog Post, ", reason);
      });

    },
    addfriend (friend) {
      let arr = this.get('modelFriendsArray');

      for (var i = 0; i < arr.length; i++) {
        if(arr[i]._id ===friend._id) { return };
      }
      arr.pushObject(friend); // using pushObject instead of push will update the template
    },
    removefriend (friend) {
      let arr = this.get('modelFriendsArray');

      for (var i = 0; i < arr.length; i++) {
        if(arr[i]._id === friend._id) { arr.removeObject(arr[i]) };
      }
    } // Pushes selected friend into friends Array
  },
  reverse: Ember.computed('model', function() {
    return this.get('model').toArray().reverse();
  }) // This must be an Ember.computed property so that we watch for any changes made to the array.
});












