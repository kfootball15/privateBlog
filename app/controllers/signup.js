import Ember from 'ember';
const { service } = Ember.inject; // We declare 'service' so that we can inject it more easily below;

export default Ember.Controller.extend({
  session: service(),
  store: service(),
  tutorial: service(),
  actions: {
    signup () {
      let email = this.get('email');
      let username = this.get('username');
      let password = this.get('password');
      let firstname = this.get('firstname');
      let lastname = this.get('lastname');
      let bio = this.get('bio');
      let session = this.get('session'); // We use this later to log user in after sign up

      let emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      let validEmail = emailRegex.exec(email)

      // 'user' here refers to the model 'user'

      let route = this;
      if(validEmail) {  
        route.get('tutorial').populateTutorialFriends()
        .then(function(friends){
          let user = route.store.createRecord('user', {
            email: email,
            username: username,
            firstname: firstname,
            lastname: lastname,
            bio: bio,
            password: password,
            friends: friends
          });

          // Makes a POST request to /api/users/:id
          return user.save()
        })
        .then(function(user){
          let userId = user.get('id')
          return route.get('tutorial').populateTutorialPosts(userId)
        })
        .then(function() {
          // After user has been successfully saved, we log them in
          session.authenticate('authenticator:oauth2', email, password)
          // If we successfully create the user, reset all fields. Otherwise, keep them so they dont have to start over.

        })
        .then(function(){
          route.set('email', '');
          route.set('username', '');
          route.set('firstname', '');
          route.set('lastname', '');
          route.set('bio', '');
          route.set('password', '');
          // After successfully authenticating session, route to home
          // route.transitionToRoute('home.blog-posts', route.get('session.data.authenticated.user._id'))
        })
        .catch((reason) => {
          route.set('errorMessage', reason.error);
        });
      } else {
        console.error("Invalid Email")
        $('.form-signin').append("<p style='color: red'><strong>Please Enter a Valid Email</strong></p>")
      }

    }
  }
});
