import Ember from 'ember';

const { service } = Ember.inject; // We declare 'service' so that we can inject it more easily like so: session: service();


export default Ember.Controller.extend({
	// Reverses order of posts array so they are in date order
	reverse: Ember.computed('model.posts', function() {
	    return this.get('model.posts').toArray().reverse();
	})
});
