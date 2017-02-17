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
    toggleEditName () {
      this.toggleProperty('editingName');
    },
    toggleEditBio () {
      this.toggleProperty('editingBio');
    },
    editUser () {

      // Grabs all information from edit form
      var newUsername = this.get('newusername'),
          newEmail = this.get('newemail'),
          newFirstname = this.get('newFirstname'),
          newLastname = this.get('newLastname'),
          newBio = this.get('newBio'),
          password = this.get('password');
      // Grabs session object as well as current session user
      const user = this.get('session.data.authenticated.user'); // {_id: "5875a0ffff80ca1c5189f25c", username: "me", email: "me@me.com", __v: 0}
      user.password = password;  // Set the password to the confirmation password
      const session = this.get('session');
      // Save the store to a variable so that we can pull from it within our promises
      const store = this.get('store');


      // 1. First, we call a method from the currentUser service that creates a promise that Makes a POST request to /confirmPassword which confirms that the password entered is correct and returns user info
      this.get('currentUser').confirmPassword(user)
      // 2. Then we call this promise with a success/error handler. If user password is correct, we get the user data from backend.
      .then(function(responseUser){
        return store.findRecord('user', responseUser.user._id);
        // this.get('toggleError')('false')
      }, function(error){
        console.log(error);
      })
      // 3. If users password is confirmed, we fetch the changed data from the HTML form and update our record with the updated user.
      .then(function(userToUpdate){
          if (newUsername) {
            userToUpdate.get('username'); // This userToUpdate is the user we are getting from the store.findRecord success handler
            userToUpdate.set('username', newUsername);
          }
          if (newEmail) {
            userToUpdate.get('email');
            userToUpdate.set('email', newEmail);
          }
          if (newFirstname && newLastname) {
            console.log(newFirstname, newLastname)
            userToUpdate.get('firstname')
            userToUpdate.get('lastname')
            userToUpdate.set('firstname', newFirstname);
            userToUpdate.set('lastname', newLastname);
          }
          if (newBio) {
            userToUpdate.get('bio'),
            userToUpdate.set('bio', newBio)
          }
          return userToUpdate.save(); //Makes a PATCH request to /api/users/:id. We are simply updating the neccessary properties on the user and then saving the record on both the front and back end.
      })
      // 4. Lastly, Upon successfully saving user to database, we Authenticate the new user by loggin them in with new credentials
      .then(function(updatedUser) {
        let updatedEmail = updatedUser.get('email');
        return session.authenticate('authenticator:oauth2', updatedEmail, password);
      })
      .catch((reason) => {
        this.set('errorMessage', new Error('Updating User Info failed', reason));
      });

      // 5. Make sure that we toggle the form and reset our form variables, regardless of whether or not the change was successful.
      if(newEmail) {
        this.get('newemail');
        this.set('newemail', '');
        this.get('password');
        this.set('password', '');
        this.toggleProperty('editingEmail');
      }
      if(newUsername) {
        this.get('newusername');
        this.set('newusername', '');
        this.get('password');
        this.set('password', '');
        this.toggleProperty('editingUserName');
      }
      if(newFirstname && newLastname) {
        console.log(newFirstname, newLastname)
        this.set('newFirstname', '');
        this.set('newLastname', '');
        this.get('password');
        this.set('password', '');
        this.toggleProperty('editingName')
      }
      if (newBio) {
        this.set('newBio', '');
        this.get('password')
        this.set('password', '')
        this.toggleProperty('editingBio')
      }

    }
  }
});
