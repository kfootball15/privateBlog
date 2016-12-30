// routes/friends/friend.js

import Ember from 'ember';

export default Ember.Route.extend({
  model(params) {
    const friendsRepository = this.get('friendsRepository');
    return friendsRepository.getFriendById(params.friend_id);
  },
  friendsRepository: Ember.inject.service('friendsrepository')
});
