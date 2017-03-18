import Ember from 'ember';
const { service } = Ember.inject;

export default Ember.Component.extend({
  store: service(),
  session: service(),
  currentUser: service(),
  actions: {
    deletePost(postId) {
      // 1. store 'reverse' model in variable
      let reverse = this.get('reverse');
      // 2. find correct record to remove
      this.get('store').findRecord('blog-post', postId, { backgroundReload: false } )
      .then(function(post) {
        post.deleteRecord(); // 3. Deletes Record form store
        return post.save(); // 4. Makes DELETE request to /blog-posts/:postId   //-->
         // post.destroyRecord(); // => Alternatively, we could use .destroyRecord() delete the record AND make DELETE to /blog-posts/2
      })
      .then(function(post){
        // 5. Find correct post and remove from 'reverse' so that screen live updates properly.
        for (var i = 0; i < reverse.length; i++) {
          if(reverse[i] === post) {
            reverse.removeAt(i);
            break;
          }
        }
      })
      .catch(function(reason){
        console.error("ERROR: Failed to delete the blogPost", reason);
      });
    },
    showFriends(){
      this.toggleProperty('showFriendsList')
    }
  }
});