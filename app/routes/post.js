import Ember from 'ember';
const { service } = Ember.inject; // We declare 'service' so that we can inject it more easily like so: session: service();

export default Ember.Route.extend({
    store: service(),
    session: service(),
	model: function (params) {

	    let route = this
	    return this.get('store').findRecord('blog-post', params.post_id)// Makes a GET request to "http://localhost:1337/api/blog-posts?owner=5875a0ffff80ca1c5189f25c"
	    .then(function(posts){
	      if (posts) { return posts };
	    }) 
	    .catch(function(error){console.error(error)})

	}
});
