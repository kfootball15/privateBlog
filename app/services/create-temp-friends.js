import Ember from 'ember';
const { service } = Ember.inject; // We declare 'service' so that we can inject it more easily like so: session: service();

export default Ember.Service.extend({
	store: service(),
	createPromiseArray: function (friends) {
	    let promiseArray = [];
	    let route = this;
        for (var i = 0; i < friends.length; i++) {  
            if(friends[i].isTemp) {

            let tempFriend = route.get('store').createRecord('user', {
                email: friends[i].email,
                username: friends[i].email,
                firstname: "None",
            	lastname: "None",
            	bio: "None",
            	password: "temp"
          	});
          	friends.splice(i, 1) // remove the tempFriend object
          	promiseArray.push(newPromise(tempFriend))

          	function newPromise (friend) {          
	            	return new Promise(function(resolve, reject) {
	              		return friend.save()
	              		.then(function(updatedFriend){
	                		resolve(updatedFriend)
	              		})
	              		.catch(function(error){
	                		reject(error)
	              		})

	            	});
	            }
	        }
	    }

	    return promiseArray;
    },
});
