import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
  location: config.locationType,
  rootURL: config.rootURL
});

Router.map(function() {
  this.route('home', {path: '/'});
  this.route('blog-post', function() {
    this.route('new');
  });
  this.route('signup');
  this.route('login');
});

export default Router;
