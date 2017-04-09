import Ember from 'ember';
const { service } = Ember.inject; // We declare 'service' so that we can inject it more easily like so: session: service();


export default Ember.Component.extend({
  store: service(),
  session: service(),
  email: service(),
  currentUser: service(),
  createTempFriends: service(),
  modelFriendsArray: [],
  tinymceCounter: 0,
  resetPostForm: function () {
    this.set('modelFriendsArray', [])
    this.set('title', '')
    this.set('subtitle', '')
    this.set('postcontent', '')
    this.set('postPassword', undefined)
    this.set('newBlogPost', false)
    this.set('showFriendsList', false)
  },
  didRender() {
    this._super(...arguments)
    tinymce.init({ 
      selector:'#newpost-inputblogpost-textarea'+this.get('tinymceCounter'),
      value: this.get('postcontent'),
      height: 300,
      menubar: false,
      plugins: [
        'advlist autolink lists link image charmap print preview anchor',
        'searchreplace visualblocks code fullscreen',
        'insertdatetime media table contextmenu paste code'
      ],
      toolbar: 'undo redo | insert | styleselect | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link image',
      content_css: '//www.tinymce.com/css/codepen.min.css' 
    });       
  },
  actions: {
    newPost () {
      // Initialize blogPost information:
      let title = this.get('title');
      let subtitle = this.get('subtitle');
      let postcontent = tinyMCE.get('newpost-inputblogpost-textarea'+this.get('tinymceCounter')).getContent()
      let isPrivate = this.get('isPrivate');
      let user = this.get('session.data.authenticated.user');
      let userId = user._id;
      let friends = this.get('modelFriendsArray');
      let postPassword;
      if (this.get('setPassword') && isPrivate) {
        postPassword = this.get('postPassword');
      }

      console.log(postcontent)
      // 1. First, we need to create and save a user record for each of the 'pure' email addresses 
      //    the user added to this post. In other words, all email addresses without an account need
      //    to have a temporary account created.

      // createPromiseArray is a service that will create an array of .save() promises we can .then() off of below
      let promiseArray = this.get('createTempFriends').createPromiseArray(friends);    

      var route = this;
      Promise.all(promiseArray) // Here is where we create temporary accounts for email addresses without accounts.
      // After we have created the temporary accounts, we want to update the friendslist with these accounts and save them to the blog post
      .then(function(updatedFriends){
        updatedFriends.forEach(function(friend){
          console.log(friend, friend.get('id'))
          friends.push(friend.get('id'))
        })
        // 2. Create our blog-post record and store it in a variable
        const blogpost = route.get('store').createRecord('blog-post', {
          date: new Date(),
          owner: userId,
          private: isPrivate,
          friends: friends,
          title: title,
          subtitle: subtitle,
          content: postcontent,
          password: postPassword
        });
        // 3. Save it to DB - .save() will make our post request to our /blog-posts (because assigned the correct model above) route with our blogpost record, created above
        return blogpost.save()
      })
      .then(function(blogPost){

        // 4. Now we just set up our email object and send it to all of the readers on our friends list.
        let emailObject = {
          password: postPassword,
          postId: blogPost.id
        }
        let emailUser = route.get('email').emailUser
        let friends = blogPost.get('friends')
        for (var i = 0; i < friends.length; i++) {
          emailUser(friends[i], user, emailObject)
        }

        // Push our new blogpost onto our model and refresh the input tags
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
      // Reset all input fields
      this.resetPostForm()

      // Initialize an empty array for this blog posts 'friends'
      this.set('modelFriendsArray', []);

      // 1. Reset new blog post properties
      this.toggleProperty('newBlogPost'); // Toggles on/off the new blog post field

      // Increment the tinymceCounter so that we an initialize a new text editor
      this.incrementProperty('tinymceCounter');

      // 2. If it is a public post, we want to allow them to add specific friends
      if (type === 'private') { this.set('isPrivate', true) }
      else { this.set('isPrivate', false) };
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
      this.set('modelFriendsArray', [])
      this.toggleProperty('showFriendsList');
    },
    setBlogTypePrivate(){
      this.get('blogType');
      this.set('blogType', 'private');
    },
    setBlogTypePublic(){
      this.get('blogType');
      this.set('blogType', 'public');
    }
  }
});