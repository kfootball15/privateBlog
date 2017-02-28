import Ember from 'ember';
const { service } = Ember.inject; // We declare 'service' so that we can inject it more easily below;

export default Ember.Route.extend({
  store: service(),
  session: service(),
  model () {
    let friends = this.get('session.data.authenticated.user.friends')
    let promises = [];

    for (var i = 0; i < friends.length; i++) {
      var promise = this.get('store').query('blog-post', {
        owner: friends[i]._id
      })
      promises.push(promise)
      // .then(function(friendsPosts){
      //   console.log("friendsPosts", friendsPosts)
      //   posts.push(friendsPosts)
      // });
    }

    console.log(promises)

    return Promise.all(promises)
    .then(function(posts){
      return posts
    })

  }
  // model: function (params) {

  //   const posts =  this.get('store').query('blog-post', {
  //       owner: params.user_id
  //   }); // Makes a GET request to "http://localhost:1337/api/blog-posts?owner=5875a0ffff80ca1c5189f25c"

  //   return posts;

  // }
});
