import Ember from 'ember'

export default Ember.Route.extend({

  queryParams: {
    activeSorting: {
      replace: true
    }
  },

  beforeModel() {
    console.log('before model hook')
  },

  _fetch () {
    return this.get('store').query('list-item', {pageSize: 10, start: 0})
  },

  model () {
    return this._fetch()
  },

  deactivate () {
    this.store.unloadAll('list-item')
  }
})
