import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
  location: config.locationType,
  rootURL: config.rootURL
});

Router.map(function() {
  this.route('home', {path: '/'});
  // this.route('login');
  // this.route('posts');
  // this.route('post', {path: '/posts/:post_id'});
  // this.route('friends', function() {
  //   this.route('friend', {path: '/:friend_id'});
  // });
  this.route('blog-post', function() {
    this.route('new');
  });
});

export default Router;
