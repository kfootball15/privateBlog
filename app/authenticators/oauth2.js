import OAuth2PasswordGrant from 'ember-simple-auth/authenticators/oauth2-password-grant';
import Ember from 'ember';


// Authenticators like this one will make post requests to your specified "serverTokenEndpoint" and create a session with the data it receives from the server. This session is then 'maintained' by the authorizers.
export default OAuth2PasswordGrant.extend({

  serverTokenEndpoint: 'http://localhost:1337/token',

  // // Use a restore method like below to customize a restore function, which will restore your session on refreshes etc. (otherwise uses default)
  // restore(data) {
  //     console.log("Restore Method:", data);
  //     return new Ember.RSVP.Promise(function(resolve, reject) {
  //         if (!Ember.isEmpty(data.token)) {
  //             resolve(data);
  //         } else {
  //             reject();
  //         }
  //     });
  // },

  // // Use the Authenticate Method below to customize the authentication function (example below). default will use the imported oauth2-password-grant
  // authenticate(options) {
  //     console.log("Authenticate Method:", options)
  //     return new Ember.RSVP.Promise((resolve, reject) => {
  //         Ember.$.ajax({
  //             url: this.serverTokenEndpoint,
  //             type: 'POST',
  //             data: JSON.stringify({
  //                 username: options.identification,
  //                 password: options.password
  //             }),
  //             contentType: 'application/json;charset=utf-8',
  //             dataType: 'json'
  //         }).then(function(response) {
  //             Ember.run(function() {
  //                 resolve({
  //                     token: response.id_token
  //                 });
  //             });
  //         }, function(xhr, status, error) {
  //             var response = xhr.responseText;
  //             Ember.run(function() {
  //                 reject(response);
  //             });
  //         });
  //     });
  // },

});
