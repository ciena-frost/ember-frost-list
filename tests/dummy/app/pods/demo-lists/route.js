import Ember from 'ember'

export default Ember.Route.extend({

  _fetch () {
    return this.store.findAll('list-item')
  },

  model () {
    return this._fetch()
  },

  deactivate () {
    this.store.unloadAll('list-item')
  }
})
