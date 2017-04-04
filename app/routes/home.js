import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

const { service } = Ember.inject; // We declare 'service' so that we can inject it more easily below;

export default Ember.Route.extend(AuthenticatedRouteMixin, {
  store: service(),
  session: service(),
  model () {
    let user = this.get('session.data.authenticated.user');

    if(user){
      return user;
    } else {
      // return "SIGN UP"
    }

  },
  afterModel (model, transition) {
    if (model) {
      this.transitionTo('home.blog-posts', model._id);
    }
  }
});
