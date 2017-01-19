import Ember from 'ember';
const { service } = Ember.inject; // We declare 'service' so that we can inject it more easily like so: session: service();

export default Ember.Controller.extend({
  currentUser: service('current-user'), // This must be on the controller, not the route. Why?
  store: service(),
  session: service(),
  actions: {
    toggleEditUsername () {
      this.toggleProperty('editingUserName');
    },
    toggleEditEmail () {
      this.toggleProperty('editingEmail');
    },
    editUser () {

      // Grabs all information from edit form
      const newUsername = this.get('newusername');
      const newEmail = this.get('newemail');
      const password = this.get('password');

      // Grabs session object as well as current session Id (*Must inject session service above^)
      const userId = this.get('session.data.authenticated.user._id');
      const session = this.get('session')


      // Here, we find and update the correct user using the current sessions 'userId'
      this.get('store').findRecord('user', userId)
      .then(function(userToUpdate) {

        console.log("userToUpdate: ", userToUpdate);

        if (newUsername) {
          userToUpdate.get('username');
          userToUpdate.set('username', newUsername);
        }
        if (newEmail) {
          userToUpdate.get('email');
          userToUpdate.set('email', newEmail);
        }

        return userToUpdate.save() //Makes a PATCH request to /api/users/:id

      })
      // Upon successfully saving user to database, we Authenticate the new user by loggin them in with new credentials
      .then(function(updatedUser) {
        let updatedEmail = updatedUser.get('email');
        return session.authenticate('authenticator:oauth2', updatedEmail, password);

      })
      // .then(function() {
      //   this.set('newemail', newEmail);
      //   this.set('newUsername', newUsername);
      // })
      .catch((reason) => {
        this.set('errorMessage', reason.error);
      });

      if(newEmail) this.toggleProperty('editingEmail');
      if(newUsername) this.toggleProperty('editingUserName');


    }
  }
});
