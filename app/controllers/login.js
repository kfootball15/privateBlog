import Ember from 'ember';

const { service } = Ember.inject; // We declare 'service' so that we can inject it more easily like so: session: service();

export default Ember.Controller.extend({
  currentUser: service(),
  session: service(),
  actions: {
    login() {

      let {username, password} = this.getProperties('username', 'password');

      const route = this;
      const userId = this.get('session.data.authenticated.user');
      // Here, we grab our session object and authenticate it by specifying which of our Authenticators we want to use.
        // 'authenticator:oauth2' uses the oauth2.js file in our authenticators folder
        // By Default, it will call a few methods on our oauth2 authenticator (authenticate, etc)
      this.get('session').authenticate('authenticator:oauth2', username, password)
      .then(function(){
        // route.transitionToRoute('home');
        route.transitionToRoute('home.blog-posts', route.get('session.data.authenticated.user._id'));
      })
      .catch((reason) => {
        this.set('errorMessage', reason.error);
      });

    }
  }
});
