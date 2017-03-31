import Ember from 'ember';
const { service } = Ember.inject; // We declare 'service' so that we can inject it more easily like so: session: service();

export default Ember.Component.extend({
  store: service(),
  session: service(),
  currentUser: service(),
  actions: {
    removefriend (friend) {
      let arr = this.get('modelFriendsArray');

      for (var i = 0; i < arr.length; i++) {
        if(arr[i]._id === friend._id) { arr.removeObject(arr[i]) };
      }
    } // Pushes selected friend into friends Array
  }
});