import Ember from 'ember'

export default Ember.Route.extend({

  _fetch () {
    return this.get('store').query('list-item', {pageSize: 10, start: 0})
  },

  model () {
    return this._fetch()
  },

  setupController (controller, model) {
    this._super(controller, model)
    controller.selectedItems.set(model.objectAt(1).id, true)
    controller.selectedItems.set(model.objectAt(3).id, true)
    controller.selectedItems.set(model.objectAt(5).id, true)
  },

  // for dummy example display only
  deactivate () {
    this.store.unloadAll('list-item')
  }
})
