import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

// AuthenticatedRouteMixin
  // By default, this will route you to 'Login' if session is not 'authenticated'
  //This mixin is used to make routes accessible only if the session is authenticated. It defines a beforeModel method that aborts the current transition and instead transitions to the authenticationRoute if the session is not authenticated.
export default Ember.Route.extend(AuthenticatedRouteMixin, {
  store: Ember.inject.service(),
  model: function (params) {
    return this.get('store').query('blog-post', {
        owner: params.user_id
    }); // Makes a GET request to "http://localhost:1337/api/blog-posts?owner=5875a0ffff80ca1c5189f25c"
  }
});
