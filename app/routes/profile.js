import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

const { service } = Ember.inject; // We declare 'service' so that we can inject it more easily below;

export default Ember.Route.extend(AuthenticatedRouteMixin, {
});
