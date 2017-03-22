import Ember from 'ember';
const { service } = Ember.inject; // We declare 'service' so that we can inject it more easily like so: session: service();

export default Ember.Component.extend({
  store: service(),
  session: service(),
  currentUser: service(),
  actions: {
    // initializeForm() {
    //   console.log("initializeForm Ran")
    //   this.set('modelFriendsArray', [])
    //   this.set('title', '')
    //   this.set('subtitle', '')
    //   this.set('postcontent', '')
    //   this.set('postPassword', undefined)
    //   this.set('newBlogPost', false)
    //   this.set('showFriendsList', false)
    // },
    // listener: Ember.computed('model', function() {
    //   this.initializeForm();
    // }),
    newPost () {
      // Initialize blogPost information:
      let title = this.get('title');
      let subtitle = this.get('subtitle');
      let postcontent = this.get('postcontent');
      let blogType = this.get('blogType');
      let userId = this.get('session.data.authenticated.user._id');
      let friends = this.get('modelFriendsArray');
      let postPassword;
      if (this.get('setPassword') && blogType === 'private') {
        postPassword = this.get('postPassword');
      }

      console.log(blogType)

      var route = this;
      // 1. Create our blog-post record and store it in a variable
      const blogpost = this.get('store').createRecord('blog-post', {
        date: new Date(),
        owner: userId,
        blogType: blogType,
        friends: friends,
        title: title,
        subtitle: subtitle,
        content: postcontent,
        password: postPassword
      });
      // 2. Save it to DB - .save() will make our post request to our /blog-posts (because assigned the correct model above) route with our blogpost record, created above
      blogpost.save()
      .then(function(blogPost){
        console.log(blogPost)
        route.get('reverse').unshiftObject(blogPost); // 3. Push the new blog post onto the front of the array, so that the page updates in real time
        route.set('title', ''); // 4. reset all variables
        route.set('subtitle', '');
        route.set('postcontent', '');
        route.set('postPassword', undefined);
        route.set('setPassword', false);
        route.toggleProperty('newBlogPost');

      })
      .catch(function(error){
        console.error("ERROR: Failed to save Blog Post, ", error);
      });

    },
    toggleNewPost(type) {

      // Initialize an empty array for this blog posts 'friends'
      this.set('modelFriendsArray', []);
      
      // Function: sets blogType property to 'private' or 'public'
      var that = this;
      function setBlogType(blogType) {
        that.get('blogType');
        that.set('blogType', blogType);
      }

      // 1. Reset new blog post properties
      this.toggleProperty('newBlogPost'); // Toggles on/off the new blog post field
      this.set('showFriendsList', false); // Toggles off the friends list

      // 2. If it is a public post, we want to allow them to add specific friends
      if (type === 'private') { this.set('private', true) }
      else { this.set('private', false) };

      // 3. Now we want to set the blogType property to public/private so we can save it with the post in the database.
      setBlogType(type); 

    },
    toggleSetPassword(){
      this.toggleProperty('setPassword')
      // If 'setPassword' is false, lets make sure we reset anything entered into the password field
      if (!this.get('setPassword')) this.set('postPassword', undefined)
    },
    togglePrivate(){
      this.set('public', true);
    },
    toggleShowFriendsList () {
      this.toggleProperty('showFriendsList');
    },
    setBlogTypePrivate(){
      this.get('blogType');
      this.set('blogType', 'private');
    },
    setBlogTypePublic(){
      this.get('blogType');
      this.set('blogType', 'public');
    },
        // Toggles appropriate properties and sets blogType to 'private' or 'public'
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
  }
});