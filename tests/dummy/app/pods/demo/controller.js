import Ember from 'ember'

export default Ember.Controller.extend({

  actions: {
    transitionHandler (attrs) {
      this.transitionToRoute(attrs)
    }
  }
})
