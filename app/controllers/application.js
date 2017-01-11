import Ember from 'ember';
const { service } = Ember.inject; // We declare 'service' so that we can inject it more easily below;

export default Ember.Controller.extend({
  session: service(), // Session is an Ember-Simple-Auth service that allows us to interface with the current session
  store: service(),
  currentUser: service(), // Lets us use currenUser on the DOM - No need to specify which service if service name is the same as the the object prop -- even in the case of CamelCase vs -
  actions: {
    logout(){
      this.get('session').invalidate(); // Here, we are grabbing our Session Service and using its invalidate method
    },
  }
});
