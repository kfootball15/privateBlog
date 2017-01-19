import DS from 'ember-data';

// This adapter is Singular (blog-post) because it refers to the blog-post model and not the blog-post route
export default DS.JSONAPIAdapter.extend({
  host: 'http://localhost:1337',
  namespace: 'api'
});
