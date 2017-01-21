import Ember from 'ember';

const { inject: { service }, isEmpty, RSVP } = Ember;

// This service will fetch the user by the userId (which is obtained via the storage)
export default Ember.Service.extend({
  session: service('session'),
  store: service(),

  load() {
    let userId = this.get('session.data.authenticated.user._id'); // This is how we are interfacing with our session data
    if (!isEmpty(userId)) {
      return this.get('store').findRecord('user', userId).then((user) => {
        this.set('user', user);
      });
    } else {
      return Ember.RSVP.resolve();
    }
  },
});
