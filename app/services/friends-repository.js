import Ember from 'ember';

export default Ember.Service.extend({
  getFriendById(id) {
    const friends = this.getFriends();
    return friends.findBy('id', id);
  },
  getFriends() {
    return [
      {
        id: '1',
        firstName: 'Jeff',
        lastName: 'Fenster',
        bio: 'I am a great guy.'
      },{
        id: '2',
        firstName: 'Talya',
        lastName: 'Mandelkern',
        bio: 'I am a great girl'
      },{
        id: '3',
        firstName: 'Mitchell',
        lastName: 'Fenster',
        bio: 'I am a great father.'
      },{
        id: '4',
        firstName: 'Frankensteins',
        lastName: 'Monster',
        bio: 'I am an awful monster!'
      }
    ];
  }
});
