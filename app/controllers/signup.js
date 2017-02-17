import Ember from 'ember';
const { service } = Ember.inject; // We declare 'service' so that we can inject it more easily below;

export default Ember.Controller.extend({
  session: service(),
  actions: {
    signup () {
      const email = this.get('email');
      const username = this.get('username');
      const password = this.get('password');
      const firstname = this.get('firstname');
      const lastname = this.get('lastname');
      const bio = this.get('bio');
      const session = this.get('session'); // We use this later to log user in after sign up

      // 'user' here refers to the model 'user'
      const user = this.store.createRecord('user', {
        email: email,
        username: username,
        firstname: firstname,
        lastname: lastname,
        bio: bio,
        password: password
      });

      this.set('email', '');
      this.set('username', '');
      this.set('firstname', '');
      this.set('lastname', '');
      this.set('bio', '');
      this.set('password', '');

      var route = this;
      // Makes a POST request to /api/users/:id
      user.save()
      .then(function() {
          // After user has been successfully saved, we log them in
        return session.authenticate('authenticator:oauth2', email, password)
      })
      .then(function(){
        // After successfully authenticating session, route to home
        route.transitionToRoute('home')
      })
      .catch((reason) => {
        this.set('errorMessage', reason.error);
      });

    }
  }
});
