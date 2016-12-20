import Ember from 'ember';

export default Ember.Route.extend({
  model(params) {
    const postsRepository = this.get('postsRepository');
    return postsRepository.getPostById(params.post_id);
  },
  postsRepository: Ember.inject.service("postsrepository")

});
