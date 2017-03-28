import Ember from 'ember';

export default Ember.Component.extend({
	actions: {
		editPost(post) {
	      console.log('post', post),
	      this.toggleProperty('editingPost');
	    },
	    cancelEdit() {
	      this.toggleProperty('editingPost');
	    },
	}
});
