import Ember from 'ember';

export default Ember.Service.extend({
  getPosts() {
    return [
      {
        id: '1',
        title: "First Post",
        content: "This is my very first post in post.js routes"
      },{
        id: '2',
        title: "Second Post",
        content: "This is my second post in post.js routes"
      },{
        id: '3',
        title: "Third Post",
        content: "This is my third post in post.js routes"
      }
    ]
  },
  getPostById(id) {
    return this.getPosts().findBy('id', id);
  }
});
