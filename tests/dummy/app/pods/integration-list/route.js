import Ember from 'ember'

export default Ember.Route.extend({

  _fetch () {
    return this.get('store').query('list-item', {pageSize: 100, start: 0})
  },

  model () {
    return this._fetch()
  },

  deactivate () {
    this.store.unloadAll('list-item')
  }
})
