import Ember from 'ember';

const { service } = Ember.inject; // We declare 'service' so that we can inject it more easily like so: session: service();

export default Ember.Controller.extend({
  session: service(),
  store: service(),
  actions: {
    newPost: function () {

      const title = this.get('title');
      const postcontent = this.get('postcontent');
      const userId = this.get('session.data.authenticated.user._id');
      console.log(userId)

      const blogpost = this.store.createRecord('blog-post', {
        owner: userId,
        title: title,
        content: postcontent
      });

      this.set('title', '');
      this.set('postcontent', '');

      // .save() will make our post request to our /blog-posts (because assigned the correct model above) route with our blogpost record, created above
      var route = this;
      blogpost.save()
      .then(function(blogpost){
        route.transitionToRoute('blog-posts', route.get('store').query('blog-post',{owner:userId})); // We must make this GET request again here, otherwise the page will not refresh
      });

    }
  }
});

// this.get('store').query('blog-post', {
//         owner: params.user_id
//     });
