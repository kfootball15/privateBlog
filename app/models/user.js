import DS from 'ember-data';

export default DS.Model.extend({
  blogPost: DS.belongsTo('blog-post'),
  username: DS.attr('string'),
  firstname: DS.attr('string'),
  lastname: DS.attr('string'),
  friends: DS.attr('array'),
  bio: DS.attr('string'),
  email: DS.attr('string'),
  password: DS.attr('string'),
  isTemp: DS.attr('boolean'),
  isTutorialFriend: DS.attr('boolean'),
  fullname: function() {
    return this.get('firstname') + ' ' + this.get('lastname');
  }.property('firstName', 'lastName')
});
