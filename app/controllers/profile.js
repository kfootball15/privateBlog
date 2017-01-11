import Ember from 'ember';
const { service } = Ember.inject; // We declare 'service' so that we can inject it more easily below;

export default Ember.Controller.extend({
  currentUser: service('current-user'), // This must be on the controller, not the route. Why?
});
