import Ember from 'ember';
const { service } = Ember.inject;

export default Ember.Component.extend({
	store: service(),
	session: service(),
	currentUser: service(),
	tinymcePostCounter: 1000,
	didRender() {
	    this._super(...arguments)
	    tinymce.init({ 
	      selector:'#editpost-inputblogpost-textarea'+this.get('post.id')+this.get('tinymcePostCounter'),
	      value: this.get('postcontent'),
	      height: 300,
	      menubar: false,
	      plugins: [
	        'advlist autolink lists link image charmap print preview anchor',
	        'searchreplace visualblocks code fullscreen',
	        'insertdatetime media table contextmenu paste code'
	      ],
	      toolbar: 'undo redo | insert | styleselect | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link image',
	      content_css: '//www.tinymce.com/css/codepen.min.css' 
	    });       
	  },
	actions: {
		editPost(post) {
			let currentUserId = this.get('session.data.authenticated.user._id')
	        if(currentUserId === post.get('owner')._id) {
	        	this.toggleProperty('editingPost');
	        }
	    },
	    savePost(post) {
			let currentUserId = this.get('session.data.authenticated.user._id')
	    	let that = this;
	    	// Confirm that post owner is making this edit
	        if(currentUserId === post.get('owner')._id) {
		    	this.get('store').findRecord('blog-post', post.id)
		    	.then(function(post) {	
		    		// Set new content on DOM and on post model
		    		let newContent = tinyMCE.get('editpost-inputblogpost-textarea'+post.get('id')+that.get('tinymcePostCounter')).getContent()
				    that.set('content', newContent);
				    post.set('content', newContent);
				    return post.save();
				})
		    }
	        this.toggleProperty('editingPost'); // Turn off 'editing post' mode
	    },
	    cancelEdit() {
	      this.incrementProperty('tinymcePostCounter');
	      this.toggleProperty('editingPost');
	    },
	}
});
