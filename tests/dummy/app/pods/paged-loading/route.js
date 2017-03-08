import Ember from 'ember'
const {Route, run: {later}} = Ember

export default Route.extend({
  isModelRefreshing: false,

  setupController (controller, model) {
    this._super(controller, model)

    if (this.isModelRefreshing) {
      later(() => {
        controller.fetchPage(0)
        this.controller.set('isLoading', false)
      }, 2500)
    } else {
      controller.fetchPage(0)
    }
  },

  actions: {
    refreshModel () {
      this.set('isModelRefreshing', true)
      this.controller.set('isLoading', true)
      this.setupController(this.controller, this.modelFor('list-item'))
    }
  }
})
