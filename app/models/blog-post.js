import DS from 'ember-data';

export default DS.Model.extend({
  date: DS.attr('string'),
  owner: DS.attr('string'),
  friends: DS.attr('array'),
  content: DS.attr('string'),
  title: DS.attr('string'),
  subtitle: DS.attr('string')
});
