import Ember from 'ember';

const { service } = Ember.inject; // We declare 'service' so that we can inject it more easily like so: session: service();


export default Ember.Route.extend({
  store: service(),
  model(params) {

  	var modelObject = {}

    modelObject.user = this.get('store').queryRecord('user', {
        _id: params.user_id
    })

    modelObject.posts = this.get('store').query('blog-post', {
        owner: params.user_id
    });

    return modelObject


  }

});
