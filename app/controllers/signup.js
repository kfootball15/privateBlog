import Ember from 'ember';

export default Ember.Controller.extend({
  actions: {
    signup: function () {
      const email = this.get('email')
      const username = this.get('username')
      const password = this.get('password')

      // 'user' here refers to the model user
      // ember g model user
      const user = this.store.createRecord('user', {
        email: email,
        username: username,
        password: password
      })

      this.set('email', '')
      this.set('username', '')
      this.set('password', '')

      var route = this;
      user.save()
      .then(function() {
        route.transitionToRoute('home')
      })

    }
  }
});
