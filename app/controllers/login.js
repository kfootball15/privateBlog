import Ember from 'ember';

export default Ember.Controller.extend({
  actions: {
    login: function () {
      const email = this.get('email')
      const password = this.get('password')

      const login = this.store.createRecord('login', {
        email: email,
        password: password
      })

      var route = this
      login.save()
      .then(function(){
        route.transitionToRoute('home')
      })
    }
  }
});
