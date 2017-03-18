import Ember from 'ember';
const { service } = Ember.inject; // We declare 'service' so that we can inject it more easily like so: session: service();

    // Model is getting passed through our controller from the routes, so if we want to manipulate it we can do so here:
    // Solution: http://stackoverflow.com/questions/30127701/how-to-reverse-a-models-output-in-ember
    // .property(): http://stackoverflow.com/questions/18605866/what-does-property-do-in-function-property
export default Ember.Controller.extend({
  store: service(),
  session: service(),
  currentUser: service(),
  actions: {
  },
  reverse: Ember.computed('model', function() {
    console.log(this.get('session.data.authenticated.user'))
    return this.get('model').toArray().reverse();
    // return ;
  }) // This must be an Ember.computed property so that we watch for any changes made to the array.
});












