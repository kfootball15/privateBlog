import Ember from 'ember';
import BlogPost from '../models/blog-post';

var counter = 4;
// const store = this.get('store')

// const posts = [
//   // Import the 'Post' model above, and then use it to create new instances of the Post Model
//   BlogPost.create ({blogPost: {title: "First Post", content: "This is my very first post in post.js routes"}}),
//   BlogPost.create ({blogPost: {title: "Second Post", content: "This is my second post in post.js routes"}}),
//   BlogPost.create ({blogPost: {title: "Third Post",content: "This is my third post in post.js routes"}})
// ];

export default Ember.Service.extend({
  getPosts() {
    return [{blogPost: {title: "WORKED", content: "LIKE A CHARM"}}]
    // return this.store.findRecord('blog-post');
  },
  // getPostById(id) {
  //   return posts.findBy('id', id);
  // },
  // newPost() {
  //   // return BlogPost.create({});
  //   // const store = this.get('store')
  //   return this.get('blog-post').createRecord('blog-post')
  // },
  // savePost(post) {
  //   post.set('id', counter);
  //   counter++;
  //   console.log(posts)
  //   posts.pushObject(post);
  // }
});
