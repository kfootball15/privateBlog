import Ember from 'ember';
import ApplicationRouteMixin from 'ember-simple-auth/mixins/application-route-mixin';
const { service } = Ember.inject; // We declare 'service' so that we can inject it more easily below;

// ApplicaitonRouteMixin: https://ember-simple-auth.com/api/classes/ApplicationRouteMixin.html

  // This is an optional Mixin

  // Defines methods that are called when the session was successfully authenticated (authenticationSucceeded) or invalidated (invalidationSucceeded).
    // By injecting this Mixin, these above authentication methods (authenticationSucceeded,invalidationSucceeded, etc) are being called/handled automatically. This allows us to authenticate our sessions between different tabs and different windows. To customize these, you can do so with your authenticator.

  // Testing:
    // When using the ApplicationRouteMixin you need to specify needs: ['service:session'] in the application route's unit test.


// Here, we are loading the current user:

//The Ember Simple Auth session can either be authenticated already when the application starts up or become authenticated later when either the user logs in via that instance of the application or the session state is synced from another tab or window. In the first case, the session will already be authenticated when the application route's beforeModel method is called and in the latter case Ember Simple Auth will call the application route's sessionAuthenticated method. The 'currentUser' service's load method must be called in both cases so that it's user property is always populated when the session is authenticated:

export default Ember.Route.extend(ApplicationRouteMixin, {
  actions: {
    // This action is attached to the "Your Blog Posts" button
      // Thes reason we did this instead of loading the userId onto the model() hook, and then using a link-to and passing it the model, is becuase we want the button to have access to the userId even after the user log ins and the page has not yet refreshed
    routeTo() {
      const userId = this.get('session.data.authenticated.user._id');
      console.log(userId);
      console.log("routeTo Action")
      this.transitionTo('blog-posts', userId);
    }
  },

  session: service(),
  currentUser: service(), // Making current-user service available here gives us access to its load() method

  // Here, we are making sure that each of our authentication methods, aquired from ApplicationRouteMixin, are calling our currentUser services load() method before our model is loaded, which will get the user information we need to properly render templates
  beforeModel() {
    console.log("Application.js Route: currentUser service .load() is being called from beforeModel()");
    return this._loadCurrentUser();
  },

  sessionAuthenticated() {
    console.log("Application.js Route: currentUser service .load() is being called from sessionAutenticated()");
    // Here, we call this.super(...arguments) because we are overriding a method, and all of the parent objects neccessary methods must still be called properly -- see Embers Object Model page
      // ex:
        // In certain cases, you will want to pass arguments to _super() before or after overriding.
        // This allows the original method to continue operating as it normally would.
        // One common example is when overriding the normalizeResponse() hook in one of Ember-Data's serializers.
    this._super(...arguments);
    this._loadCurrentUser().catch(() => this.get('session').invalidate());
  },

// The 'currentUser' service has a load method that must be called in order to fetch the user data!
  _loadCurrentUser() {
    return this.get('currentUser').load();
  },

});
