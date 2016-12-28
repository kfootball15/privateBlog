import Ember from 'ember';
import Post from '../models/post';

var counter = 4;

const posts = [
  // Import the 'Post' model above, and then use it to create new instances of the Post Model
  Post.create ({id: '1', title: "First Post", content: "This is my very first post in post.js routes"}),
  Post.create({id: '2', title: "Second Post", content: "This is my second post in post.js routes"}),
  Post.create({id: '3',title: "Third Post",content: "This is my third post in post.js routes"})
];

export default Ember.Service.extend({
  getPosts() {
    return posts;
  },
  getPostById(id) {
    return posts.findBy('id', id);
  },
  newPost() {
    return Post.create({});
  },
  savePost(post) {
    post.set('id', counter);
    counter++;
    console.log(posts)
    posts.pushObject(post);
  }
});
