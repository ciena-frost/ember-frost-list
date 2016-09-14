import Ember from 'ember'

export default Ember.Route.extend({
  model () {
    return this.get('store').query('list-item', {pageSize: 10, start: 0})
  },

  setupController (controller, model) {
    this._super(controller, model)
    controller.selectedItems.set(model.objectAt(0).id, true)
    controller.selectedItems.set(model.objectAt(2).id, true)
    controller.selectedItems.set(model.objectAt(4).id, true)
  }
})
