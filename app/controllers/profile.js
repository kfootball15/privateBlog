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
      var newUsername = this.get('newusername'),
          newEmail = this.get('newemail');
      const password = this.get('password');
      // Grabs session object as well as current session user
      const user = this.get('session.data.authenticated.user'); // {_id: "5875a0ffff80ca1c5189f25c", username: "me", email: "me@me.com", __v: 0}
      user.password = password;  // Set the password to the confirmation password
      const session = this.get('session');
      // Save the store to a variable so that we can pull from it within our promises
      const store = this.get('store');

      // 1. First, we create a promise that confirms users password
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

      // 2. Then we call this promise with a success/error handler. If user password is correct, we get user data from backend.
      checkPassword.then(function(responseUser){
        return store.findRecord('user', responseUser.user._id)
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
          return userToUpdate.save() //Makes a PATCH request to /api/users/:id. We are simply updating the neccessary properties on the user and then saving the record on both the front and back end.
      })
      // 4. Lastly, Upon successfully saving user to database, we Authenticate the new user by loggin them in with new credentials
      .then(function(updatedUser) {
        let updatedEmail = updatedUser.get('email');
        return session.authenticate('authenticator:oauth2', updatedEmail, password);
      })
      .then(function(){

      })
      .catch((reason) => {
        this.set('errorMessage', new Error('Updating User Info failed'));
      });

      // 5. Make sure that we toggle the form and reset our form variables, regardless of whether or not the change was successful.
      if(newEmail) {
        this.get('newemail')
        this.set('newemail', '')
        this.get('password')
        this.set('password', '')
        this.toggleProperty('editingEmail');
      }
      if(newUsername) {
        this.get('newusername')
        this.set('newusername', '')
        this.get('password')
        this.set('password', '')
        this.toggleProperty('editingUserName');
      }

    }
  }
});
