// import Base from 'ember-simple-auth/authorizers/base';
import Ember from 'ember';

// export default Base.extend({
//   authorize(data, block) {
//     var accessToken = this.get('session.content.secure.token');

//     console.log("authorizer: (data, block, accessToken)", data, ",", block, ",", accessToken);

//     if (this.get('session.isAuthenticated') && !Ember.isEmpty(accessToken)) {
//         data.setRequestHeader('Authorization', 'Bearer ' + accessToken);
//     }

//   }
// });

import OAuth2Bearer from 'ember-simple-auth/authorizers/oauth2-bearer';

export default OAuth2Bearer.extend({
  // authorize(data, block) {
  //   var accessToken = this.get('session.content.secure.token');

  //   console.log("authorizer: (data, block, accessToken)", data, ",", block, ",", accessToken);

  //   if (this.get('session.isAuthenticated') && !Ember.isEmpty(accessToken)) {
  //       data.setRequestHeader('Authorization', 'Bearer ' + accessToken);
  //   }

  // }
});
