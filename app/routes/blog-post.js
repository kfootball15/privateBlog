import Ember from 'ember';

export default Ember.Route.extend({
  actions: {
  },
  model: function () {
    return this.get('store').findAll('blog-post')
  }
});
