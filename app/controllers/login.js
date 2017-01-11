import Ember from 'ember';

export default Ember.Controller.extend({
  session: Ember.inject.service('session'),
  actions: {
    login() {

      let {username, password} = this.getProperties('username', 'password');

      console.log(username, password);

      const route = this;
      // Here, we grab our session object and authenticate it by specifying which of our Authenticators we want to use.
        // 'authenticator:oauth2' uses the oauth2.js file in our authenticators folder
        // By Default, it will call a few methods on our oauth2 authenticator (authenticate, etc)
      this.get('session').authenticate('authenticator:oauth2', username, password)
      .catch((reason) => {
        this.set('errorMessage', reason.error);
      });

    }
  }
});
