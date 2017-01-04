import Ember from 'ember';

export default Ember.Route.extend({
  actions: {
  },
  store: Ember.inject.service(),
  model: function () {
    return this.get('store').findAll('blog-post');
  }
});
