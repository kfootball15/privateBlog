import Ember from 'ember';

export default Ember.Controller.extend({
  session: Ember.inject.service('session'),
  actions: {
    login() {

      let {username, password} = this.getProperties('username', 'password');

      console.log(username, password);

      const route = this;
      this.get('session').authenticate('authenticator:oauth2', username, password)
      .then(function () {
        console.log("Should get in here")
        route.transitionToRoute('home');
      })
      .catch((reason) => {
        this.set('errorMessage', reason.error);
      });

      // const email = this.get('email')
      // const password = this.get('password')

      // const login = this.store.createRecord('login', {
      //   email: email,
      //   password: password
      // })

      // var route = this
      // login.save()
      // .then(function(){
      //   route.transitionToRoute('home')
      // })

    }
  }
});
