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

      // Grabs session object as well as current session Id and email (*Must inject session service above^)
        // User object looks like this: {_id: "5875a0ffff80ca1c5189f25c", username: "me", email: "me@me.com", __v: 0}
      const user = this.get('session.data.authenticated.user')
      user.password = password  // Set the userPassword (which is not defined on the session) to the confirmation password
      const userId = this.get('session.data.authenticated.user._id');
      const oldEmail = this.get('session.data.authenticated.user.email');
      const session = this.get('session');

            //// We first authorize the user by confirming his password on the backend
      // this.get('session').authorize('authorizer:custom', (headerName, headerValue) => {
      //   // inject headerName, headerValue here
      //   Ember.$.post("http://localhost:1337/confirmPassword", user)
      //   .then(function(confirmed){
      //     if (confirmed) {
      //       return this.get('store').findRecord('user', userId)
      //     }
      //   })
      //   .then(function(userToUpdate){
      //     if (newUsername) {
      //       userToUpdate.get('username');
      //       userToUpdate.set('username', newUsername);
      //     }
      //     if (newEmail) {
      //       userToUpdate.get('email');
      //       userToUpdate.set('email', newEmail);
      //     }
      //     return userToUpdate.save() //Makes a PATCH request to /api/users/:id
      //   })
      //   .then(function(updatedUser) {
      //     let updatedEmail = updatedUser.get('email');
      //     return session.authenticate('authenticator:oauth2', updatedEmail, password);
      //   })
      //   .catch((reason) => {
      //     this.set('errorMessage', reason.error);
      //   });
      // })

      this.get('store').findRecord('user', userId)
      .then(function(userToUpdate) {

        // 1. We have the user we want to update
        // 2. Lets make a Post Request to our backend with the password our user typed in, and confirm that it is the correct password
        // 3. If they match, update the user

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
