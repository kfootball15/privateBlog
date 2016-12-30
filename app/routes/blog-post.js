import Ember from 'ember';

export default Ember.Route.extend({
  actions: {
  },
  model: function () {
    const postsRepository = this.get('postsRepository');
    const posts = postsRepository.getPosts();
    console.log("POSTS", posts)
    return posts
    // return {}
  },
  postsRepository: Ember.inject.service("postsrepository")
});
