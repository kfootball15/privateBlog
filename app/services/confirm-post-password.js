import Ember from 'ember';

const { inject: { service }, isEmpty, RSVP } = Ember;

// This service will fetch the user by the userId (which is obtained via the storage)
export default Ember.Service.extend({
  session: service('session'),
  store: service(),
  confirmPassword(postId, password){
  	
  	let postDetails = {
  		postId: postId,
  		password: password
  	}

    const checkPostPassword = new Ember.RSVP.Promise(function(resolve, reject){
      Ember.$.ajax({
          type: 'POST',
          url:"http://localhost:1337/confirmPostPassword",
          data: postDetails,
          success: function(response){
          	console.log("SUCCESS", response)
            resolve(response);
          },
          error: function(reason){
            reject(new Error('The confirmation password entered was incorrect, '+ 'failed with status: [' + reason.status + ']', reason));
          }
        });
    });
    return checkPostPassword;
  }

});
