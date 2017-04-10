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
				if (item.username.toLowerCase().includes(searchTerm.toLowerCase())) return true;
				if (item.email.toLowerCase().includes(searchTerm.toLowerCase())) return true;
				if (item.firstname.toLowerCase().includes(searchTerm.toLowerCase())) return true;
				if (item.lastname.toLowerCase().includes(searchTerm.toLowerCase())) return true;
			})
		}
		else return this.get('friends')
	})
});
