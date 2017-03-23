import Ember from 'ember';
const { service } = Ember.inject; // We declare 'service' so that we can inject it more easily below;

export default Ember.Controller.extend({
  session: service(),
  actions: {
    signup () {
      let email = this.get('email');
      let username = this.get('username');
      let password = this.get('password');
      let firstname = this.get('firstname');
      let lastname = this.get('lastname');
      let bio = this.get('bio');
      let session = this.get('session'); // We use this later to log user in after sign up

      // 'user' here refers to the model 'user'
      let user = this.store.createRecord('user', {
        email: email,
        username: username,
        firstname: firstname,
        lastname: lastname,
        bio: bio,
        password: password
      });


      var route = this;
      // Makes a POST request to /api/users/:id
      user.save()
      .then(function() {
          // After user has been successfully saved, we log them in
        return session.authenticate('authenticator:oauth2', email, password)
      })
      .then(function(){
        // If we successfully create the user, reset all fields. Otherwise, keep them so they dont have to start over.
        this.set('email', '');
        this.set('username', '');
        this.set('firstname', '');
        this.set('lastname', '');
        this.set('bio', '');
        this.set('password', '');
        // After successfully authenticating session, route to home
        route.transitionToRoute('home')
      })
      .catch((reason) => {
        this.set('errorMessage', reason.error);
      });

    }
  }
});
