import Ember from 'ember';

const { service } = Ember.inject; // We declare 'service' so that we can inject it more easily like so: session: service();


export default Ember.Route.extend({
  store: service(),
  session: service(),
  model(params) {
    
    let currentUser = this.get('session.data.authenticated.user') 
  	var modelObject = {}

    // Promise chain that will return us both the user information and the posts
    let route = this
    return route.get('store').queryRecord('user', {
        _id: params.user_id
    })
    .then(function(user){
      modelObject.user = user;
      return route.get('store').query('blog-post', {
          owner: params.user_id,
          userId: currentUser._id 
      })
    })
    .then(function(posts){
      modelObject.posts = posts
      return modelObject
    })


  }

});
