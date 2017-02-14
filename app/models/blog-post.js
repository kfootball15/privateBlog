import DS from 'ember-data';

export default DS.Model.extend({
  date: DS.attr('string'),
  owner: DS.attr('string'),
  content: DS.attr('string'),
  title: DS.attr('string')
});
