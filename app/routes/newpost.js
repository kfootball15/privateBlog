import Ember from 'ember';

export default Ember.Route.extend({
  actions: {
    createPost(post) {
      console.log(post, post.get('title'));
      this.get('postsRepository').savePost(post);
      this.transitionTo('posts');
    }
  },
  model() {
    const postsRepository = this.get('postsRepository');
    const newPost = postsRepository.newPost();
    return newPost;
  },
  postsRepository: Ember.inject.service("postsrepository")
});
