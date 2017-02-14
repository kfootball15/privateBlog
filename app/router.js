import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
  location: config.locationType,
  rootURL: config.rootURL
});

Router.map(function() {
  // this.route('index', {path: '/'})
  // *NOTE* At every level of nesting (including the top level), Ember automatically provides a route for the '/' path named index. To see when a new level of nesting occurs, check the router, whenever you see a function, that's a new level.
  this.route('home', {path: '/'});
  // Dynamic Route
  // Convention says to name the dynamic segment like so --> :model-name_id
  // Two reasons:
  // 1. The first reason is that Routes know how to fetch the right model by default, if you follow the convention.
  // 2. The second is that params is an object, and can only have one value associated with a key. To put it in code, the following will not work properly:
  this.route('blog-posts',{ path: '/blog-posts/:user_id' }, function() {
    // this.route('index', { path: '/' });
        // *NOTE* Again, an 'index' route like this is generated for every route, but writing it out is not neccessary
          // If The user navigates to /blog-post, the current route will be blog-posts.index, and the posts/index template will be rendered into the {{outlet}} in the posts template. (If an index template does not exist, it will look for blog-post.hbs I am assuming...)
    this.route('new');
  });
  this.route('signup');
  this.route('login');
  this.route('profile');
  this.route('profile-public', {path: '/profile-public/:user_id' });
});

export default Router;
