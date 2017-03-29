import Ember from 'ember';
const { service } = Ember.inject;

export default Ember.Component.extend({
	store: service(),
	session: service(),
	currentUser: service(),
	actions: {
		editPost(post) {
			let currentUserId = this.get('session.data.authenticated.user._id')
			console.log(currentUserId, post.get('owner')._id)
	        if(currentUserId === post.get('owner')._id) {
	        	this.toggleProperty('editingPost');
	        }
	    },
	    savePost(post) {
			let currentUserId = this.get('session.data.authenticated.user._id')
	    	let that = this;
	        if(currentUserId === post.get('owner')._id) {
		    	this.get('store').findRecord('blog-post', post.id)
		    	.then(function(post) {
		    		// console.log(that.get('content'))
				    post.set('content', that.get('content'));
				    return post.save()
				})
		    }
	        this.toggleProperty('editingPost');
	    },
	    cancelEdit() {
	      this.toggleProperty('editingPost');
	    },
	}
});
