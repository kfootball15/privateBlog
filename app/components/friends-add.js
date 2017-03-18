import Ember from 'ember';
const { service } = Ember.inject; // We declare 'service' so that we can inject it more easily like so: session: service();

export default Ember.Component.extend({
  store: service(),
  session: service(),
  currentUser: service(),
  actions: {
    addfriend (friend) {
      this.get('addfriendParent')(friend)
    }
  }
});