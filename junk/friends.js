// routes/friends.js

import Ember from 'ember';

export default Ember.Route.extend({
  model() {
    const friendsRepository = this.get('friendsRepository');
    return friendsRepository.getFriends();
  },
  friendsRepository: Ember.inject.service('friendsrepository')
});
