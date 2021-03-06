/* jshint node: true */

module.exports = function(environment) {

  var ENV = {
    modulePrefix: 'ember-quickstart',
    environment: environment,
    rootURL: '/',
    locationType: 'auto',
    EmberENV: {
      FEATURES: {
        // Here you can enable experimental features on an ember canary build
        // e.g. 'with-controller': true
      },
      EXTEND_PROTOTYPES: {
        // Prevent Ember Data from overriding Date.parse.
        Date: false
      }
    },

    APP: {
      // Here you can pass flags/options to your application instance
      // when it is created
    },
    contentSecurityPolicy: {
      'default-src': "'none'",
      'script-src': "'self' 'unsafe-inline' 'unsafe-eval'",
      'font-src': "'self'",
      'connect-src': "'self' http://localhost:1337",
      'img-src': "'self'",
      'report-uri':"'localhost'",
      'style-src': "'self' 'unsafe-inline'",
      'frame-src': "'none'"
    }
  };

  if (environment === 'development') {
    // ENV.APP.LOG_RESOLVER = true;
    // ENV.APP.LOGcd ._ACTIVE_GENERATION = true;
    // ENV.APP.LOG_TRANSITIONS = true;
    // ENV.APP.LOG_TRANSITIONS_INTERNAL = true;
    // ENV.APP.LOG_VIEW_LOOKUPS = true;
  }

  if (environment === 'test') {
    // Testem prefers this...
    ENV.locationType = 'none';

    // keep test console output quieter
    ENV.APP.LOG_ACTIVE_GENERATION = false;
    ENV.APP.LOG_VIEW_LOOKUPS = false;

    ENV.APP.rootElement = '#ember-testing';
  }

  if (environment === 'production') {

  }

  // Configure your simple authentication here:
  ENV['ember-simple-auth'] = {
    baseURL: 'http://localhost:1337/',
    // store: 'simple-auth-session-store:local-storage',
    // By default the Ember simple auth plugin will not authorize requests going to a different origin than the one the Ember.js application was loaded from. Therefore we have to explicitly enable authorization for additional origins
    crossOriginWhitelist: ['http://localhost:1337/'],
    // Specifies our authorizer. In this case, points to our 'custom.js' file in the autherizers folder
    authorizer: 'authorizer:custom',
    routeAfterAuthentication: 'home'
  };

  return ENV;
};
