import Ember from 'ember'

export default Ember.Route.extend({

  _fetch () {
    return this.store.findAll('list-item')
  },

  model () {
    return this._fetch()
  },

  setupController (controller, model) {
    this._super(controller, model)
    controller.selectedItems.push(model.objectAt(0))
    controller.selectedItems.push(model.objectAt(2))
  },

  deactivate () {
    this.store.unloadAll('list-item')
  }
})
