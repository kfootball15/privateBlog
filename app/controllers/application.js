import Ember from 'ember';

export default Ember.Controller.extend({
  session: Ember.inject.service('session'),
  store: Ember.inject.service(),
  currentUser: Ember.inject.service('current-user'),
  actions: {
    logout(){
      this.get('session').invalidate();
    },
  }
});
