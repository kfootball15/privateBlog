import Ember from 'ember';
const { service } = Ember.inject; // We declare 'service' so that we can inject it more easily like so: session: service();

export default Ember.Component.extend({
	store: service(),
	session: service(),
	currentUser: service(),
	search: '',
	sortedFriends: Ember.computed('search', function() {
		let that = this;
		let searchTerm = this.get('search')
		if(searchTerm) {
			return that.get('friends').filter(function(item, index, enumerable){
				if (item.username.includes(searchTerm)) return true;
				if (item.email.includes(searchTerm)) return true;
				if (item.firstname.includes(searchTerm)) return true;
				if (item.lastname.includes(searchTerm)) return true;
			})
		}
		else return this.get('friends')
	}),
	actions: {
		addfriend (friend) {
		  this.get('addfriendParent')(friend)
		},
	}
});

  // incomplete: Ember.computed('todos.@each.isDone', function() {
  //   var todos = this.get('todos');
  //   return todos.filterBy('isDone', false);
  // })