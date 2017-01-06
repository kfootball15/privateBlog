import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

export default Ember.Route.extend(AuthenticatedRouteMixin, {
  actions: {
  },
  store: Ember.inject.service(),
  model: function () {
    return this.get('store').findAll('blog-post');
  }
});
