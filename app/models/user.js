import DS from 'ember-data';

export default DS.Model.extend({
  blogPost: DS.belongsTo('blog-post'),
  username: DS.attr('string'),
  firstname: DS.attr('string'),
  lastname: DS.attr('string'),
  bio: DS.attr('string'),
  email: DS.attr('string'),
  password: DS.attr('string'),
  fullname: function() {
    return this.get('firstname') + ' ' + this.get('lastname');
  }.property('firstName', 'lastName')
});
