import Ember from 'ember';

const { service } = Ember.inject; // We declare 'service' so that we can inject it more easily like so: session: service();


export default Ember.Route.extend({
  store: service(),
  model(params) {
    return this.get('store').queryRecord('user', {
        _id: params.user_id
    })
  }

});
