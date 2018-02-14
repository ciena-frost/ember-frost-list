import Ember from 'ember'
const {Route} = Ember

export default Route.extend({
  setupController (controller, model) {
    this._super(controller, model)
    controller.fetchPage(0)
  }
})
