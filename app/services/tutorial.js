import Ember from 'ember';
const { inject: { service }, isEmpty, RSVP } = Ember;

export default Ember.Service.extend({
  session: service('session'),
  store: service(),
  tutorial: service(),
  // Creates test users
  populateTutorialFriends() {
    return this.get('store').query('user', {isTutorialFriend: true})
    .then(function(friends){
			let friendsArr = friends.toArray()
			let updatedFriends = []
          	friendsArr.forEach(function(friend){updatedFriends.push(friend.get('id'))})
          	return updatedFriends;

    })
    .catch(function(error){
    	console.error("Something is wrong with the Server or the Seed file...")
    	// reject(error)
    })
  },
  populateTutorialPosts(userId) {
  	return this.get('store').query('blog-post', {isTutorialPost: true, newOwner: userId})
  	.then(function(posts){
  		return posts

  	})
  }

});
















