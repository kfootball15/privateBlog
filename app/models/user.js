import DS from 'ember-data';

export default DS.Model.extend({
  username: DS.attr('string'),
  firstname: DS.attr('string'),
  lastname: DS.attr('string'),
  bio: DS.attr('string'),
  email: DS.attr('string'),
  password: DS.attr('string')
});
