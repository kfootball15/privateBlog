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

      this.toggleProperty('newBlogPost'); // Toggles on/off the new blog post field

      // If it is a public post, we want to allow them to add specific friends
      if (typeFromTemplate === 'public') this.set('showAddFriends', true);
      else this.set('showAddFriends', false);

      setBlogType(typeFromTemplate)// Now we want to set the blogType property to public/private so we can save it with the post in the database.
    },
    toggleShowAddFriends(){
      this.set('showAddFriends', true);
    },
    setBlogTypePrivate(){
      console.log("ran private")
      this.get('blogType');
      this.set('blogType', 'private');
    },
    setBlogTypePublic(){
      console.log("ran public")
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
    newPost: function () {

      const title = this.get('title');
      const subtitle = this.get('subtitle');
      const postcontent = this.get('postcontent');
      const blogType = this.get('blogType');
      // console.log("BTYPE",  blogType)
      const userId = this.get('session.data.authenticated.user._id');


      // 1. Create our blog-post record and store it in a variable
      const blogpost = this.store.createRecord('blog-post', {
        date: new Date(),
        owner: userId,
        blogType: blogType,
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

    }
  },
  reverse: function(){
    return this.get('model').toArray().reverse();
  }.property('model.[]'),
});









