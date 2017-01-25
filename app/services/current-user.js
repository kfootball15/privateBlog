import Ember from 'ember';

const { inject: { service }, isEmpty, RSVP } = Ember;

// This service will fetch the user by the userId (which is obtained via the storage)
export default Ember.Service.extend({
  session: service('session'),
  store: service(),
  // Loads current user information from localStorage
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
  // Returns a promise that will confirm users password and resolve for users infomration
  confirmPassword(user){
    const checkPassword = new Ember.RSVP.Promise(function(resolve, reject){
      Ember.$.ajax({
          type: 'POST',
          url:"http://localhost:1337/confirmPassword",
          data: user,
          success: function(response){
            resolve(response);
          },
          error: function(reason){
            reject(new Error('The confirmation password entered was incorrect, '+ 'failed with status: [' + reason.status + ']', reason));
          }
        });
    });
    return checkPassword;
  }

});
