// routes/posts.js

import Ember from 'ember';

export default Ember.Route.extend({
  model() {
    const postsRepository = this.get('postsRepository');
    return postsRepository.getPosts();
  },
  postsRepository: Ember.inject.service('postsrepository')

});
