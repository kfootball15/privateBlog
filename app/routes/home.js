import Ember from 'ember';
const { service } = Ember.inject; // We declare 'service' so that we can inject it more easily below;

export default Ember.Route.extend({
  store: service(),
  session: service(),
  model () {
    let friends = this.get('session.data.authenticated.user.friends');
    let promises = [];

    if(friends){
      for (var i = 0; i < friends.length; i++) {
        var promise = this.get('store').query('blog-post', {
          owner: friends[i]._id
        });
        promises.push(promise);
      }
      return Promise.all(promises)
      .then(function(posts){
        return posts;
      });
    } else {
      return "SIGN UP"
    }

  }
});
