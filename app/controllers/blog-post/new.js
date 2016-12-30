import Ember from 'ember';

export default Ember.Controller.extend({
  actions: {
    newPost: function () {

      const title = this.get('title');
      const postcontent = this.get('postcontent');

      const blogpost = this.store.createRecord('blog-post', {
        title: title,
        content: postcontent
      });

      this.set('title', '');
      this.set('postcontent', '');

      var route = this
      blogpost.save()
      .then(function(){
        route.transitionToRoute('blog-post')
      });

    }
  }
});
